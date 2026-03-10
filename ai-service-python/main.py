from fastapi import FastAPI
from ai_service import generate_interview_report
app=FastAPI()
@app.post("/generate-report")
def generate_report(data:dict):
    report=generate_interview_report(
        data["resume"],
        data["selfDescription"],
        data["jobDescription"]
    )
    return report