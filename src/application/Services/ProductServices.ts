import {IProduct} from "../Common/interface/IProduct"
import {ProductRepository} from "../../infrastructure/repository/ProductRepository"

export class ProductServices {
    private readonly _repo: ProductRepository
    constructor() {
    this._repo = new ProductRepository()
    }

    public async getProducts(): Promise<IProduct[]> {
        //return products
        return await this._repo.getProducts()
    }

    public async createProducts(prod: IProduct): Promise<IProduct> {
        return await this._repo.createProduct(prod)

    }

    public async getProduct(id: number): Promise<IProduct> {
        return await this._repo.getProduct(id)
    }
}
