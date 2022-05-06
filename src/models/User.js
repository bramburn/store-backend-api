"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    //password not needed to create user model
    constructor(firstName, lastName, email) {
        this.id = 0;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
    showFullName() {
        return this.firstName + ' ' + this.lastName;
    }
    toObject() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.showFullName(),
            email: this.email,
        };
    }
}
exports.User = User;
