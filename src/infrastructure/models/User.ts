import {IUser} from "../../application/Common/interface/IUser"

export class User implements IUser {
    firstName!: string
    id!: number
    lastName!: string
    password!: string

    constructor(data: Partial<IUser>) {
        Object.assign(this, data)
    }

}
