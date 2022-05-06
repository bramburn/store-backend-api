import {IUser} from "./IUser"
import {StatusEnum} from "../enum/StatusEnum"

export interface IOrder {
    id:number,
    user_id:IUser,
    status:StatusEnum
}
