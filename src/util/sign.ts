import jwt, {JwtPayload} from 'jsonwebtoken'
import * as Path from 'path'
import * as fs from 'fs'

const pk = (): Buffer => {
    return fs.readFileSync(Path.join(__dirname, '../../', 'keys', 'id_rsa.pub'))

}

export const signThis = (email: string): string => {

    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: {
                email,
            },
        },
        pk(),
        {algorithm: 'HS256'}
    )
}

export const decodeThis = (token: string): string | JwtPayload => {

    return jwt.verify(token, pk())
}
