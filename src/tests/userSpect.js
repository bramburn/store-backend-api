"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
const generator_1 = require("./helpers/generator");
const UserFactory_1 = require("../models/UserFactory");
const User_1 = require("../models/User");
const userModel = new UserModel_1.UserModel();
describe('Testing the User class', () => {
    it('should have index', function () {
        expect(userModel.index).toBeDefined();
    });
    it('should have delete', function () {
        expect(userModel.delete).toBeDefined();
    });
    it('should have show 1 item', function () {
        expect(userModel.show).toBeDefined();
    });
    it('should have create defined', function () {
        expect(userModel.create).toBeDefined();
    });
});
describe('Testing the actual model for users', () => {
    const fakeUser = (0, generator_1.generateUser)();
    let generatedUser;
    it('Should create user', async () => {
        const uf = new UserFactory_1.UserFactory();
        const pass = await uf.hashPassword('randompassword010128');
        generatedUser = await userModel.create(fakeUser, pass);
        expect(generatedUser).toBeInstanceOf(User_1.User);
        expect(generatedUser.id).toEqual(jasmine.any(Number));
    });
    it('Should show the user correctly', async () => {
        const u = await userModel.show(generatedUser?.id);
        expect(u).toBe(generatedUser);
        expect(u.id).toEqual(generatedUser?.id);
        expect(u.email).toEqual(generatedUser?.email);
    });
    /*
     * Delete user on completing all the test
     * */
    afterAll(async () => {
        await userModel.delete(generatedUser?.id);
    });
});
