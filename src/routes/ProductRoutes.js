"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductModel_1 = require("../models/ProductModel");
const Product_1 = require("../models/Product");
const app = (0, express_1.Router)();
// products
app.get('/', async (req, res) => {
    try {
        const p = new ProductModel_1.ProductModel();
        const li = await p.index();
        res.json(li);
    }
    catch (e) {
        res.status(500).json({
            message: e.message,
            code: e.code,
        });
    }
});
app.get('/{:id}', async (req, res) => {
    try {
        const { id } = req.params;
        const p = new ProductModel_1.ProductModel();
        const li = await p.show(id);
        res.json(li);
    }
    catch (e) {
        res.status(500).json({
            message: e.message,
            code: e.code,
        });
    }
});
app.patch('/{:id}', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        const p = new ProductModel_1.ProductModel();
        const up = new Product_1.Product(name, Number.parseFloat(price), Number.parseInt(id));
        const li = await p.patch(up);
        res.json(li);
    }
    catch (e) {
        res.status(500).json({
            message: e.message,
            code: e.code,
        });
    }
});
exports.default = app;
