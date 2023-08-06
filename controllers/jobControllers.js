import { Job } from "../models/jobModels.js"
import { JobType } from "../models/JobTypeModels.js"

export const createJob=async(req,res,next)=>{
    try {
        const {title,description,salary,location,jobType}=req.body
        const job=await Job.create({title,description,salary,location,jobType,
        user:req.user.id
        })

        res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        next(error)
    }
}

export const singleJob=async(req,res,next)=>{
    try {
        const {id}=req.params
        const job=await Job.findById(id)

        res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        next(error)
    }
}

export const updateJob=async(req,res,next)=>{
    try {
        let job=await Job.findByIdAndUpdate(req.params.job_id,req.body,{ new: true }).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName')

        res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        next(error)
    }
}


export const showJobs=async(req,res,next)=>{

    //search query
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    // filter jobs by category ids
    let ids = [];
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    jobTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids;


    //jobs by location
    let locations = [];
    const jobByLocation = await Job.find({}, { location: 1 });
    jobByLocation.forEach(val => {
        locations.push(val.location);
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;


    //pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({ ...keyword, jobType: categ , location: locationFilter  }).countDocuments();

    try {
        const jobs=await Job.find({ ...keyword , jobType: categ , location: locationFilter }).sort({ createdAt: -1 }).skip(pageSize * (page - 1)).limit(pageSize)

        res.status(200).json({
            success:true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        })
    } catch (error) {
        next(error)
    }
}
