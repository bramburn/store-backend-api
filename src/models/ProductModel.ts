import Client from "../database"
import {IProduct, Product} from "./Product"

export class ProductModel {

    async index(): Promise<IProduct[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM products`

            const result = await conn.query(sql)
            conn.release()
            return result.rows

        } catch (err) {
            throw new Error("Error getting products")
        }
    }

    async show(id: number): Promise<IProduct> {
        try {
            const sql = 'SELECT * FROM product WHERE id=($1)'
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    //todo add middleware
    async create(b: Product): Promise<IProduct> {
        try {
            const sql = 'INSERT INTO product (name, price) VALUES($1, $2) RETURNING *'
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [b.name, b.price])

            const product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`Could not add new product ${b.name}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<IProduct> {
        try {
            const sql = 'DELETE FROM product WHERE id=($1)'
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }

}
