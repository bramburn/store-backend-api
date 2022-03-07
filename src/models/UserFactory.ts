import { User } from './User'
import bcrypt from 'bcrypt'
import { UserModel } from './UserModel'

export class UserFactory {
    protected saltRounds = 10

     async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds)
    }



    async createUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ):Promise<User|undefined> {
        let pass: null | string = null
        // gethash
        try {
            pass = await this.hashPassword(password)
        } catch(err) {
            throw `Unable to produce password hash error: ${err}`
        }
        const u = new UserModel()
        return u.create(new User(firstName, lastName, email), <string>pass)
    }

    deleteUser(uid: string) {
        //todo create
        throw  Error('Not implemented')
    }
}
