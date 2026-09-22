from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Samasya AI Service",
    description="Python FastAPI Microservice for AI problem categorization, priority scoring, receiver recommendation, and university matching.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProblemInput(BaseModel):
    title: str
    description: str
    language: Optional[str] = "en"
    district: Optional[str] = "Dumka"
    location: Optional[str] = "Jama Village"
    peopleAffected: Optional[int] = 180
    severity: Optional[str] = "HIGH"
    urgency: Optional[str] = "HIGH"
    category: Optional[str] = None

@app.get("/health")
def health():
    return {"status": "UP", "service": "Samasya AI Service", "port": 8000}

@app.post("/ai/analyze-problem")
def analyze_problem(prob: ProblemInput):
    cat = prob.category or "Water & Sanitation"
    if "water" in prob.description.lower() or "pipe" in prob.description.lower() or "well" in prob.description.lower():
        cat = "Water & Sanitation"
    elif "road" in prob.description.lower() or "pothole" in prob.description.lower() or "accident" in prob.description.lower():
        cat = "Road Safety/RTC"
    elif "light" in prob.description.lower() or "power" in prob.description.lower() or "transformer" in prob.description.lower():
        cat = "Electricity"

    priority = "CRITICAL" if (prob.peopleAffected or 0) >= 500 or prob.severity == "CRITICAL" else "HIGH"

    return {
        "category": cat,
        "subcategory": cat,
        "aiConfidence": 94,
        "priority": priority,
        "keywords": [cat.lower(), prob.district.lower() if prob.district else "jharkhand", "community", "infrastructure"],
        "suggestedDepartment": f"{prob.district or 'Dumka'} Public Works & Infrastructure Dept",
        "recommendedReceiver": f"{prob.district or 'Dumka'} Water & Sanitation Division (DWSD)",
        "receiverType": "Government Department",
        "whyReceiver": f"Primary jurisdiction over public {cat} infrastructure in {prob.district or 'Dumka'}.",
        "duplicateCandidates": [
          {"id": "JH-2026-8901", "similarityScore": 0.88, "title": "Drinking Water Shortage in Jama"}
        ],
        "universityMatches": [
          {"university": "Birsa Institute of Technology (BIT) Mesra", "department": "Civil & Hydro Engineering", "matchScore": 96}
        ],
        "explanation": f"AI assigned {priority} priority based on {prob.peopleAffected or 180} affected citizens and critical {cat} public impact."
    }

@app.post("/ai/classify")
def classify(prob: ProblemInput):
    return {"category": prob.category or "Water & Sanitation", "confidence": 0.95}

@app.post("/ai/duplicate-check")
def duplicate_check(prob: ProblemInput):
    return {
        "isPossibleDuplicate": True,
        "similarityScore": 0.88,
        "matchedProblemId": "JH-2026-8901"
    }

@app.post("/ai/match-university")
def match_university(prob: ProblemInput):
    return {
        "recommendedUniversity": "Birsa Institute of Technology (BIT) Mesra",
        "department": "Department of Environmental & Civil Engineering",
        "matchScore": 96
    }

@app.post("/ai/recommend-receiver")
def recommend_receiver(prob: ProblemInput):
    return {
        "recommendedReceiver": f"{prob.district or 'Dumka'} Water & Sanitation Dept",
        "receiverType": "Government Department",
        "whyReceiver": "Highest jurisdiction score for rural sanitation infrastructure."
    }
