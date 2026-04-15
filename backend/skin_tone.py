import cv2
import numpy as np

def extract_skin_region(image):
    h, w, _ = image.shape

    x1 = int(w * 0.3)
    x2 = int(w * 0.7)
    y1 = int(h * 0.2)
    y2 = int(h * 0.5)

    crop = image[y1:y2, x1:x2]
    return crop


def get_average_color(image):
    avg_color = np.mean(image, axis=(0, 1))
    return avg_color


def classify_skin_tone(avg_color):
    brightness = np.mean(avg_color)

    if brightness > 170:
        return "fair"
    elif brightness > 120:
        return "medium"
    else:
        return "dark"


# 🔥 MAIN FUNCTION (THIS MUST MATCH IMPORT)
def predict_skin_tone(image_path):
    try:
        image = cv2.imread(image_path)   # ✅ FIX ADDED

        skin_region = extract_skin_region(image)
        avg_color = get_average_color(skin_region)
        tone = classify_skin_tone(avg_color)

        return tone
    except Exception as e:
        print("Skin tone error:", e)
        return "medium"