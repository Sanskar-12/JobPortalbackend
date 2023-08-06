import express from "express"
import { isAdmin, isAuthenticated } from "../middlewares/Authentication.js"
import { allJobCategory, createJobType, deleteJobType, updateJobType } from "../controllers/jobTypeControllers.js"

const router=express.Router()

router.post("/create/jobtype",isAuthenticated,isAdmin,createJobType)

router.get("/allJobTypes",allJobCategory)

router.put("/update/:type_id",isAuthenticated,isAdmin,updateJobType)

router.delete("/delete/:type_id",isAuthenticated,isAdmin,deleteJobType)

export default router