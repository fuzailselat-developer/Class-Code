import { Router } from "express";
import { GetUsersControllers } from "../controllers/user.controllers.js";



const router = Router()

router.get("/", GetUsersControllers)

export default router