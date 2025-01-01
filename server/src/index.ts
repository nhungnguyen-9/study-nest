import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import * as dynamoose from 'dynamoose'
import { log } from 'console'
// route imports
import courseRoutes from "./routes/courseRoutes"

// config
dotenv.config()
const isProd = process.env.NODE_ENV === "production"

if (!isProd) {
    dynamoose.aws.ddb.local()
}

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// routes
app.get("/", (req, res) => {
    res.send('hello Orm')
})

app.use("/courses", courseRoutes)


// server
const port = process.env.PORT || 3000
if (!isProd) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}