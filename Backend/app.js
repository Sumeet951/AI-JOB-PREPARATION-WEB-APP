import express from 'express'
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';
import {config} from 'dotenv'
config();
import cors from 'cors'
import morgan from 'morgan';
const app=express();
//Middleware
//Build import ''
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Third Party
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"], // add your frontend URL(s) here
    credentials: true,
}));
app.use(morgan('dev'));
//Server status route
app.get("/",(req,res)=>{
    res.send('Server is Working');
})

//Import all Routes
import authRoutes from "./routes/auth.routes.js"
//Default catch all route
app.use("/api/auth",authRoutes);
//custom error handling middlewares
app.use(errorMiddleware)
export default app