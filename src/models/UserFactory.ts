import {User} from "./Users";
import bcrypt from

bcrypt

export class UserFactory {
    protected saltRounds = 10;

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, this.saltRounds)
    }

    async createUser(username: string, email: string, password: string) {


        let pass: null | string = null
        // gethash
        try {
            pass = await this.hashPassword(password)
        } catch {
            throw Error("Unable to produce password hash")
        }

        const user = new User(
            username, email, <string>pass
        )

    }

    deleteUser(uid: string) {
        throw new Error("Not implemented")
    }
}
