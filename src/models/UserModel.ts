import {IUser, User} from "./User"
import client from "../database"

export class UserModel {
    async index(): Promise<IUser[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM users`

            const result = await conn.query(sql)
            conn.release()
            return result.rows

        } catch (err) {
            throw new Error("Error getting users")
        }
    }

    async show(id: number): Promise<IUser> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    //todo add middleware
    async create(userClass: User, passwordHash: string): Promise<IUser> {
        try {
            const sql = 'INSERT INTO users (firstName, LastName,email,passwordHash) VALUES($1, $2, $3,$4) RETURNING *'
            const conn = await client.connect()
            //todo add passwordHash and salt

            const result = await conn
                .query(sql, [userClass.firstName, userClass.lastName, userClass.email, passwordHash])

            const item = result.rows[0]

            conn.release()
            userClass.id = item.id
            return userClass
        } catch (err) {
            throw new Error(`Could not add new User ${userClass.showFullName()}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<IUser> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)'
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const Item = result.rows[0]

            conn.release()

            return Item
        } catch (err) {
            throw new Error(`Could not delete User ${id}. Error: ${err}`)
        }
    }
}
