import {Request, Response, Router} from 'express'
import {ProductModel} from "../models/ProductModel"
import {IProduct, Product} from "../models/Product"

const app = Router()

// products
app.get('/', async (req: Request, res: Response) => {
    try {

        const p = new ProductModel()
        const li: IProduct[] = await p.index()
        res.json(li)
    } catch (e) {
        res.status(500).json({
            'message': e.message,
            'code': e.code
        })
    }
})

app.get('/{:id}', async (req: Request, res: Response) => {
    try {

        const {id} = req.params
        const p = new ProductModel()
        const li: IProduct = await p.show(id as unknown as number)
        res.json(li)
    } catch (e) {
        res.status(500).json({
            'message': e.message,
            'code': e.code
        })
    }
})

app.patch('/{:id}', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const {name, price} = req.body
        const p = new ProductModel()
        const up = new Product(name, Number.parseFloat(price), Number.parseInt(id))

        const li = await p.patch(up)
        res.json(li)
    } catch (e) {
        res.status(500).json({
            'message': e.message,
            'code': e.code
        })
    }
})


export default app
