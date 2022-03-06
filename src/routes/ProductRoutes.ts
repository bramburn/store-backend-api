import { Request, Response, Router } from 'express'
import { ProductModel } from '../models/ProductModel'

const app = Router()

app.get('/index', (req: Request, res: Response) => {})

app.get('/:id', (req: Request, res: Response) => {})

app.post('/', (req: Request, res: Response) => {
    //create item
    // const p = new ProductModel()
    // p.create()
})
