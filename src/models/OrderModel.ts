import client from '../database'
import {IProduct} from './Product'
import {User} from './User'
import {IOrder, Order, orderItem, OrderStatus} from './Order'

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

    async show(id: number): Promise<IOrder> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`)
        }
    }

    //todo add middleware
    async create(listOfOrderItems: orderItem[], user: User): Promise<IOrder> {
        try {
            const sql = 'INSERT INTO orders (userid, status) VALUES($1, $2) RETURNING *'
            const conn = await client.connect()

            const result = await conn.query(sql, [user.id, 'ACTIVE'])

            const insertedRow = result.rows[0]
            for (let i = 0; i < listOfOrderItems.length; i++) {
                await conn.query(
                    'INSERT INTO order_product (qty,orderid,productid) VALUES($1,$2,$3)',
                    [
                        listOfOrderItems[i].qty,
                        insertedRow.id,
                        listOfOrderItems[i].product.id
                    ]
                )
            }
            conn.release()
            return new Order(insertedRow.id, OrderStatus.ACTIVE, user, listOfOrderItems)
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
