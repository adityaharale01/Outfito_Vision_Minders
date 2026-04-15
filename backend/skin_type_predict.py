import cv2
import numpy as np
from tensorflow.keras.models import load_model

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = load_model(os.path.join(BASE_DIR, "skin_type_model.h5"), compile=False)

classes = ["dry", "normal", "oily"]

def predict_skin_type(image):
    img = cv2.resize(image, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    pred = model.predict(img)
    return classes[np.argmax(pred)]