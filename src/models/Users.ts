export class IUser {
    uid: string
    username: string
    email: string
}

export class User implements IUser {
    uid: string
    username: string
    email: string
    passwordHash: string

    constructor(username:string,email:string,password:string) {
        this.username = username
        this.email = email
        this.passwordHash = password
    }


}

