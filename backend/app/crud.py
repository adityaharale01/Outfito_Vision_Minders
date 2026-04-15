from sqlalchemy.orm import Session
from app import models

# 🔥 CREATE PRODUCT
def create_product(db: Session, product):
    db_product = models.Product(**product)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


# 🧴 FACEWASH
def get_facewash_by_skin(db: Session, skin_type):
    return db.query(models.Product).filter(
        models.Product.category == "facewash",
        models.Product.skin_type == skin_type
    ).all()


# 🕶️ GOGGLES
def get_goggles_by_face(db: Session, face_shape):
    return db.query(models.Product).filter(
        models.Product.category == "goggles",
        models.Product.face_shape == face_shape
    ).all()


# 👕 OUTFIT
def get_outfit_by_tone(db: Session, skin_tone):
    shirts = db.query(models.Product).filter(
        models.Product.category == "shirt",
        models.Product.skin_tone == skin_tone
    ).all()

    outfits = []

    for shirt in shirts:
        pant = db.query(models.Product).filter(
            models.Product.category == "pant",
            models.Product.outfit_group == shirt.outfit_group
        ).first()

        if pant:
            outfits.append({
                "shirt": shirt,
                "pant": pant
            })

    return outfits