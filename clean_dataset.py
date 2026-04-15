import os
from PIL import Image

dataset_path = "../face_shape_dataset"

bad_files = 0

for root, dirs, files in os.walk(dataset_path):
    for file in files:
        file_path = os.path.join(root, file)

        try:
            img = Image.open(file_path)
            img.verify()  # check corruption
        except:
            print(f"❌ Removing: {file_path}")
            os.remove(file_path)
            bad_files += 1

print(f"✅ Cleaning Done. Removed {bad_files} bad images.")