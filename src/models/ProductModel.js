"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
const Product_1 = require("./Product");
class ProductModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT *
                         FROM products`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows.map((it) => {
                const p = new Product_1.Product(it.name, it.price);
                p.id = it.id;
                return p;
            });
        }
        catch (err) {
            throw new Error('Error getting products');
        }
    }
    async patch(p) {
        try {
            const sql = 'UPDATE products SET name=($1), price=($2) WHERE id=($3)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.name, p.price, p.id]);
            conn.release();
            return result.rows[0];
        }
        catch (e) {
            throw new Error(`Could not update product ${p.id}`);
        }
    }
    //todo add patch/put for the product
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1) LIMIT 1';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    //todo: add middleware
    async create(b) {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [b.name, b.price]);
            const product = result.rows[0];
            conn.release();
            b.id = product.id;
            return b;
        }
        catch (err) {
            throw new Error(`Could not add new product ${b.name}. Error: ${err}`);
        }
    }
    // todo: add middleware
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.ProductModel = ProductModel;
