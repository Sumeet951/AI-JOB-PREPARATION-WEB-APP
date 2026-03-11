import OpenAI from "openai";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const interviewReportSchema = z.object({
  matchScore: z.number(),
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),
  behaviourQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"])
    })
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string())
    })
  ),
  title: z.string()
});

export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

const prompt = `
Generate an interview preparation report.

Return ONLY JSON in this format:

{
 "title": "string",
 "matchScore": number,
 "technicalQuestions":[
  {
   "question":"string",
   "intention":"string",
   "answer":"string"
  }
 ],
 "behaviourQuestions":[
  {
   "question":"string",
   "intention":"string",
   "answer":"string"
  }
 ],
 "skillGaps":[
  {
   "skill":"string",
   "severity":"low | medium | high"
  }
 ],
 "preparationPlan":[
  {
   "day": number,
   "focus":"string",
   "tasks":["task1","task2"]
  }
 ]
}

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

const response = await client.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "user",
      content: prompt
    }
  ],
  temperature: 0.3
});

const text = response.choices[0].message.content;

console.log("RAW RESPONSE:", text);

const jsonStart = text.indexOf("{");
const jsonEnd = text.lastIndexOf("}");

const jsonString = text.slice(jsonStart, jsonEnd + 1);

const parsed = JSON.parse(jsonString);

return interviewReportSchema.parse(parsed);
}

