import {Request, Response, Router} from "express"
import {User} from "../models/User"
import {UserModel} from "../models/UserModel"
import {UserHelper} from "../models/UserHelper"
import {isAuthenticated} from "../middleware/isAuthenticated"


const UserRoutes = Router()

UserRoutes.get('/index', isAuthenticated, async (req: Request, res: Response) => {
    const userModel = new UserModel()
    try {
        const li = await userModel.index()
        res.json(li)
    } catch(message) {
        res.json({'error':message})
    }

})

UserRoutes.get('/:id', isAuthenticated, (req: Request, res: Response) => {
    const {id} = req.params
})


// create user
UserRoutes.post('/', async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    const {firstName, lastName, email, password, password2} = req.body
    if (password != password2) {
        res.json({
            'code': 500,
            'message': 'Password does not match'
        })
    }

    const u = new UserHelper()
    const newuser = await u.createUser(firstName, lastName, email, password)
    res.json(newuser)

})


export default UserRoutes
