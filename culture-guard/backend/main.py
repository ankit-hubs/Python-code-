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

SUPPORTED_COUNTRIES = [
  "United States", "Japan", "Germany", "Brazil", "India", "France", 
  "China", "South Korea", "United Arab Emirates", "Saudi Arabia", 
  "United Kingdom", "Spain", "Mexico", "Canada", "Australia", 
  "Netherlands", "Sweden", "Singapore", "Italy", "Russia"
]

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
        try:
            model = genai.GenerativeModel('gemini-2.5-flash')
        except:
            model = genai.GenerativeModel('gemini-2.0-flash')

        if country == "Select All Countries":
            prompt = f"""
            You are a Global Cross-Cultural Communication Expert. 
            
            Analyze the following message for a **General International Business Audience**. 
            Do NOT analyze specific countries individually. Instead, focus on universal business standards, clarity, politeness, and "Global English" best practices.

            Message: "{text}"

            Goal: Ensure the message is safe, clear, and professional for a diverse, multi-cultural audience.

            Output Format:
            Return a valid JSON LIST containing EXACTLY ONE object:
            {{
                "country": "Global",
                "translated_meaning": "How this message is likely perceived by a general international audience.",
                "risk_level": "One of: '✅ Safe & Culturally Appropriate', '⚠️ Potentially Misunderstood', or '❌ Culturally Risky / Offensive'",
                "reasoning": "Explain if the message uses idioms, slang, excessive directness, or ambiguity that might confuse non-native speakers or diverse cultures generally.",
                "alternatives": ["Alternative 1 (Universally safe)", "Alternative 2 (Formal & Clear)"]
            }}
            
            Return ONLY the raw JSON string. No Markdown.
            """
        else:
            prompt = f"""
            You are a Senior Cultural Communication Consultant for {country}. 
            
            Analyze the following message for a professional business context in {country}.

            Message: "{text}"

            Your Goal: Ensure the sender builds a strong relationship and avoids faux pas.

            Output Format:
            Return a valid JSON object with:
            - "translated_meaning": What a local in {country} likely understands or feels.
            - "risk_level": One of "✅ Safe & Culturally Appropriate", "⚠️ Potentially Misunderstood", or "❌ Culturally Risky / Offensive".
            - "reasoning": Deep cultural insight explaining WHY. Reference concepts like 'Hofstede dimensions' or specific local business etiquette where relevant.
            - "alternatives": A list of 2-3 culturally tailored rewrites.

            Return ONLY the raw JSON string. No Markdown.
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
            
        data = json.loads(clean_text)
        
        # Normalize to list
        if isinstance(data, dict):
            if country != "Select All Countries":
                data["country"] = country
            results = [data]
        elif isinstance(data, list):
            results = data
        else:
            results = []

        return results

    except Exception as e:
        print(f"❌ Gemini API Failed: {e}")
        # Try fallback to flash if Pro failed specifically on generation (though rare for just model name)
        if 'gemini-1.5-pro' in str(model):
             try:
                print("⚠️ Retrying with Gemini 1.5 Flash...")
                model = genai.GenerativeModel('gemini-1.5-flash')
                response = model.generate_content(prompt)
                # ... same cleaning logic could be applied but for simplicity, allow fallback to Mock if this also fails
             except:
                pass
                
        return mock_analyze(text, country)

# --- Enhanced Mock Service (Rule-Based AI) ---
def mock_analyze(text: str, country: str):
    text_lower = text.lower()
    results = []
    
    countries_to_check = SUPPORTED_COUNTRIES if country == "Select All Countries" else [country]
    
    # Common Logic Helpers
    def check_country(c):
        res = {
            "country": c,
            "translated_meaning": "The message appears direct and clear.",
            "risk_level": "✅ Safe & Culturally Appropriate",
            "reasoning": f"This message generally aligns with standard business communication in {c}.",
            "alternatives": []
        }
        
        is_risky = False

        # 1. SHOUTING CHECK (Global)
        if text.isupper() and len(text) > 5:
            res.update({
                "translated_meaning": "You are shouting or angry.",
                "risk_level": "❌ Culturally Risky / Offensive",
                "reasoning": "Using all caps is universally perceived as aggressive shouting.",
                "alternatives": [text.capitalize(), "I would like to emphasize this point: " + text.lower()]
            })
            return res, True

        # 2. Urgent/Aggressive Keywords (Global-ish)
        urgent_words = ["asap", "urgently", "now", "immediately", "deadline"]
        if any(w in text_lower for w in urgent_words):
            res.update({
                "translated_meaning": "You are demanding immediate attention.",
                "risk_level": "⚠️ Potentially Misunderstood",
                "reasoning": f"In {c}, demanding urgency can imply poor planning or lack of respect.",
                "alternatives": [
                    text.replace("ASAP", "at your earliest convenience"),
                    "Could you please prioritize this?"
                ]
            })
            is_risky = True

        # Country Specifics
        if c == "Japan":
            if "no" in text_lower.split() or "cannot" in text_lower or "won't" in text_lower:
                res.update({
                    "translated_meaning": "A direct refusal or confrontation.",
                    "risk_level": "❌ Culturally Risky / Offensive",
                    "reasoning": "Direct refusal is avoided in Japan.",
                    "alternatives": ["This might be difficult to achieve."]
                })
                is_risky = True
            elif "?" not in text and len(text.split()) < 5:
                res.update({
                    "translated_meaning": "A blunt statement or command.",
                    "risk_level": "⚠️ Potentially Misunderstood",
                    "reasoning": "Short, direct sentences can sound cold.",
                    "alternatives": [f"I am writing to share that {text}"]
                })
                is_risky = True

        elif c == "China":
            if "problem" in text_lower or "issue" in text_lower:
                 res.update({
                    "translated_meaning": "Pointing out a failure publicly.",
                    "risk_level": "❌ Culturally Risky / Offensive",
                    "reasoning": "Criticism should be subtle to preserve 'mianzi' (face).",
                    "alternatives": ["We see an area for improvement here."]
                })
                 is_risky = True
        
        elif c == "India":
            if "no" in text_lower.split():
                res.update({
                     "translated_meaning": "A harsh rejection.",
                     "risk_level": "⚠️ Potentially Misunderstood",
                     "reasoning": "'No' is often softened in India.",
                     "alternatives": ["I will see what I can do."]
                })
                is_risky = True

        elif c in ["United Arab Emirates", "Saudi Arabia"]:
            if len(text.split()) < 10 and not any(x in text_lower for x in ["hello", "hi", "dear", "salam"]):
                 res.update({
                    "translated_meaning": "Strictly transactional, ignoring relationship.",
                    "risk_level": "⚠️ Potentially Misunderstood",
                    "reasoning": "Greetings are crucial before business.",
                    "alternatives": [f"As-salamu alaykum. {text}"]
                })
                 is_risky = True
        
        elif c == "Germany":
            if "feel" in text_lower or "guess" in text_lower:
                 res.update({
                    "translated_meaning": "Unprepared or emotional.",
                    "risk_level": "⚠️ Potentially Misunderstood",
                    "reasoning": "German culture values facts over feelings.",
                    "alternatives": ["The data indicates that..."]
                })
                 is_risky = True

        elif c == "United States":
            if "perhaps" in text_lower or "maybe" in text_lower:
                 res.update({
                    "translated_meaning": "Unsure or lacking confidence.",
                    "risk_level": "⚠️ Potentially Misunderstood",
                    "reasoning": "US culture rewards directness.",
                    "alternatives": ["I recommend we do X."]
                })
                 is_risky = True

        if not res["alternatives"]:
            res["alternatives"] = [f"Kindly note: {text}", f"Regarding: {text}"]

        return res, is_risky

    # Logic for Select All vs Single
    if country == "Select All Countries":
        risky_results = []
        for c in countries_to_check:
            res, is_risky = check_country(c)
            if is_risky:
                risky_results.append(res)
        
        if risky_results:
            return risky_results
        else:
            # If nothing is risky, return a global safe
            return [{
                "country": "Global",
                "translated_meaning": "The message appears direct and universally acceptable.",
                "risk_level": "✅ Safe & Culturally Appropriate",
                "reasoning": "No significant cultural risks detected across supported regions.",
                "alternatives": []
            }]
    else:
        res, _ = check_country(country)
        return [res]

@app.post("/analyze", response_model=list[AnalysisResponse])
async def analyze_message(request: MessageRequest):
    return call_gemini_api(request.text, request.country)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)