import {IUser} from "../../application/interface/IUser"

export class User implements IUser{
    firstName: string
    id: number
    lastName: string
    password: string

}
