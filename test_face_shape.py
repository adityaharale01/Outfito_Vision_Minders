import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Load model
model = load_model("models/face_shape_model.h5")

# Class labels (IMPORTANT: match your dataset order)
class_names = ['diamond', 'heart', 'oval', 'round', 'square']

# Load test image
img = cv2.imread("image.png")  # 👈 put your image here
img = cv2.resize(img, (224, 224))
img = img / 255.0
img = np.expand_dims(img, axis=0)

# Prediction
pred = model.predict(img)
pred_class = np.argmax(pred)

print("Predicted Face Shape:", class_names[pred_class])