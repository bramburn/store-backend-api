import {IProduct} from "./Product"
import {IUser} from "./User"

export interface orderItem {
    qty: number
    product: IProduct
}

export enum OrderStatus {
    ACTIVE,
    COMPLETE
}

export interface IOrder {
    id: number
    items: orderItem[]
    user_id: IUser
    status: OrderStatus

}

export class Order implements IOrder {
    public status: OrderStatus

    public user_id: IUser

    public items: orderItem[]

    constructor(items: orderItem[], user_id: IUser, status: OrderStatus) {
        this.items = items
        this.user_id = user_id
        this.status = status
    }

    public id=0
}


