import { Request, Response, Router } from 'express'
import { ProductModel } from '../models/ProductModel'

const ProductRoutes = Router()

ProductRoutes.get('/index', (req: Request, res: Response) => {})

ProductRoutes.get('/:id', (req: Request, res: Response) => {})

ProductRoutes.post('/', (req: Request, res: Response) => {
    //create item
    // const p = new ProductModel()
    // p.create()
})


export default ProductRoutes
