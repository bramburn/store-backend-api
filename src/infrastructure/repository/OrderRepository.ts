import {User} from "../models/User"
import {Order} from "../models/Order"
import Client from "../../database"

export class OrderRepository {
    public async getOrders(user: User): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT o.id as orderid, o.status as status, (op.qty * p.price) as total, p.name as productName, p.id as productId, p.price as productPrice, op.qty as productQty
                         FROM orders as o
                                  inner join order_product op on o.id=op.orderid
                                  right join products p on p.id = op.productid
                         WHERE o.userId = ($1)`
            const result = await conn.query(sql, [user.id])

        } catch (e) {
            console.error(e)
            throw new Error("Error in getting orders for user")
        }

    }

}
