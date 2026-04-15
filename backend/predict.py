import cv2
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import InputLayer

import os

# 🔥 Correct path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "face_shape_model.h5")

# 🔥 FIX: compile=False
model = load_model(
    model_path,
    compile=False,
    custom_objects={
        "InputLayer": InputLayer
    }
)

face_classes = ['diamond', 'heart', 'oval', 'round', 'square']


def predict_face_shape(image_path):
    image = cv2.imread(image_path)

    img = cv2.resize(image, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    pred = model.predict(img)
    face = face_classes[np.argmax(pred)]

    return face