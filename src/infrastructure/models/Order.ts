import {IOrder} from "../../application/Common/interface/IOrder"
import {StatusEnum} from "../../application/Common/enum/StatusEnum"
import {User} from "./User"

export class Order implements IOrder {
    id!: number
    status!: StatusEnum
    userId!: User

    constructor(data: Partial<Order>) {
        Object.assign(this, data)
    }

}
