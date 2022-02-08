export interface IProduct {
    id: number
    name: string
    price: number
}

export type TProduct = IProduct

export class Product implements IProduct {
    get price(): number {
        return this._price
    }

    set price(value: number) {
        this._price = value
    }

    get id(): number {
        return this._id
    }

    set id(value: number) {
        this._id = value
    }

    ShowPrice(): string {
        return new Intl.NumberFormat(`en-GB`, {
            currency: `GBP`,
            style: 'currency',
        }).format(this.price)
    }

    private _id = 0

    public name: string

    private _price!: number

    constructor(name: string, price: number) {
        this.price = price
        this.name = name
    }


}


