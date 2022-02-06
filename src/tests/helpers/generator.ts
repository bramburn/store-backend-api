import faker from 'faker'
import {User} from "../../models/User"
import {Order, orderItem, OrderStatus} from "../../models/Order"
import {Product} from "../../models/Product"
import {ProductModel} from "../../models/ProductModel"


export const generateUser = (): User => {

    return new User(faker.name.firstName(), faker.name.lastName(), faker.internet.email())
}

export const generateProduct = (): Product => {
    return new Product(faker.name.firstName(), parseInt(faker.commerce.price(1.00, 200.00, 2)))
}

export const generateOrder = (products:Product): Order => {
    // let ar = []
    const ar: orderItem[] = []
    for (let i = 0; i < 10; i++) {
        ar.push({
            qty: faker.datatype.number({min: 1, max: 10}),
            product: products
        } as orderItem)
    }
    return new Order(ar, generateUser(), faker.helpers.randomize([OrderStatus.ACTIVE, OrderStatus.COMPLETE]))
}
