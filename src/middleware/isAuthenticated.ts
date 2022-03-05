import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import * as fs from 'fs'
import path from 'path'

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const {authorization} = req.headers

    if (!authorization) {
        res.status(401).send({message: 'Unauthenticated'})
        return
    }

    if (!authorization.startsWith('Bearer')) {
        res.status(401).send({message: 'Unauthenticated no Bearer Token'})
        return
    }

    const split = authorization.split('Bearer ')
    if (split.length !== 2) {
        res.status(401).send({message: 'Unauthenticated no Token'})
        return
    }

    const token = split[1]

    try {
        //todo: verify JWT token
        const pk = fs.readFileSync(path.join(__dirname, 'keys', 'id_rsa'))
        const decodedToken = jwt.verify(token, pk)
        res.locals = {
            ...res.locals,
            email: decodedToken.data.email,
        }
        next()
    } catch (err) {
        res.status(401).send({message: 'Unauthorized'})
        return
    }
}
