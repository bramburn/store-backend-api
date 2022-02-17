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
