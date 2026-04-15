from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    brand: str
    price: str
    category: str
    skin_type: Optional[str] = None
    face_shape: Optional[str] = None
    image_url: str