import { ErrorMiddleware } from "../middlewares/ErrorMiddleware.js";
import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/auth.js";
import ErrorHandler from "../utils/ErrorHandler.js"

export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    sendToken(user,res,"Registered Successfully",200)
  } catch (error) {
    next(error)
  }
};

export const signin=async(req,res,next)=>{
    try {
        const {email,password}=req.body
        let user=await User.findOne({email})
        if(!user)
        {
            return next(new ErrorHandler("Not Logged In",400))
        }


        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch)
        {
            return next(new ErrorHandler("Invalid Email or Password",400))
        }

        sendToken(user, res, `Welcome back, ${user.firstName}`, 200);
    } catch (error) {
        next(error)
    }
}

export const logout=(req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success:true,
        message:"Logged Out"
    })
}


export const profile=(req,res,next)=>{
  res.status(200).json({
    success:true,
    user:req.user
  })
}