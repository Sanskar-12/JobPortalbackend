import { User } from "../models/userModels.js"

export const allUsers=async(req,res,next)=>{

    //pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        let users=await User.find({}).sort({ createdAt: -1 }).select('-password').skip(pageSize * (page - 1)).limit(pageSize)

        res.status(200).json({
            success:true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
    } catch (error) {
        next(error)
    }
}

export const singleUser=async(req,res,next)=>{
    try {
        let user=await User.findById(req.params.id).select("-password")
        res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        next(error)
    }
}

export const editUser=async(req,res,next)=>{
    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUser=async(req,res,next)=>{
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success:true,
            message:"User Removed"
        })
    } catch (error) {
        next(error)
    }
}