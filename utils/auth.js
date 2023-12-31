import jwt from "jsonwebtoken"


export const sendToken=(user,res,message,statusCode)=>{
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY)

    res.status(statusCode).cookie("token",token,{
        httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
      sameSite:process.env.NODE_ENV==="Development" ? "lax":"none",
      secure:process.env.NODE_ENV==="Development" ? false:true,
    }).json({
        success:true,
        role:user.role,
        message:message,
    })
}