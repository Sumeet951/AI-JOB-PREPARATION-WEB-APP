from groq import Groq
from dotenv import load_dotenv
import os
import json
from pydantic import BaseModel
from typing import List, Literal
import pdfkit

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# -----------------------------
# SCHEMAS
# -----------------------------

class TechnicalQuestion(BaseModel):
    question: str
    intention: str
    answer: str


class BehaviourQuestion(BaseModel):
    question: str
    intention: str
    answer: str


class SkillGap(BaseModel):
    skill: str
    severity: Literal["low", "medium", "high"]


class PreparationDay(BaseModel):
    day: int
    focus: str
    tasks: List[str]


class InterviewReport(BaseModel):
    title: str
    matchScore: int
    technicalQuestions: List[TechnicalQuestion]
    behaviourQuestions: List[BehaviourQuestion]
    skillGaps: List[SkillGap]
    preparationPlan: List[PreparationDay]


class ResumePdfSchema(BaseModel):
    html: str


# -----------------------------
# INTERVIEW REPORT
# -----------------------------

def generate_interview_report(resume, self_description, job_description):

    prompt = f"""
Generate interview report JSON strictly matching the schema.

Resume: {resume}
Self Description: {self_description}
Job Description: {job_description}
"""

    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "interview_report",
                "schema": InterviewReport.model_json_schema()
            }
        },
        model="moonshotai/kimi-k2-instruct-0905",
    )

    raw_content = response.choices[0].message.content or "{}"
    raw_result = json.loads(raw_content)

    result = InterviewReport.model_validate(raw_result)

    return result.model_dump()


# -----------------------------
# PDF GENERATOR
# -----------------------------

# IMPORTANT for Windows
config = pdfkit.configuration(
    wkhtmltopdf=r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe"
)


def generate_pdf_from_html(html):

    pdf = pdfkit.from_string(
        html,
        False,
        configuration=config
    )

    return pdf


# -----------------------------
# RESUME GENERATOR
# -----------------------------

async def generateResumePdf(resume, selfDescription, jobDescription):

    prompt = f"""
Generate resume HTML.

Resume: {resume}
Self Description: {selfDescription}
Job Description: {jobDescription}

Return JSON:
{{
 "html":"resume html"
}}
"""

    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        response_format={"type": "json_object"},
        model="moonshotai/kimi-k2-instruct-0905",
    )

    data = json.loads(response.choices[0].message.content)

    pdf_buffer = generate_pdf_from_html(data["html"])

    return pdf_buffer