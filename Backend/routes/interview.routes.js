import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { generateInterviewReportController } from "../controllers/interview.controller.js";
const router=express.Router();

/**
 * @route POST /api/interview/
 * @description  generate new interview report on the basis of user self description,resume pdf and job description
 * @access private
 */
router.post("/",isLoggedIn,upload.single("resume"),generateInterviewReportController)
export default router