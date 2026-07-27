import base64
import os
import re

img_path = r"C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\.user_uploaded\media__1785129060520.jpg"
if not os.path.exists(img_path):
    img_path = r"C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\.user_uploaded\media__1785072639485.jpg"

html_path = r"C:\Users\Prasanth7799\.gemini\antigravity\scratch\saritha-portfolio\index.html"

with open(img_path, "rb") as f:
    b64_str = base64.b64encode(f.read()).decode("utf-8")

data_uri = f"data:image/jpeg;base64,{b64_str}"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

new_tag = f'<img src="{data_uri}" alt="Saritha Kamatham" class="profile-real-img" id="hero-profile-img">'

content = re.sub(r'<img [^>]*id="hero-profile-img"[^>]*>', new_tag, content)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("INJECTED PHOTO DIRECTLY INTO INDEX.HTML SUCCESSFULLY!")
