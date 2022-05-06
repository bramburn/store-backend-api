import {IUser} from "./IUser"
import {StatusEnum} from "../enum/StatusEnum"

export interface IOrder {
    id:number,
    userId:IUser,
    status:StatusEnum
}
