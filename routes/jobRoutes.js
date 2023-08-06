import express from "express"
import { isAdmin, isAuthenticated } from "../middlewares/Authentication.js"
import { createJob, showJobs, singleJob, updateJob } from "../controllers/jobControllers.js"

const router=express.Router()


router.post("/createjob",isAuthenticated,isAdmin,createJob)
router.get("/find/:id",singleJob)
router.put("/find/:job_id",isAuthenticated,isAdmin,updateJob)
router.get("/alljobs",showJobs)


export default router