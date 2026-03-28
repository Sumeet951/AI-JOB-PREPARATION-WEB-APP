import asyncio
import sys

if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
import io

from fastapi import FastAPI
from ai_service import generate_interview_report, generateResumePdf
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse


app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
class InputData(BaseModel):
    resume: str
    selfDescription: str
    jobDescription: str
@app.post("/generate-report")
def generate_report(data: InputData):
    report=generate_interview_report(
        data.resume,
        data.selfDescription,
        data.jobDescription
    )
    return report
@app.post("/generate-resume")
async def generate_resume(data: InputData):

    pdf_buffer = await generateResumePdf(
        data.resume,
        data.selfDescription,
        data.jobDescription
    )

    return StreamingResponse(
        io.BytesIO(pdf_buffer),
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=resume.pdf"
        }
    )