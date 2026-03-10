import express from "express"
import { getProfile, login, logout, register } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router=express.Router();
/**
 * @route POST /api/auth/register
 * @description Register a new username
 * @access Public
 */
router.post("/register",register)
/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
router.post("/login",login);
/**
 * @route GET /api/auth/logout
 * @description clear cookie from user cookie and add the token in blacklist
 * @access Public
 */
router.get("/logout",logout);
/**
 * @route GET /api/auth/get-me
 * @description 
 * @access Private
 */
router.get("/get-me",isLoggedIn,getProfile)

export default router;