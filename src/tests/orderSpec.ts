import {IOrder, orderItem} from "../models/Order"
import {generateOrder, generateProduct, generateUser} from "./helpers/generator"
import {ProductModel} from "../models/ProductModel"
import {OrderModel} from "../models/OrderModel"


const orderModel = new OrderModel()

describe("Order Model Test - ", () => {
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

describe("Testing the creation of Orders",()=>{

        const user = generateUser()
    it('should create a model order', async function () {



        const re = orderModel.create(list of products,user)

    })
})
