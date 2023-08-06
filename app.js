import express, { urlencoded } from "express"
import { config } from "dotenv"
import connectDB from "./config/database.js"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import { ErrorMiddleware } from "./middlewares/ErrorMiddleware.js"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import jobTypeRoutes from "./routes/jobTypeRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"

const app=express()


config({path:"./config/config.env"})


//Database
connectDB()

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(urlencoded({
    extended:true
}))
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
  }))

//Routes Middlewares
app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/jobType",jobTypeRoutes)
app.use("/api/job",jobRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT} in ${process.env.NODE_ENV}`)
})


//Error Middleware
app.use(ErrorMiddleware)