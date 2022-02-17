import { ProductModel } from '../models/ProductModel'
import { generateProduct } from './helpers/generator'
import { Product } from '../models/Product'

const productModel = new ProductModel()

describe('Testing the product model', () => {
    it('should have index', function () {
        expect(productModel.index).toBeDefined()
    })

    it('should have delete', function () {
        expect(productModel.delete).toBeDefined()
    })

    it('should have show 1 item', function () {
        expect(productModel.show).toBeDefined()
    })

    it('should have create defined', function () {
        expect(productModel.create).toBeDefined()
    })
})

describe("Test the products model's creation", () => {
    // create a fake product
    const fakeProduct = generateProduct()

    it('should create a product', async function () {
        const ret = await productModel.create(fakeProduct)
        expect(ret).toBeInstanceOf(Product)
        expect(ret.name).toEqual(fakeProduct.name)
    })

    it('should show the current fake product', async function () {
        const ret = await productModel.show(fakeProduct.id)
        expect(ret.name).toEqual(fakeProduct.name)
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
