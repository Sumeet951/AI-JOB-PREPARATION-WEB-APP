import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { generateInterviewReportController, generateResumePdfController, getAllInterviewReportsController, getInterviewReportController } from "../controllers/interview.controller.js";
const router=express.Router();

/**
 * @route POST /api/interview/
 * @description  generate new interview report on the basis of user self description,resume pdf and job description
 * @access private
 */
router.post("/",isLoggedIn,upload.single("resume"),generateInterviewReportController)
/**
 * @route GET /api/interview/:interviewId
 * @description  get interview report by id
 * @access private
 */
router.get("/:interviewId",isLoggedIn,getInterviewReportController)
/**
 * @route GET /api/interview/
 * @description  get all interview reports of logged in user
 * @access private
 */
router.get("/",isLoggedIn,getAllInterviewReportsController)
/**
 * @route GET /api/interview/generate-resume-pdf/:interviewId
 * @description  generate resume pdf based on user self description ,resume and job description
 * @access private
 */
router.post("/resume/pdf/:interviewId",isLoggedIn,upload.single("resume"),generateResumePdfController)

export default router