import {IOrder} from "../Common/interface/IOrder"
import {IUser} from "../Common/interface/IUser"
import {OrderRepository} from "../../infrastructure/repository/OrderRepository"

export class OrderServices{
    private readonly _repo:OrderRepository
    constructor() {
        this._repo = new OrderRepository()
    }

    public async getOrders(user:IUser):Promise<IOrder[]>{
        return await this._repo.getOrders(user)
    }


}
