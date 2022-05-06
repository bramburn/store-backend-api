import Client from '../database'
import { IProduct, Product } from './Product'

export class ProductModel {
    async index(): Promise<IProduct[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT *
                         FROM products`

            const result = await conn.query(sql)
            conn.release()
            return result.rows.map((it) => {
                const p = new Product(it.name, it.price)
                p.id = it.id
                return p
            })
        } catch (err) {
            throw new Error('Error getting products')
        }
    }

    async patch(p: Product): Promise<IProduct> {
        try {
            const sql =
                'UPDATE products SET name=($1), price=($2) WHERE id=($3)'
            const conn = await Client.connect()
            const result = await conn.query(sql, [p.name, p.price, p.id])
            conn.release()
            return result.rows[0]
        } catch (e) {
            throw new Error(`Could not update product ${p.id}`)
        }
    }

    //todo add patch/put for the product
    async show(id: number): Promise<IProduct> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1) LIMIT 1'
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    //todo: add middleware
    async create(b: Product): Promise<IProduct> {
        try {
            const sql =
                'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
            const conn = await Client.connect()

            const result = await conn.query(sql, [b.name, b.price])

            const product = result.rows[0]

            conn.release()
            b.id = product.id
            return b
        } catch (err) {
            throw new Error(
                `Could not add new product ${b.name}. Error: ${err}`
            )
        }
    }

    // todo: add middleware
    async delete(id: number): Promise<IProduct> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)'
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
