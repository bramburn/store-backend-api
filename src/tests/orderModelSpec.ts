import { Product } from '../models/Product'
import { ProductModel } from '../models/ProductModel'
import {
    generateOrderItem,
    generateProduct,
    generateUser,
} from './helpers/generator'
import { UserModel } from '../models/UserModel'
import { IOrder, orderItem, OrderStatus } from '../models/Order'
import { OrderModel } from '../models/OrderModel'
import exp from 'constants'

const orderModel = new OrderModel()
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
    it('should update the file when editing it', async function () {
        const get = await orderModel.patch(
            createdOrder.id,
            OrderStatus.COMPLETE
        )
        expect(get.rows[0].id).toEqual(createdOrder.id)
        expect(get.rows[0].status).toEqual('COMPLETE')
    })

    it('should show the order id', async function () {
        const get = await orderModel.show(createdOrder.id)
        expect(get.id).toEqual(createdOrder.id)
    })
    it('should throw error when there is no number in show', async function () {
        try {
            await orderModel.show(0)
        } catch {
            expect()
        }
    })
})
