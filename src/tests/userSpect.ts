import {UserModel} from "../models/UserModel"
import {generateUser} from "./helpers/generator"
import {UserFactory} from "../models/UserFactory"
import {User} from "../models/User"

const userModel = new UserModel()

describe("Testing the User class", () => {

    it('should have index', function () {
        expect(userModel.index).toBeDefined()
    })

    it('should have delete', function () {
        expect(userModel.delete).toBeDefined()
    })

    it('should have show 1 item', function () {
        expect(userModel.show).toBeDefined()
    })

    it('should have create defined', function () {
        expect(userModel.create).toBeDefined()
    })
})

describe("Testing the actual model for users", () => {
    const fakeUser = generateUser()
    let generatedUser: null | User
    it('Should create user', async () => {
        const uf = new UserFactory()
        const pass = await uf.hashPassword("randompassword010128")

        generatedUser = await userModel.create(fakeUser, pass)
        expect(generatedUser).toBeInstanceOf(User)
        expect(generatedUser.id).toEqual(jasmine.any(Number))

    })

    it('Should show the user correctly', async () => {
        const u = await userModel.show(generatedUser?.id as number)
        expect(u).toBe(generatedUser as User)
        expect(u.id).toEqual(generatedUser?.id as number)
        expect(u.email).toEqual(generatedUser?.email as string)

    })

    /*
    * Delete user on completing all the test
    * */
    afterAll(async () => {
        await userModel.delete(generatedUser?.id as number)
    })
})
