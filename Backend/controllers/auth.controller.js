import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import tokenBlacklistModel from "../models/blacklist.model.js";
const cookieOptions=
    {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
}
/**
     * @name registerUserController
     * @description register a new user,expects username,email and password in the request body
     * @access public
     */
export const register=async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide username,email and password"
            })
        }
        const isUserAlreadyExists=await User.findOne({
            $or:[{username},{email}]
        });
        if(isUserAlreadyExists){
            return res.status(400).json({
                success:false,
                message:"User already Exist"
            })
        }
        const hash=await bcrypt.hash(password,10);
        const user=await User.create({
            username,
            email,
            password:hash
        });
        const token=jwt.sign(
            {id:user._id,username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        user.password=undefined;
        res.cookie("token",token,cookieOptions);
        res.status(201).json({
            success:true,
            message:"User registered Successfully",
            user:user

        })

    }
    catch(error){
        return next(new AppError(error.message,500))

    }

}
/**
 * @name loginUserController
 * @description login a user,expects email and password in the request body
 * @access Public
 */
export const login=async(req,res,next)=>{
    try{
      const {email,password}=req.body;
      if(!email || !password){
        return next(new AppError("Invalid credentials"));
      }
        const user=await User.findOne({email});
        if(!user){
            return next(new AppError("Invalid email or password"));
      }
      const isPasswordValid=await bcrypt.compare(password,user.password);
      if(!isPasswordValid){
        return next(new AppError("Password Wrong"));
      }
      const token=jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
      )
      res.cookie("token",token,cookieOptions);
      user.password=undefined;
      res.status(200).json({
        success:true,
        message:'User LoggedIn Successfully',
        user:user

      })
      
    }
    catch(err){
        return next(new AppError(err.message,500));
    }

}
/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist 
 * @access public
 * 
 */
export const logout=async(req,res,next)=>{
    const token=req.cookies.token
    if(token){
        await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token", cookieOptions);
    res.status(200).json({
        success:true,
        message:"User logged out succesfully"
    })
}
/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user detail
 * @access private 
 */
export const getProfile=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId);
        if(!user){
             return next (new AppError("User not found",404))
        }
        user.password=undefined;
        res.status(200).json({
            success:true,
            message:"Profile fetched succesfully",
            user
        })
    }
    catch(err){
        return next(new AppError(err.message,500))
    }
}