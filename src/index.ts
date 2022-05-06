import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import ProductRoutes from './routes/ProductRoutes'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('products', ProductRoutes)

// todo delete the following api
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World')
})

app.listen(port, function () {
    console.log(`starting app on: http://localhost:${port}`)
})

export default app
