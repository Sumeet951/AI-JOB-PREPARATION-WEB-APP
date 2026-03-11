import { PDFParse } from "pdf-parse";
import InterviewReportModel from "../models/interviewReport.model.js";
import { generateInterviewReport } from "../services/grok.js";

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

        const interviewReportByAi = await generateInterviewReport({
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

        res.status(201).json({
            success:true,
            data: interviewReport
        });

    }catch(err){
        next(err);
    }

};