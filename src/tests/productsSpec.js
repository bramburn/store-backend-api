"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = require("../models/ProductModel");
const productModel = new ProductModel_1.ProductModel();
describe('Testing the product model', () => {
    it('should have index', function () {
        expect(productModel.index).toBeDefined();
    });
    it('should have delete', function () {
        expect(productModel.delete).toBeDefined();
    });
    it('should have show 1 item', function () {
        expect(productModel.show).toBeDefined();
    });
    it('should have create defined', function () {
        expect(productModel.create).toBeDefined();
    });
});
