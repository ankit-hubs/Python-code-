from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import time
import os
import google.generativeai as genai
from dotenv import load_dotenv
import json
import re

# Load environment variables
from pathlib import Path
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    text: str
    country: str

class AnalysisResponse(BaseModel):
    country: str
    translated_meaning: str
    risk_level: str
    reasoning: str
    alternatives: list[str]

# --- Gemini API Setup ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"⚠️ Failed to configure Gemini: {e}")

def call_gemini_api(text: str, country: str):
    """
    Calls Google Gemini API to analyze the cultural risk of a message.
    """
    if not GEMINI_API_KEY or "paste_your" in GEMINI_API_KEY:
        print("⚠️ Gemini API Key missing or invalid. Using Mock Service.")
        return mock_analyze(text, country)

    try:
        # Use gemini-2.5-flash
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = f"""
        You are a Cultural Communication Expert. Analyze this message for a professional business context in {country}.
        
        Message: "{text}"
        
        Return a valid JSON object with EXACTLY these fields:
        - "translated_meaning": A short string explaining what this message implies to a local in {country}.
        - "risk_level": One of "✅ Safe & Culturally Appropriate", "⚠️ Potentially Misunderstood", or "❌ Culturally Risky / Offensive".
        - "reasoning": A 1-2 sentence explanation of why, referencing specific cultural norms.
        - "alternatives": A list of 2-3 safer/better rewrites (strings).
        
        Output only the raw JSON string. Do not use Markdown code blocks.
        """

        response = model.generate_content(prompt)
        
        # Clean up response if it contains markdown formatting
        clean_text = response.text.strip()
        if clean_text.startswith("```json"):
            clean_text = clean_text[7:]
        elif clean_text.startswith("```"):
            clean_text = clean_text[3:]
        if clean_text.endswith("```"):
            clean_text = clean_text[:-3]
            
        result = json.loads(clean_text)
        
        # Ensure country field exists
        result["country"] = country
        return result

    except Exception as e:
        print(f"❌ Gemini API Failed: {e}")
        return mock_analyze(text, country)

# --- Enhanced Mock Service (Rule-Based AI) ---
def mock_analyze(text: str, country: str):
    text_lower = text.lower()
    
    # Default Safe Response
    result = {
        "country": country,
        "translated_meaning": "The message appears direct and clear.",
        "risk_level": "✅ Safe & Culturally Appropriate",
        "reasoning": f"This message generally aligns with standard business communication, though cultural nuances in {country} always favor politeness.",
        "alternatives": [
            f"Greetings, {text}",
            f"{text} Thank you.",
            f"Dear Team, {text}"
        ]
    }

    # --- Global Heuristics ---
    
    # 1. SHOUTING CHECK
    if text.isupper() and len(text) > 5:
        result.update({
            "translated_meaning": "You are shouting or angry.",
            "risk_level": "❌ Culturally Risky / Offensive",
            "reasoning": "Using all caps is universally perceived as aggressive shouting.",
            "alternatives": [text.capitalize(), "I would like to emphasize this point: " + text.lower()]
        })
        return result

    # 2. Urgent/Aggressive Keywords
    urgent_words = ["asap", "urgently", "now", "immediately", "deadline"]
    if any(w in text_lower for w in urgent_words):
        result.update({
            "translated_meaning": "You are demanding immediate attention, potentially disregarding the recipient's schedule.",
            "risk_level": "⚠️ Potentially Misunderstood",
            "reasoning": f"In {country}, as in many cultures, demanding urgency can imply poor planning on your part or lack of respect for their time.",
            "alternatives": [
                text.replace("ASAP", "at your earliest convenience").replace("immediately", "when possible"),
                "Could you please prioritize this if time permits?",
                "We are working with a tight timeline and would appreciate your help."
            ]
        })

    # --- Country Specific Rules ---

    if country == "Japan":
        if "no" in text_lower.split() or "cannot" in text_lower or "won't" in text_lower:
            result.update({
                "translated_meaning": "A direct refusal or confrontation.",
                "risk_level": "❌ Culturally Risky / Offensive",
                "reasoning": "Direct refusal is avoided in Japan to maintain harmony. Use 'soft' refusals like 'it is difficult'.",
                "alternatives": ["This might be difficult to achieve.", "We would like to consider this, but there are challenges."]
            })
        elif "?" not in text and len(text.split()) < 5:
            result.update({
                "translated_meaning": "A blunt statement or command.",
                "risk_level": "⚠️ Potentially Misunderstood",
                "reasoning": "Short, direct sentences can sound cold. Japanese business emails are often longer and more indirect.",
                "alternatives": [f"I am writing to share that {text}", f"Regarding the matter of: {text}"]
            })

    elif country == "China":
        if "problem" in text_lower or "issue" in text_lower or "wrong" in text_lower:
             result.update({
                "translated_meaning": "You are pointing out a failure, potentially causing loss of face.",
                "risk_level": "❌ Culturally Risky / Offensive",
                "reasoning": "Criticism should be delivered privately and subtly to preserve 'mianzi' (face).",
                "alternatives": ["We see an area for improvement here.", "Let's look at how we can optimize this result."]
            })
    
    elif country == "India":
        if "no" in text_lower.split():
            result.update({
                 "translated_meaning": "A harsh rejection.",
                 "risk_level": "⚠️ Potentially Misunderstood",
                 "reasoning": "In India, 'no' is often softened to 'I will try' or 'let me check' to maintain the relationship.",
                 "alternatives": ["I will see what I can do, but it may be tough.", "Let me get back to you on this."]
            })

    elif country in ["United Arab Emirates", "Saudi Arabia"]:
        if len(text.split()) < 10 and not any(x in text_lower for x in ["hello", "hi", "dear", "salam", "greetings"]):
             result.update({
                "translated_meaning": "You are strictly transactional and ignoring the relationship.",
                "risk_level": "⚠️ Potentially Misunderstood",
                "reasoning": "Relationship building is crucial. Jumping straight to business without a greeting is considered rude.",
                "alternatives": [f"As-salamu alaykum. {text}", f"I hope this message finds you well. {text}"]
            })
    
    elif country == "Germany":
        if "feel" in text_lower or "guess" in text_lower:
             result.update({
                "translated_meaning": "You are unprepared or relying on emotion rather than facts.",
                "risk_level": "⚠️ Potentially Misunderstood",
                "reasoning": "German business culture values objectivity, facts, and precision over feelings or vague estimates.",
                "alternatives": ["The data indicates that...", "Based on the analysis..."]
            })
            
    elif country == "United States":
        if "perhaps" in text_lower or "maybe" in text_lower:
             result.update({
                "translated_meaning": "You are unsure or lack confidence.",
                "risk_level": "⚠️ Potentially Misunderstood",
                "reasoning": "US business culture rewards directness and confidence. Vagueness can be seen as incompetence.",
                "alternatives": ["I recommend we do X.", "The best course of action is..."]
            })

    # 3. Dynamic Alternatives Generation (If empty)
    if not result["alternatives"]:
        result["alternatives"] = [
            f"Kindly note: {text}",
            f"I wanted to inform you that {text}",
            f"With respect to our project, {text}"
        ]

    return result

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_message(request: MessageRequest):
    return call_gemini_api(request.text, request.country)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)