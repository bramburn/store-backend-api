import {User} from "../models/User"
import Client from "../../database"

export class UserRepository {
    public async getUsers(): Promise<User[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT *
                         FROM users`
            const result = await conn.query(sql)
            conn.release()
            return result.rows.map((it) => {
                return new User({
                    id: it.id,
                    firstName: it.firstName,
                    lastName: it.lastName
                })
            })
        } catch (e) {
            console.error(e)
            throw new Error("Cannot get Users")
        }
    }

    public async getUser(id: number): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT *
                         FROM users
                         WHERE id = ($1)
                         LIMIT 1`
            const result = await conn.query(sql, [id])
            conn.release()
            const result01: User = result.rows[0]
            return new User({
                id: result01.id,
                firstName: result01.firstName,
                lastName: result01.lastName
            })
        } catch (e) {
            console.error(e)
            throw new Error("Cannot find the user ")
        }
    }

    public async createUser(user: User): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = `INSERT INTO users (firstName, lastName)
                         values ($1, $2)
                         RETURNING *`
            const result = await conn.query(sql, [user.firstName, user.lastName])
            conn.release()
            const result01: User = result.rows[0]
            return new User({
                id: result01.id,
                firstName: result01.firstName,
                lastName: result01.lastName
            })
        } catch (e) {
            console.error(e)
            throw new Error("Error creating the user")
        }
    }
}
