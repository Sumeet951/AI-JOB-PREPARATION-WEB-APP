import { PDFParse } from "pdf-parse";
import InterviewReportModel from "../models/interviewReport.model.js";
import { generateInterviewReport } from "../services/grok.js";
import AppError from "../utils/appError.js";
import { success } from "zod";
import { generateAIReport, generateResumePdf } from "../services/ai.service.js";

/**
 * 
 * @description Controller to generated interview report based on user self decription ,resume and jobdescription
 */
export const generateInterviewReportController = async (req,res,next)=>{

    try{

        const resumeFile = req.file;

        if(!resumeFile){
            return res.status(400).json({
                success:false,
                message:"Resume file is required"
            });
        }

        // Create parser instance
        const parser = new PDFParse({
            data: resumeFile.buffer
        });

        // Extract text
        const resumeContent = await parser.getText();

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateAIReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        const interviewReport = await InterviewReportModel.create({
            user: req.user?.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        });
        console.log("Interview Report", interviewReport);

       return  res.status(201).json({
            success:true,
            message:"Interview report generated successfully",
            data: interviewReport
        });

    }catch(err){
        next(new AppError(err.message,500));
    }

};
export const getInterviewReportController=async(req,res,next)=>{
    try{
        const {interviewId}=req.params;
        const interviewReport=await InterviewReportModel.findOne({_id:interviewId,user:req.user?.id})
        if(!interviewReport){
            return next(new AppError("Interview report not found",404));
        }

        res.status(200).json({
            success:true,
            data: interviewReport
        });

    }catch(err){
        return next(new AppError(err.message,500));
    }
}
export const getAllInterviewReportsController=async(req,res,next)=>{
    try{
        const interviewReports=await InterviewReportModel.find({user:req.user?.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -technicalQuestions -behaviourQuestions -skillGaps -preparationPlan");
        res.status(200).json({
            success:true,
            message:"Interview reports fetched successfully",
            data:interviewReports
        })

    }
    catch(err){
        return next(new AppError(err.message,500));
    }
}
/**
 * @description Controller to generate resume pdf based on user self description ,resume and job description
 */
export const generateResumePdfController=async(req,res,next)=>{
    const {interviewId}=req.params;
    try{
        const interviewReport=await InterviewReportModel.findOne({_id:interviewId})
        if(!interviewReport){
            return next(new AppError("Interview report not found",404));
        }
        const {resume,selfDescription,jobDescription}=interviewReport;
        const pdfBuffer=await generateResumePdf({resume,selfDescription,jobDescription});
        res.set({
            "Content-Type":"application/pdf",
            "Content-Disposition":`attachment; filename=resume_${interviewId}.pdf`
        });
        return res.send(pdfBuffer);
    }
    catch(err){
        return next(new AppError(err.message,500));
    }
}