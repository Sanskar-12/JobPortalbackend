import express from "express"
import { isAdmin, isAuthenticated } from "../middlewares/Authentication.js"
import { allUsers, deleteUser, editUser, singleUser } from "../controllers/adminControllers.js"

const router=express.Router()

router.get("/getallusers",isAuthenticated,isAdmin,allUsers)
router.get("/getsingleuser/:id",isAuthenticated,isAdmin,singleUser)
router.put("/edituser/:id",isAuthenticated,isAdmin,editUser)
router.delete("/deleteuser/:id",isAuthenticated,isAdmin,deleteUser)


export default router