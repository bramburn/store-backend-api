"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../models/Order");
const generator_1 = require("./helpers/generator");
const ProductModel_1 = require("../models/ProductModel");
const OrderModel_1 = require("../models/OrderModel");
const UserModel_1 = require("../models/UserModel");
const orderModel = new OrderModel_1.OrderModel();
describe('Order Model Test - ', () => {
    it('should have index', function () {
        expect(orderModel.index).toBeDefined();
    });
    it('should have delete', function () {
        expect(orderModel.delete).toBeDefined();
    });
    it('should have show 1 item', function () {
        expect(orderModel.show).toBeDefined();
    });
    it('should have create defined', function () {
        expect(orderModel.create).toBeDefined();
    });
});
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
    it('should show the order id', async function () {
        const get = await orderModel.show(createdOrder.id);
        expect(get.id).toEqual(createdOrder.id);
    });
    it('should throw error when there is no number in show', async function () {
        try {
            const get = await orderModel.show(0);
        }
        catch (e) {
            expect(e).toThrow();
        }
    });
    it('should update without issues', async function () {
        const get = await orderModel.updateStatus(createdOrder.id, Order_1.OrderStatus.COMPLETE);
        expect(get).toBe(true);
    });
    it('should delete the fake users and orders we created', async function () {
        const get = await orderModel.delete(createdOrder.id);
    });
});
