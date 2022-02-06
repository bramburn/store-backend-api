import {IOrder, orderItem} from "../models/Order"
import {generateOrder, generateProduct, generateUser} from "./helpers/generator"
import {ProductModel} from "../models/ProductModel"
import {OrderModel} from "../models/OrderModel"


const order = new OrderModel()

describe("Order Model Test - ", () => {
    it('should have index', function () {
        expect(order.index).toBeDefined()
    })

    it('should have delete', function () {
        expect(order.delete).toBeDefined()
    })

    it('should have show 1 item', function () {
        expect(order.show).toBeDefined()
    })

    it('should have create defined', function () {
        expect(order.create).toBeDefined()
    })


})

describe("Testing the creation of Orders",()=>{

    beforeAll(()=>{
        const user = generateUser()
        }
    )
    it('should create a model order', async function () {


        const prod = new ProductModel()
        const newproduct = await prod.create(generateProduct())

        const item:orderItem = {
            qty:2,
            product:newproduct
        }

        const orderModel = new OrderModel()

        const re = orderModel.create(o)

    })
})
