"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
const User_1 = require("./User");
const Order_1 = require("./Order");
const Product_1 = require("./Product");
class OrderModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT *
                         FROM orders`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Error getting orders');
        }
    }
    // patching only order status. no need to re-assign user, or other sub orders
    async patch(id, status) {
        try {
            const sql = 'UPDATE orders SET status=($1) WHERE id=($2)';
            const conn = await database_1.default.connect();
            // TODO: return a better output
            const result = await conn.query(sql, [
                status == Order_1.OrderStatus.COMPLETE ? 'COMPLETE' : 'ACTIVE',
                id,
            ]);
            conn.release();
        }
        catch (e) {
            throw new Error(`There was an error updating order ${id}`);
        }
    }
    async show(id) {
        try {
            //todo could just align everything in one using this SELECT p.name as productName,
            // p.price as productPrice, op.*, o.*, u.email, u.id as userid, u.firstname, u.lastname from orders as o
            // right join users u on u.id = o.userid right join order_product op on o.id = op.orderid right join products p on p.id = op.productid where o.id=379;
            const sql = 'SELECT o.*, u.email, u.id as userid, u.firstname, u.lastname from orders as o' +
                ' right join users u on u.id = o.userid where  o.id =($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = await conn.query('SELECT * FROM users WHERE id=($1)', [
                result.rows[0].userId,
            ]);
            const listOrder = await conn.query('select o.*, p.name as productName, p.price as producePrice from order_product as o left join products p on p.id = o.productid where orderid=($1)', [id]);
            const orderItems = [];
            if (listOrder.rowCount > 0) {
                listOrder.rows.forEach((it) => {
                    orderItems.push({
                        product: new Product_1.Product(it.productname, it.productprice),
                        qty: it.qty,
                    });
                });
            }
            conn.release();
            const pulledUser = new User_1.User(result.rows[0].firstName, result.rows[0].lastName, result.rows[0].email);
            pulledUser.id = result.rows[0].userid;
            return new Order_1.Order(result.rows[0].id, result.rows[0].status, pulledUser, orderItems);
        }
        catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`);
        }
    }
    async updateStatus(orderId, status) {
        try {
            const conn = await database_1.default.connect();
            await conn.query('UPDATE order SET status=($1) WHERE id=($2)', [
                status == Order_1.OrderStatus.ACTIVE ? 'ACTIVE' : 'COMPLETE',
                orderId,
            ]);
            conn.release();
            return true;
        }
        catch (err) {
            throw new Error(`Could not update order ${orderId}. Error: ${err}`);
        }
    }
    //todo add middleware
    async create(listOfOrderItems, user) {
        try {
            //todo look at what is returning *
            const sql = 'INSERT INTO orders (userid, status) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [user.id, 'ACTIVE']);
            const insertedRow = result.rows[0];
            // for every order you create a new item i order_product with the order ID
            for (let i = 0; i < listOfOrderItems.length; i++) {
                await conn.query('INSERT INTO order_product (qty,orderid,productid) VALUES($1,$2,$3)', [
                    listOfOrderItems[i].qty,
                    insertedRow.id,
                    listOfOrderItems[i].product.id,
                ]);
            }
            conn.release();
            return new Order_1.Order(insertedRow.id, Order_1.OrderStatus.ACTIVE, user, listOfOrderItems);
        }
        catch (err) {
            throw new Error(`Could not add new order ${b.name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            await conn.query(sql, [id]);
            await conn.query('DELETE FROM order_product WHERE orderid=($1)'[id]);
            conn.release();
            return true;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
exports.OrderModel = OrderModel;
