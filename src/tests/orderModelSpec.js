"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = require("../models/ProductModel");
const generator_1 = require("./helpers/generator");
const UserModel_1 = require("../models/UserModel");
const Order_1 = require("../models/Order");
const OrderModel_1 = require("../models/OrderModel");
const orderModel = new OrderModel_1.OrderModel();
describe('Testing the creation of Orders', async () => {
    const products = Array();
    const pModel = new ProductModel_1.ProductModel();
    for (let i = 0; i < 10; i++) {
        const prod = await pModel.create((0, generator_1.generateProduct)());
        products.push(prod);
    }
    const uModel = new UserModel_1.UserModel();
    const user = await uModel.create((0, generator_1.generateUser)(), 'aisjd0a89sjd90aj2');
    let createdOrder;
    it('should create a model order', async function () {
        const ors = [];
        for (let i = 0; i < 10; i++) {
            ors.push((0, generator_1.generateOrderItem)(products[i]));
        }
        try {
            createdOrder = await orderModel.create(ors, user);
            expect(createdOrder.user?.id).toEqual(user.id);
            expect(createdOrder.id).toBeDefined();
        }
        catch {
            fail("Couldn't create orders");
        }
    });
    it('should update the file when editing it', async function () {
        const get = await orderModel.patch(createdOrder.id, Order_1.OrderStatus.COMPLETE);
        expect(get.rows[0].id).toEqual(createdOrder.id);
        expect(get.rows[0].status).toEqual('COMPLETE');
    });
    it('should show the order id', async function () {
        const get = await orderModel.show(createdOrder.id);
        expect(get.id).toEqual(createdOrder.id);
    });
    it('should throw error when there is no number in show', async function () {
        try {
            await orderModel.show(0);
        }
        catch {
            expect();
        }
    });
});
