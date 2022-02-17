import client from '../database'
import {User} from './User'
import {IOrder, Order, orderItem, OrderStatus} from './Order'
import {Product} from './Product'
import {QueryResult} from "pg"

export class OrderModel {
    async index(): Promise<IOrder[]> {
        try {
            const conn = await client.connect()
            const sql = `SELECT *
                         FROM orders`

            const result = await conn.query(sql)
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error('Error getting orders')
        }
    }

    async patch(id: number, status: OrderStatus): Promise<QueryResult<any>> {
        try {
            const sql = 'UPDATE orders SET status=($1) WHERE id=($2)'
            const conn = await client.connect()

            // TODO: return a better output
            return await conn.query(sql, [(status == OrderStatus.COMPLETE) ? 'COMPLETE' : 'ACTIVE', id
            ])

        } catch (e) {
            throw new Error(`There was an error updating order ${id}`)
        }
    }

    async show(id: number): Promise<IOrder> {
        try {
            //todo could just align everything in one using this SELECT p.name as productName,
            // p.price as productPrice, op.*, o.*, u.email, u.id as userid, u.firstname, u.lastname from orders as o
            // right join users u on u.id = o.userid right join order_product op on o.id = op.orderid right join products p on p.id = op.productid where o.id=379;

            const sql =
                'SELECT o.*, u.email, u.id as userid, u.firstname, u.lastname from orders as o' +
                ' right join users u on u.id = o.userid where  o.id =($1)'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])
            const user = await conn.query('SELECT * FROM users WHERE id=($1)', [
                result.rows[0].userId,
            ])

            const listOrder = await conn.query(
                'select o.*, p.name as productName, p.price as producePrice from order_product as o left join products p on p.id = o.productid where orderid=($1)',
                [id]
            )
            const orderItems: orderItem[] = []
            if (listOrder.rowCount > 0) {
                listOrder.rows.forEach((it) => {
                    orderItems.push({
                        product: new Product(it.productname, it.productprice),
                        qty: it.qty,
                    } as orderItem)
                })
            }
            conn.release()

            const pulledUser = new User(
                result.rows[0].firstName,
                result.rows[0].lastName,
                result.rows[0].email
            )
            pulledUser.id = result.rows[0].userid

            return new Order(
                result.rows[0].id,
                result.rows[0].status,
                pulledUser,
                orderItems
            )
        } catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`)
        }
    }

    //todo add middleware
    async create(listOfOrderItems: orderItem[], user: User): Promise<IOrder> {
        try {
            //todo look at what is returning *
            const sql =
                'INSERT INTO orders (userid, status) VALUES($1, $2) RETURNING *'
            const conn = await client.connect()

            const result = await conn.query(sql, [user.id, 'ACTIVE'])

            const insertedRow = result.rows[0]
            // for every order you create a new item i order_product with the order ID
            for (let i = 0; i < listOfOrderItems.length; i++) {
                await conn.query(
                    'INSERT INTO order_product (qty,orderid,productid) VALUES($1,$2,$3)',
                    [
                        listOfOrderItems[i].qty,
                        insertedRow.id,
                        listOfOrderItems[i].product.id,
                    ]
                )
            }
            conn.release()
            return new Order(
                insertedRow.id,
                OrderStatus.ACTIVE,
                user,
                listOfOrderItems
            )
        } catch (err) {
            throw new Error(`Could not add new order ${b.name}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            const orders = result.rows[0]

            conn.release()

            return true
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }
}
