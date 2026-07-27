import base64
import os
import shutil

input_image = r"C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\.user_uploaded\media__1785129060520.jpg"
if not os.path.exists(input_image):
    input_image = r"C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\.user_uploaded\media__1785072639485.jpg"

output_dir = r"C:\Users\Prasanth7799\.gemini\antigravity\scratch\saritha-portfolio"
output_js = os.path.join(output_dir, "photo_b64.js")
images_dir = os.path.join(output_dir, "images")
os.makedirs(images_dir, exist_ok=True)

# Copy JPEG files directly
shutil.copy2(input_image, os.path.join(images_dir, "saritha_portrait.jpg"))
shutil.copy2(input_image, os.path.join(output_dir, "saritha_portrait.jpg"))

with open(input_image, "rb") as img_file:
    b64_data = base64.b64encode(img_file.read()).decode("utf-8")

data_uri = f"data:image/jpeg;base64,{b64_data}"

js_content = f"document.addEventListener('DOMContentLoaded', function() {{\n    var img = document.getElementById('hero-profile-img');\n    if(img) img.src = \"{data_uri}\";\n}});\n"

with open(output_js, "w", encoding="utf-8") as js_file:
    js_file.write(js_content)

print("SUCCESS: Image copied and photo_b64.js generated!")
