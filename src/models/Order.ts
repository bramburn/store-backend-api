import {IProduct, Product} from "./Product"
import client from "../database"
import {IUser, User} from "./User"

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

export class Order implements IOrder {
    public status: OrderStatus

    public user_id: IUser

    public items: orderItem[]

    constructor(items: orderItem[], user_id: IUser, status: OrderStatus) {
        this.items = items
        this.user_id = user_id
        this.status = status
    }

    public id=0
}


export class OrderModel {

    async index(): Promise<IOrder[]> {
        try {
            const conn = await client.connect()
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
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`)
        }
    }

    //todo add middleware
    async create(b: Product, userId:User,items:orderItem[]): Promise<IProduct> {
        try {
            const sql = 'INSERT INTO orders (userId, price) VALUES($1, $2) RETURNING *'
            const conn = await client.connect()

            const result = await conn
                .query(sql, [userId.id, b.price])

            const orders = result.rows[0]
            for(let i = 0;i<items.length;i++){
                await conn.query('INSERT INTO order_product (qty,orderid,productid,status) VALUES($1,$2,$3,$4)',items[i].qty,orders.id)
            }


            conn.release()

            return orders
        } catch (err) {
            throw new Error(`Could not add new order ${b.name}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<IProduct> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            const orders = result.rows[0]

            conn.release()

            return orders
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

}
