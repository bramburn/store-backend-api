import {Product} from "../models/Product"
import Client from "../../database"

export class ProductRepository {
    public async getProducts(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT *
                         FROM products`
            const result = await conn.query(sql)
            conn.release()
            return result.rows.map((it) => {
                return new Product({
                    id: it.id,
                    name: it.name,
                    price: it.price
                })
            })
        } catch (e) {
            console.error(e)
            throw new Error("Cannot get products")
        }
    }

    public async getProduct(id: number): Promise<Product> {

        try {
            const conn = await Client.connect()
            const sql = `SELECT *
                         FROM products
                         WHERE id = ($1)
                         LIMIT 1`
            const result = await conn.query(sql, [id])
            conn.release()
            const result01: Product = result.rows[0]
            return new Product({
                id: result01.id,
                name: result01.name,
                price: result01.price
            })
        } catch (e) {
            console.error(e)
            throw new Error("Cannot find the product ")
        }

    }

    public async createProduct(product: Product): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = `INSERT INTO products (name, price)
                         values ($1, $2)
                         RETURNING *`
            const result = await conn.query(sql, [product.name, product.price])
            conn.release()
            const result01: Product = result.rows[0]
            return new Product({
                id: result01.id,
                name: result01.name,
                price: result01.price
            })
        } catch (e) {
            console.error(e)
            throw new Error("Error creating the user")
        }
    }
}
