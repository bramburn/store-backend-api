import {Request, Response, Router} from "express"
import {ProductServices} from "../application/Services/ProductServices"
import {IProduct} from "../models/Product"


const app = Router()
const _serv = new ProductServices()
app.get('/', async (req: Request, res: Response) => {
        return await _serv.getProducts()
    }
)

app.get('/show/{:id}', async (req: Request, res: Response) => {
    const {id} = req.params
    return await _serv.getProduct(Number.parseInt(id))
})

app.get('/create', async (req: Request, res: Response) => {
    const {name, price} = req.body
    return await _serv.createProducts({name, price} as IProduct)
})
export default app
