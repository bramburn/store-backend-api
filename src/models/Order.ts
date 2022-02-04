import {IProduct, Product} from "./Product"
import Client from "../database"
import {IUser} from "./User"

export interface orderItem {
    qty: number
    product: IProduct
}

export enum OrderStatus {
    ACTIVE,
    COMPLETE
}

export interface IOrder {
    id: number
    items: orderItem[]
    user_id: IUser
    status: OrderStatus

}


export class OrderModel {

    async index(): Promise<IOrder[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM orders`

            const result = await conn.query(sql)
            conn.release()
            return result.rows

        } catch (err) {
            throw new Error("Error getting orders")
        }
    }

    async show(id: number): Promise<IProduct> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`)
        }
    }

    //todo add middleware
    async create(b: Product): Promise<IProduct> {
        try {
            const sql = 'INSERT INTO orders (name, price) VALUES($1, $2) RETURNING *'
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [b.name, b.price])

            const orders = result.rows[0]

            conn.release()

            return orders
        } catch (err) {
            throw new Error(`Could not add new order ${b.name}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<IProduct> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const orders = result.rows[0]

            conn.release()

            return orders
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

}
