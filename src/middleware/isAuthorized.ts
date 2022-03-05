import { Response, NextFunction, Request } from 'express'

export const isAuthorized = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    const { email } = res.locals

    const { id } = req.params

    if (email === 'nitrogen@gmail.com') {
        return next()
    }

    return res.status(403).send()
}
