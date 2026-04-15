from fastapi import FastAPI, File, UploadFile, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import shutil
import os
import cv2
import uuid
import requests  # 🔥 NEW

# ML models
from predict import predict_face_shape
from skin_tone import predict_skin_tone
from skin_type_predict import predict_skin_type

# DB
from app.db import engine, Base, SessionLocal
from app import models, crud

app = FastAPI()

# 🔥 DB create
Base.metadata.create_all(bind=engine)

# 🔥 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 FOLDERS
STATIC_FOLDER = "static"
UPLOAD_FOLDER = "uploads"

os.makedirs(STATIC_FOLDER, exist_ok=True)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 🔥 STATIC
app.mount("/static", StaticFiles(directory=STATIC_FOLDER), name="static")

# 🔥 DB SESSION
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- HOME ----------------
@app.get("/")
def home():
    return {"message": "API running 🚀"}


# ---------------- ADD PRODUCT ----------------
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
        "image_url": file_path
    }

    return crud.create_product(db, product_data)


# ---------------- FALLBACK AI ----------------
def fallback_suggestion(data):
    tone = data["skin_tone"]
    occasion = data["occasion"]

    if tone == "fair":
        base = "White Shirt + Blue Jeans"
    elif tone == "medium":
        base = "Black Shirt + Grey Pant"
    else:
        base = "Pastel Shirt + Beige Trouser"

    if occasion == "party":
        extra = "Add blazer and sneakers"
    elif occasion == "formal":
        extra = "Add formal shoes and watch"
    else:
        extra = "Keep it casual with sneakers"

    return f"""
Outfit 1: {base}
Style Tip: {extra}

Outfit 2: Denim Jacket + T-Shirt + Slim Fit Jeans

Outfit 3: Printed Shirt + Black Jeans + White Sneakers
"""


# ---------------- RECOMMEND ----------------
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

    # 🔥 ML
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

    # 🔥 GROQ CALL (NEW)
    try:
        response = requests.post(
            "http://127.0.0.1:8001/ai-recommend",
            json=data,
            timeout=5
        )
        suggestion = response.json().get("suggestion", "")
    except Exception as e:
        print("Groq error:", e)
        suggestion = fallback_suggestion(data)

    # 🔥 DB fetch
    facewash = crud.get_facewash_by_skin(db, skin_type)
    goggles = crud.get_goggles_by_face(db, face_shape)
    outfits = crud.get_outfit_by_tone(db, skin_tone)

    return {
        "analysis": data,
        "facewash": facewash,
        "goggles": goggles,
        "outfits": outfits,
        "recommendation": suggestion
    }