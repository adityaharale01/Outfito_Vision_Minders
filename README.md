# AI Fashion Stylist 👔

## Features
- Face Shape Detection
- Skin Tone Detection
- Skin Type Detection
- Outfit Recommendation (AI)
- Facewash + Goggles + Outfit Suggestions

---

## 🔥 Run Backend (ML)

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

---

## 🤖 Run Groq Backend

cd backend-groq
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

Create `.env`:
GROQ_API_KEY=your_key

uvicorn main:app --port 8001 --reload

---

## 🎨 Run Frontend

cd frontend
npm install
npm run dev