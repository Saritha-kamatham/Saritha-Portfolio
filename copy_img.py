import base64

img_path = r"C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\saritha_portrait_1785076115001.jpg"
out_path = r"C:\Users\Prasanth7799\.gemini\antigravity\scratch\saritha-portfolio\b64_data.js"

with open(img_path, "rb") as image_file:
    b64_str = base64.b64encode(image_file.read()).decode('utf-8')

content = f'portrait_b64 = "data:image/jpeg;base64,{b64_str}"'

with open(out_path, "w", encoding="utf-8") as out_file:
    out_file.write(content)
