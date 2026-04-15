from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

# 🔥 Load .env
load_dotenv()

# 🔥 Initialize FastAPI
app = FastAPI()

# 🔥 Load API Key
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("❌ GROQ_API_KEY not found in .env")

client = Groq(api_key=api_key)


# ---------------- INPUT MODEL ----------------
class InputData(BaseModel):
    face_shape: str
    skin_tone: str
    skin_type: str
    gender: str
    occasion: str
    style: str


# ---------------- HOME ----------------
@app.get("/")
def home():
    return {"message": "Groq AI Backend Running 🚀"}


# ---------------- AI RECOMMEND ----------------
@app.post("/ai-recommend")
def ai_recommend(data: InputData):

    # 🔥 Prompt Engineering
    prompt = f"""
You are a fashion stylist AI.

User:
- Gender: {data.gender}
- Face Shape: {data.face_shape}
- Skin Tone: {data.skin_tone}
- Occasion: {data.occasion}
- Style: {data.style}

👉 Give ONLY 3 outfit suggestions.

FORMAT STRICTLY:
Outfit 1: <short combo>
Outfit 2: <short combo>
Outfit 3: <short combo>

❌ Do NOT explain
❌ Do NOT give paragraphs
❌ Keep each under 10 words
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # ✅ WORKING MODEL
            messages=[
                {"role": "system", "content": "You are a professional fashion stylist."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=300
        )

        result = response.choices[0].message.content

        return {
            "success": True,
            "suggestion": result
        }

    except Exception as e:
        print("❌ GROQ ERROR:", e)

        return {
            "success": False,
            "suggestion": "AI service temporarily unavailable"
        }