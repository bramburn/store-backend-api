"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrder = exports.generateProduct = exports.generateOrderItem = exports.generateUser = void 0;
const faker_1 = __importDefault(require("faker"));
const User_1 = require("../../models/User");
const Order_1 = require("../../models/Order");
const Product_1 = require("../../models/Product");
const generateUser = () => {
    return new User_1.User(faker_1.default.name.firstName(), faker_1.default.name.lastName(), faker_1.default.internet.email());
};
exports.generateUser = generateUser;
const generateOrderItem = (product) => {
    return {
        qty: faker_1.default.datatype.number(10),
        product,
    };
};
exports.generateOrderItem = generateOrderItem;
const generateProduct = () => {
    return new Product_1.Product(faker_1.default.name.firstName(), parseInt(faker_1.default.commerce.price(1.0, 200.0, 2)));
};
exports.generateProduct = generateProduct;
const generateOrder = (products) => {
    // let ar = []
    const ar = [];
    for (let i = 0; i < 10; i++) {
        ar.push({
            qty: faker_1.default.datatype.number({ min: 1, max: 10 }),
            product: products,
        });
    }
    return new Order_1.Order(ar, (0, exports.generateUser)(), faker_1.default.helpers.randomize([Order_1.OrderStatus.ACTIVE, Order_1.OrderStatus.COMPLETE]));
};
exports.generateOrder = generateOrder;
