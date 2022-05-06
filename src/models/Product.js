"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(name, price, id) {
        this._id = 0;
        this.price = price;
        this.name = name;
        if (id) {
            this.id = id;
        }
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    ShowPrice() {
        return new Intl.NumberFormat(`en-GB`, {
            currency: `GBP`,
            style: 'currency',
        }).format(this.price);
    }
    toObject() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            shownPrice: this.ShowPrice(),
        };
    }
}
exports.Product = Product;
