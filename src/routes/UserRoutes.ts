import {Request, Response, Router} from "express"
import {User} from "../models/User"
import {UserModel} from "../models/UserModel"
import {UserFactory} from "../models/UserFactory"


const UserRoutes = Router()

UserRoutes.get('/index', (req: Request, res: Response) => {

})

UserRoutes.get('/:id', (req: Request, res: Response) => {
    const {id} = req.params
})


UserRoutes.post('/', async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    const {firstName, lastName, email, password, password2} = req.body
    if (password != password2) {
        res.json({
            'code': 500,
            'message': 'Password does not match'
        })
    }

    const u = new UserFactory()
    const newuser = await u.createUser(firstName, lastName, email, password)
    res.json(newuser)

})


export default UserRoutes
