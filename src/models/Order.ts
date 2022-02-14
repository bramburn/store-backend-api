import { IProduct } from './Product'
import { IUser } from './User'

export interface orderItem {
    qty: number
    product: IProduct
}

export enum OrderStatus {
    ACTIVE,
    COMPLETE,
}

export interface IOrder {
    id: number
    orders: orderItem[] | null
    user: IUser | null
    status: OrderStatus
}

export class Order implements IOrder {
    public status: OrderStatus

    public getStatus(): string {
        return this.status ? 'ACTIVE' : 'COMPLETE'
    }

    public user: IUser | null

    public orders: orderItem[] | null

    constructor(
        id: number,
        status: OrderStatus = OrderStatus.ACTIVE,
        user: IUser | null = null,
        orders: orderItem[] | null = null
    ) {
        this.orders = orders
        this.user = user
        this.status = status
        this.id = id
    }

    public id = 0
}
