// External modules...!
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { users } from './data/users.js'
import cors from 'cors'

// Create server...!
const server = express()

// Middlewares...!
server.use(cors())
server.use(morgan('dev'))


// APIs...!
server.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: "Welcome to my first Express API 🚀"
  })
})

server.get('/users', (req, res) => {
  res.status(200).send({
    success: true,
    count: users.length,
    data: users
  })
})


// Start server...!
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
