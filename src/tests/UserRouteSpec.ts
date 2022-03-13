import supertest from 'supertest'
import app from '../index'
import {doesNotMatch} from "assert"

const request = supertest(app)
describe('Test User Endpoint', () => {
    it('should return not auth when getting user', async function (done) {
        //no auth
        const response = await request.get('/user/index')
        expect(response.body).toContain("Unauthenticated")
        expect(response.status).toBe(401)
        done()
    })
    // test with auth and expect 200 ok
    // test with auth to get a list of objects, save one of the ID in a global const
    // test show with one of the global const
    // fail with a non-number
    // test creating a user
    // fail creating with a user
})
