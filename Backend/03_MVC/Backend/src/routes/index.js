import { Router } from "express";
import userRoutes from './user.routes.js'

const mainRouter = Router()

mainRouter.use('/users', userRoutes)

export default mainRouter