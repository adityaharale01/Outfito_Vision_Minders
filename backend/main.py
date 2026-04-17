from fastapi import FastAPI, File, UploadFile, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import shutil
import os
import cv2
import uuid

# ENV
from dotenv import load_dotenv
load_dotenv()

# GROQ
from groq import Groq

# ML models
from predict import predict_face_shape
from skin_tone import predict_skin_tone
from skin_type_predict import predict_skin_type

# DB
from app.db import engine, Base, SessionLocal
from app import models, crud

from fastapi.responses import FileResponse
app = FastAPI()

# DB create
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 BASE URL (IMPORTANT)
BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")

# FOLDERS
STATIC_FOLDER = "static"
UPLOAD_FOLDER = "uploads"

os.makedirs(STATIC_FOLDER, exist_ok=True)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# STATIC
@app.get("/static/{filename}")
def get_static_file(filename: str):
    file_path = os.path.join("static", filename)
    return FileResponse(file_path)

# DB SESSION
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GROQ SETUP
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_ai(data):
    try:
        prompt = f"""
        Give 3 short outfit suggestions:
        Face Shape: {data['face_shape']}
        Skin Tone: {data['skin_tone']}
        Skin Type: {data['skin_type']}
        Gender: {data['gender']}
        Occasion: {data['occasion']}
        Style: {data['style']}

        Output only 3 bullet points.
        """

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )

        return response.choices[0].message.content

    except Exception as e:
        print("AI ERROR:", e)
        return fallback_suggestion(data)


# 🔥 IMAGE FIX FUNCTION (IMPORTANT)
def fix_images(items):
    fixed = []

    for item in items:
        try:
            obj = item.__dict__ if hasattr(item, "__dict__") else item

            url = obj.get("image_url", "")

            # extract only filename
            filename = url.split("/")[-1]

            # always rebuild correct URL
            obj["image_url"] = f"{BASE_URL}/static/{filename}"

            fixed.append(obj)

        except Exception as e:
            print("Fix image error:", e)
            fixed.append(item)

    return fixed


# HOME
@app.get("/")
def home():
    return {"message": "API running 🚀"}


# ADD PRODUCT
@app.post("/add-product")
async def add_product(
    name: str = Form(...),
    brand: str = Form(...),
    price: str = Form(...),
    category: str = Form(...),
    skin_type: str = Form(None),
    face_shape: str = Form(None),
    skin_tone: str = Form(None),
    outfit_group: str = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"

    file_path = f"{STATIC_FOLDER}/{filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    product_data = {
        "name": name,
        "brand": brand,
        "price": price,
        "category": category,
        "skin_type": skin_type,
        "face_shape": face_shape,
        "skin_tone": skin_tone,
        "outfit_group": outfit_group,
        "image_url": f"{BASE_URL}/{file_path}"  # ✅ NEW DATA FIXED
    }

    return crud.create_product(db, product_data)


# FALLBACK AI
def fallback_suggestion(data):
    return """
Outfit 1: White Shirt + Blue Jeans
Outfit 2: Denim Jacket + T-Shirt + Slim Fit Jeans
Outfit 3: Printed Shirt + Black Jeans + Sneakers
"""


# RECOMMEND
@app.post("/recommend")
async def recommend(
    file: UploadFile = File(...),
    gender: str = Form(...),
    occasion: str = Form(...),
    style: str = Form(...),
    db: Session = Depends(get_db)
):
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"

    file_path = f"{UPLOAD_FOLDER}/{filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ML
    face_shape = predict_face_shape(file_path)
    skin_tone = predict_skin_tone(file_path)

    image = cv2.imread(file_path)
    skin_type = predict_skin_type(image)

    data = {
        "face_shape": face_shape,
        "skin_tone": skin_tone,
        "skin_type": skin_type,
        "gender": gender,
        "occasion": occasion,
        "style": style
    }

    # GROQ
    suggestion = generate_ai(data)

    # DB fetch
    facewash = crud.get_facewash_by_skin(db, skin_type)
    goggles = crud.get_goggles_by_face(db, face_shape)
    outfits = crud.get_outfit_by_tone(db, skin_tone)

    # 🔥 FIX OLD + NEW IMAGES
    facewash = fix_images(facewash)
    goggles = fix_images(goggles)
    outfits = fix_images(outfits)

    return {
        "analysis": data,
        "facewash": facewash,
        "goggles": goggles,
        "outfits": outfits,
        "recommendation": suggestion
    }