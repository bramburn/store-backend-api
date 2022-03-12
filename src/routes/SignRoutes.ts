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

SignRoutes.post('/login', async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body
    const u = new UserModel()

    const uf = new UserFactory()
    try {
        const p = await uf.hashPassword(password)
        await u.login(email, p)
        const signedKey = signThis(email)
        //return the signed keys
        res.json({'status': 'success', 'key': signedKey})

    } catch (arg) {
        console.log(arg)
    }

})

export default SignRoutes
