import os
import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.utils import Sequence

IMG_SIZE = 224
BATCH_SIZE = 32

# Label mapping
def get_label(file):
    try:
        race = int(file.split("_")[2])

        if race == 0:
            return 0  # fair
        elif race == 1:
            return 2  # dark
        else:
            return 1  # medium
    except:
        return None


# Generator class
class DataGenerator(Sequence):
    def __init__(self, folder, batch_size):
        self.folder = folder
        self.batch_size = batch_size
        self.files = os.listdir(folder)

    def __len__(self):
        return len(self.files) // self.batch_size

    def __getitem__(self, idx):
        batch_files = self.files[idx * self.batch_size:(idx + 1) * self.batch_size]

        images = []
        labels = []

        for file in batch_files:
            path = os.path.join(self.folder, file)

            try:
                img = cv2.imread(path)
                img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
                img = img / 255.0

                label = get_label(file)
                if label is None:
                    continue

                images.append(img)
                labels.append(label)

            except:
                continue

        return np.array(images), tf.keras.utils.to_categorical(labels, 3)


# Create generator
train_gen = DataGenerator('../utkface', BATCH_SIZE)

# Model
model = models.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(224,224,3)),
    layers.MaxPooling2D(),

    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D(),

    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(3, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train
model.fit(train_gen, epochs=10)

# Save
model.save('../models/skin_tone_model.h5')

print("✅ Skin Tone Model Trained")