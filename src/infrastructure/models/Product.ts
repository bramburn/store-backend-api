import {IProduct} from "../../application/Common/interface/IProduct"

export class Product implements IProduct {
    id!: number
    name!: string
    price!: number
    constructor(data:Partial<IProduct>) {
        Object.assign(this,data)
    }

}
