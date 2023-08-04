import mongoose from "mongoose";

const connectDB=async()=>{


    try {
        const {connection}=await mongoose.connect(process.env.DATABASE)
        console.log(`Database Connected with ${connection.host}`)
        
    } catch (error) {
        console.log(error)
    }
}

export default connectDB
