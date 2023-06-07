import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

// Routes import
import AuthRoute from './routes/auth.js'
import OrderRoute from './routes/order.js'
import TabsRoute from './routes/tabs.js'

dotenv.config()


const app = express()
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser())
app.use(cors())

app.use('/auth', AuthRoute)
app.use('/orders', OrderRoute)
app.use('/tabs', TabsRoute)


mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("\nDB ok")
        app.listen(port, (err) => {
            if (err) console.log(err)
            console.log(`\nServer has been started!\nURL: http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.log("DB error", err)
    })
