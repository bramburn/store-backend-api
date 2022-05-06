import { generateProduct } from './helpers/generator'
import { IProduct, Product } from '../models/Product'
import { ProductModel } from '../models/ProductModel'

const productModel = new ProductModel()
describe("Test the products model's creation", () => {
    // create a fake product
    const fakeProduct = generateProduct()
    let generated!: IProduct

    it('should create a product', async function () {
        const ret = await productModel.create(fakeProduct)
        expect(ret).toBeInstanceOf(Product)
        expect(ret.name).toEqual(fakeProduct.name)
        generated = ret
    })

    it('should show the current fake product', async function () {
        const ret = await productModel.show(fakeProduct.id)
        expect(ret.name).toEqual(fakeProduct.name)
    })
    it('should throw error when updating', async function () {
        try {
            const co: Product = new Product('New name', 20202)
            // no id provided
            const ret = await productModel.patch(co)
        } catch (e) {
            //todo check the exception
            expect(e).toThrow()
        }
    })

    it('should Update the product ', async function () {
        const newItem = new Product('New Item', 9.99)
        newItem.id = generated.id
        const ret = await productModel.patch(newItem)
        expect(ret.name).toEqual('New Item')
        expect(ret.price).toEqual(9.99)
    })

    it('should get a product from the database and check if its a product', async function () {
        const ret = await productModel.index()
        expect(ret[0]).toBeInstanceOf(Product)
        expect(ret[0].id).toEqual(fakeProduct.id)
    })

    it('should delete the product', async function () {
        await productModel.delete(fakeProduct.id)

        const ret = await productModel.index()

        expect(ret.length).toBe(0)
    })
})
