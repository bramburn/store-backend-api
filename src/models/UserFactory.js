"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const User_1 = require("./User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = require("./UserModel");
class UserFactory {
    constructor() {
        this.saltRounds = 10;
    }
    async hashPassword(password) {
        return await bcrypt_1.default.hash(password, this.saltRounds);
    }
    async createUser(firstName, lastName, email, password) {
        let pass = null;
        // gethash
        try {
            pass = await this.hashPassword(password);
        }
        catch {
            throw Error('Unable to produce password hash');
        }
        const u = new UserModel_1.UserModel();
        return u.create(new User_1.User(firstName, lastName, email), pass);
    }
    deleteUser(uid) {
        throw new Error('Not implemented');
    }
}
exports.UserFactory = UserFactory;
