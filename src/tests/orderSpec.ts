import { IOrder, Order, orderItem } from '../models/Order'
import {
    generateOrder,
    generateOrderItem,
    generateProduct,
    generateUser,
} from './helpers/generator'
import { ProductModel } from '../models/ProductModel'
import { OrderModel } from '../models/OrderModel'
import { Product } from '../models/Product'
import { UserModel } from '../models/UserModel'
import exp from 'constants'

const orderModel = new OrderModel()

describe('Order Model Test - ', () => {
    it('should have index', function () {
        expect(orderModel.index).toBeDefined()
    })

    it('should have delete', function () {
        expect(orderModel.delete).toBeDefined()
    })

    it('should have show 1 item', function () {
        expect(orderModel.show).toBeDefined()
    })

    it('should have create defined', function () {
        expect(orderModel.create).toBeDefined()
    })
})

describe('Testing the creation of Orders', async () => {
    const products = Array<Product>()
    const pModel = new ProductModel()
    for (let i = 0; i < 10; i++) {
        const prod = await pModel.create(generateProduct())
        products.push(prod as Product)
    }
    const uModel = new UserModel()
    const user = await uModel.create(generateUser(), 'aisjd0a89sjd90aj2')
    let createdOrder: IOrder
    it('should create a model order', async function () {
        const ors = []
        for (let i = 0; i < 10; i++) {
            ors.push(generateOrderItem(products[i]) as orderItem)
        }
        try {
            createdOrder = await orderModel.create(ors, user)
            expect(createdOrder.user?.id).toEqual(user.id)
            expect(createdOrder.id).toBeDefined()
        } catch {
            fail("Couldn't create orders")
        }
    })

    it('should show the order id', async function () {
        const get = await orderModel.show(createdOrder.id)
        expect(get.id).toEqual(createdOrder.id)
    })
    it('should throw error when there is no number in show', async function () {
        try {
            const get = await orderModel.show(0)
        } catch {
            expect()
        }
    })
})
