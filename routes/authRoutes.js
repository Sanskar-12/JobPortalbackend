import express from "express"
import { logout, profile, signin, signup } from "../controllers/authControllers.js"
import { isAuthenticated } from "../middlewares/Authentication.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/logout",logout)
router.get("/me",isAuthenticated,profile)

export default router

