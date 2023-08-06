import { JobType } from "../models/JobTypeModels.js"

export const createJobType=async(req,res,next)=>{
    try {
        const {jobTypeName}=req.body
        const jobType=await JobType.create({jobTypeName,
        user:req.user.id
        })

        res.status(200).json({
            success:true,
            jobType
        })
    } catch (error) {
        next(error)
    }
}

export const allJobCategory=async(req,res,next)=>{
    try {
        const jobType=await JobType.find({})
        res.status(200).json({
            success:true,
            jobType
        })
    } catch (error) {
        next(error)
    }
}

export const updateJobType=async(req,res,next)=>{
    try {
        const {type_id}=req.params
        const jobType=await JobType.findByIdAndUpdate(type_id,req.body,{ new: true })
        res.status(200).json({
            success:true,
            jobType
        })
    } catch (error) {
        next(error)
    }
}
export const deleteJobType=async(req,res,next)=>{
    try {
        const {type_id}=req.params
        await JobType.findByIdAndDelete(type_id)
        res.status(200).json({
            success:true,
            message:"Job Type Deleted"
        })
    } catch (error) {
        next(error)
    }
}