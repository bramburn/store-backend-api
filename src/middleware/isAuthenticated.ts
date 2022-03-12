import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import * as fs from 'fs'
import path from 'path'
import {decodeThis} from "../util/sign"
import {time} from "faker"


interface decodedCode {
    exp: number,
    data: {
        email: string
    },
    iat: number
}

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
        //returns the decodedToken {data:...}
        const decodedToken = decodeThis(token) as decodedCode
        const now = Math.floor(Date.now()/1000)
        //double check the expiry of the token
        if (now > decodedToken.exp) {
            throw `Expired token ${now} ${decodedToken.exp}`
        }

        //save it in the local data
        res.locals = {
            ...res.locals,
            email: decodedToken.data.email,
        }
        next()
    } catch (err) {
        res.status(401).send({message: 'Unauthorized', additional: err})
        return
    }
}
