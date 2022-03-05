import {Response, Request, Router} from 'express'
import {decodeThis, signThis} from '../util/sign'

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

export default SignRoutes
