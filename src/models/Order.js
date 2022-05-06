"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["ACTIVE"] = 0] = "ACTIVE";
    OrderStatus[OrderStatus["COMPLETE"] = 1] = "COMPLETE";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
class Order {
    constructor(id, status = OrderStatus.ACTIVE, user = null, orders = null) {
        this.id = 0;
        this.orders = orders;
        this.user = user;
        this.status = status;
        this.id = id;
    }
    getStatus() {
        return this.status ? 'ACTIVE' : 'COMPLETE';
    }
}
exports.Order = Order;
