import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import SignRoutes from "./routes/SignRoutes"
import UserRoutes from "./routes/UserRoutes"
import OrderRoutes from "./routes/OrderRoutes"
import ProductRoutes from "./routes/ProductRoutes"

const app = express()
const port = 3000
app.use(express.json())
// app.use(bodyParser.json())
app.use('/sign', SignRoutes)
app.use('/user', UserRoutes)
app.use('/orders', OrderRoutes)
app.use('/product', ProductRoutes)


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World2!')
})

app.listen(port, function () {
    console.log(`starting app on: http://localhost:${port}`)
})

export default app
