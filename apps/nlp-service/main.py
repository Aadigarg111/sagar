from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import asyncio
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="SAGAR NLP Service",
    description="AI-powered natural language processing for coastal hazard reports",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class TextAnalysisRequest(BaseModel):
    text: str
    language: str = "en"
    context: Dict[str, Any] = {}

class TextAnalysisResponse(BaseModel):
    hazard_type: str
    severity: str
    confidence: float
    sentiment: str
    urgency: str
    keywords: List[str]
    is_misinformation: bool
    risk_score: float

class BatchAnalysisRequest(BaseModel):
    texts: List[str]
    language: str = "en"

class BatchAnalysisResponse(BaseModel):
    results: List[TextAnalysisResponse]
    processing_time: float

# Mock AI models (in production, these would be real ML models)
class MockHazardClassifier:
    def __init__(self):
        self.hazard_keywords = {
            "tsunami_warning": ["tsunami", "tidal wave", "seismic", "earthquake", "wave height"],
            "high_wave": ["high wave", "rough sea", "big wave", "stormy", "choppy"],
            "storm_surge": ["storm surge", "flooding", "water level", "tide", "coastal flood"],
            "flooding": ["flood", "water", "inundation", "overflow", "submerged"],
            "erosion": ["erosion", "beach loss", "coastline", "sand", "retreat"],
            "oil_spill": ["oil", "spill", "contamination", "pollution", "slick"],
            "marine_pollution": ["pollution", "contamination", "waste", "trash", "dirty water"],
        }
        
        self.severity_keywords = {
            "low": ["minor", "slight", "small", "low"],
            "medium": ["moderate", "medium", "noticeable", "significant"],
            "high": ["high", "severe", "dangerous", "extreme", "critical"],
            "critical": ["emergency", "evacuate", "urgent", "immediate", "life-threatening"]
        }

    def classify_hazard(self, text: str) -> tuple[str, float]:
        text_lower = text.lower()
        scores = {}
        
        for hazard_type, keywords in self.hazard_keywords.items():
            score = sum(1 for keyword in keywords if keyword in text_lower)
            scores[hazard_type] = score
        
        if not scores or max(scores.values()) == 0:
            return "other", 0.5
        
        best_hazard = max(scores, key=scores.get)
        confidence = min(scores[best_hazard] / len(self.hazard_keywords[best_hazard]), 1.0)
        
        return best_hazard, confidence

    def classify_severity(self, text: str) -> tuple[str, float]:
        text_lower = text.lower()
        scores = {}
        
        for severity, keywords in self.severity_keywords.items():
            score = sum(1 for keyword in keywords if keyword in text_lower)
            scores[severity] = score
        
        if not scores or max(scores.values()) == 0:
            return "medium", 0.5
        
        best_severity = max(scores, key=scores.get)
        confidence = min(scores[best_severity] / len(self.severity_keywords[best_severity]), 1.0)
        
        return best_severity, confidence

    def detect_misinformation(self, text: str) -> tuple[bool, float]:
        # Simple heuristics for misinformation detection
        misinformation_indicators = [
            "fake", "hoax", "not real", "false alarm", "exaggerated",
            "rumor", "unconfirmed", "doubt", "skeptical"
        ]
        
        text_lower = text.lower()
        indicator_count = sum(1 for indicator in misinformation_indicators if indicator in text_lower)
        
        # If text is very short or contains misinformation indicators
        is_misinformation = len(text.split()) < 3 or indicator_count > 0
        confidence = min(indicator_count / len(misinformation_indicators), 1.0)
        
        return is_misinformation, confidence

    def analyze_sentiment(self, text: str) -> str:
        positive_words = ["good", "safe", "calm", "normal", "fine", "okay"]
        negative_words = ["dangerous", "scary", "terrible", "awful", "bad", "worrying"]
        
        text_lower = text.lower()
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        if positive_count > negative_count:
            return "positive"
        elif negative_count > positive_count:
            return "negative"
        else:
            return "neutral"

    def assess_urgency(self, text: str) -> str:
        urgent_keywords = ["urgent", "immediate", "now", "emergency", "evacuate", "danger"]
        text_lower = text.lower()
        
        urgent_count = sum(1 for keyword in urgent_keywords if keyword in text_lower)
        
        if urgent_count > 0:
            return "high"
        elif "soon" in text_lower or "later" in text_lower:
            return "medium"
        else:
            return "low"

# Initialize the mock classifier
classifier = MockHazardClassifier()

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "nlp-service",
        "version": "1.0.0"
    }

@app.post("/analyze", response_model=TextAnalysisResponse)
async def analyze_text(request: TextAnalysisRequest):
    try:
        # Classify hazard type
        hazard_type, hazard_confidence = classifier.classify_hazard(request.text)
        
        # Classify severity
        severity, severity_confidence = classifier.classify_severity(request.text)
        
        # Detect misinformation
        is_misinformation, misinformation_confidence = classifier.detect_misinformation(request.text)
        
        # Analyze sentiment
        sentiment = classifier.analyze_sentiment(request.text)
        
        # Assess urgency
        urgency = classifier.assess_urgency(request.text)
        
        # Extract keywords (simple approach)
        words = request.text.lower().split()
        keywords = [word for word in words if len(word) > 3 and word.isalpha()][:10]
        
        # Calculate overall confidence
        overall_confidence = (hazard_confidence + severity_confidence + (1 - misinformation_confidence)) / 3
        
        # Calculate risk score (0-100)
        risk_score = 0
        if severity == "critical":
            risk_score = 90
        elif severity == "high":
            risk_score = 70
        elif severity == "medium":
            risk_score = 50
        else:
            risk_score = 30
        
        if urgency == "high":
            risk_score += 20
        elif urgency == "medium":
            risk_score += 10
        
        risk_score = min(risk_score, 100)
        
        return TextAnalysisResponse(
            hazard_type=hazard_type,
            severity=severity,
            confidence=round(overall_confidence, 2),
            sentiment=sentiment,
            urgency=urgency,
            keywords=keywords,
            is_misinformation=is_misinformation,
            risk_score=round(risk_score, 2)
        )
        
    except Exception as e:
        logger.error(f"Error analyzing text: {str(e)}")
        raise HTTPException(status_code=500, detail="Error analyzing text")

@app.post("/analyze/batch", response_model=BatchAnalysisResponse)
async def analyze_batch(request: BatchAnalysisRequest):
    try:
        import time
        start_time = time.time()
        
        results = []
        for text in request.texts:
            analysis_request = TextAnalysisRequest(text=text, language=request.language)
            result = await analyze_text(analysis_request)
            results.append(result)
        
        processing_time = time.time() - start_time
        
        return BatchAnalysisResponse(
            results=results,
            processing_time=round(processing_time, 2)
        )
        
    except Exception as e:
        logger.error(f"Error in batch analysis: {str(e)}")
        raise HTTPException(status_code=500, detail="Error in batch analysis")

@app.get("/models/status")
async def get_models_status():
    return {
        "hazard_classifier": "loaded",
        "severity_classifier": "loaded",
        "misinformation_detector": "loaded",
        "sentiment_analyzer": "loaded",
        "urgency_assessor": "loaded"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
