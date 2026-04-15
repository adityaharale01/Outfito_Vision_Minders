from sqlalchemy import Column, Integer, String
from app.db import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    brand = Column(String)
    price = Column(String)

    category = Column(String)

    skin_type = Column(String)
    face_shape = Column(String)
    skin_tone = Column(String)

    outfit_group = Column(String)

    image_url = Column(String)