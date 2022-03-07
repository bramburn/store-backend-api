import {Response, Request, Router} from 'express'
import {decodeThis, signThis} from '../util/sign'
import {UserModel} from "../models/UserModel"
import {UserFactory} from "../models/UserFactory"

const SignRoutes = Router()

SignRoutes.get('/', async (req: Request, res: Response): Promise<void> => {
    const theToken = signThis(
        'nitrogen@gmail.com'
    )
    res.json({
        token: theToken,
        ver: decodeThis(theToken)
    })
})

SignRoutes.post('/test', async (req: Request, res: Response) => {
    const {email, password} = req.body
    const u = new UserModel()

    const uf = new UserFactory()
    try {
        const p = await uf.hashPassword(password)
        console.log(p)
        await u.login(email, p)
        res.json({'done':'test'})

    } catch (arg) {
        console.log(arg)
    }

})

export default SignRoutes
