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

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }


}

