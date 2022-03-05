import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import SignRoutes from "./routes/SignRoutes"

const app = express()
const port = 3000
app.use(express.json())
app.use(bodyParser.json())
app.use('/sign', SignRoutes)

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World2!')
})

app.listen(port, function () {
    console.log(`starting app on: http://localhost:${port}`)
})

export default app
