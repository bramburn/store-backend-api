export interface IUser {
    id: number
    firstName: string
    lastName: string
    email: string
}

export class User implements IUser {
    public id = 0
    public email: string

    public lastName: string

    public firstName: string

    showFullName(): string {
        return this.firstName + ' ' + this.lastName
    }

    //password not needed to create user model
    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }

    toObject():object {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.showFullName(),
            email: this.email
        }
    }


}

