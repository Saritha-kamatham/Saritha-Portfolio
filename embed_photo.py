import base64
import os

input_image = r"C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\.user_uploaded\media__1785129060520.jpg"
output_js = r"C:\Users\Prasanth7799\.gemini\antigravity\scratch\saritha-portfolio\photo_b64.js"

with open(input_image, "rb") as img_file:
    b64_data = base64.b64encode(img_file.read()).decode("utf-8")

data_uri = f"data:image/jpeg;base64,{b64_data}"

js_content = f"document.addEventListener('DOMContentLoaded', function() {{\n    var img = document.getElementById('hero-profile-img');\n    if(img) img.src = \"{data_uri}\";\n}});\n"

os.makedirs(os.path.dirname(output_js), exist_ok=True)
with open(output_js, "w", encoding="utf-8") as js_file:
    js_file.write(js_content)

print("Successfully written photo_b64.js with base64 data URI.")
