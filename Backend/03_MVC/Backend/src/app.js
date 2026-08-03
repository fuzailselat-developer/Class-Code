// External Modules
import express from "express"
import morgan from "morgan"

// Custom Modules
import router from './routes/index.js'
import connectDB from "./db/db.js"

const app = express()

// Middlewares
app.use(morgan('dev'))

// Database
connectDB()

// APIs
app.use("/api", router)


export default app