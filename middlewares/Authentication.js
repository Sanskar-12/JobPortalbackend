import { User } from "../models/userModels.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import jwt from "jsonwebtoken"

export const isAuthenticated=async(req,res,next)=>{
    const {token}=req.cookies

    if(!token)
    {
        return next(new ErrorHandler("Not authorised to access this resource",400))
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decoded._id)
    next()
}

export const isAdmin=(req,res,next)=>{
    if(req.user.role===0)
    {
        return next(new ErrorHandler("Access denied,You must be Admin",400))
    }
    next()
}