"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use('products', ProductRoutes_1.default);
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(port, function () {
    console.log(`starting app on: http://localhost:${port}`);
});
exports.default = app;
