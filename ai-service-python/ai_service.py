from google import genai
from dotenv import load_dotenv
import os
load_dotenv()
client=genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
def generate_interview_report(resume, self_description, job_description):

    prompt = f"""
Generate interview report JSON.

Resume: {resume}
Self Description: {self_description}
Job Description: {job_description}
"""

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    return response.text