import {User} from "./User"
import bcrypt from 'bcrypt'
import {UserModel} from "./UserModel"

export class UserFactory {
    protected saltRounds = 10

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, this.saltRounds)
    }

    async createUser(firstName: string, lastName: string, email: string, password: string) {


        let pass: null | string = null
        // gethash
        try {
            pass = await this.hashPassword(password)
        } catch {
            throw Error("Unable to produce password hash")
        }
        const u = new UserModel()
        return u.create(new User(
            firstName, lastName, email
        ), <string>pass)


    }

    deleteUser(uid: string) {
        throw new Error("Not implemented")
    }
}
