import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import tokenBlacklistModel from "../models/blacklist.model.js";
export const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new AppError(
          "You are not logged in! Please login to access this resource",
          401,
        ),
      );
    }
    const isTokenBlacklisted=await tokenBlacklistModel.findOne({
      token
    })
    if(isTokenBlacklisted){
      return res.status(401).json({
        success:false,
        message:"Token is Invalid"
      })
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new AppError("Invalid Token,Please login again", 401));
    }
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};
