import { Request, Response, Router } from 'express'
import { ProductModel } from '../models/ProductModel'
import {isAuthenticated} from "../middleware/isAuthenticated"

const ProductRoutes = Router()

ProductRoutes.get('/index', (req: Request, res: Response) => {})

ProductRoutes.get('/:id', (req: Request, res: Response) => {})

ProductRoutes.post('/',isAuthenticated ,(req: Request, res: Response) => {
    //create item
    // const p = new ProductModel()
    // p.create()
    res.json({'status':'ok'})
})


export default ProductRoutes
