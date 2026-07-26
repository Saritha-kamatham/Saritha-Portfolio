import base64
import os

out_dir = r'C:\Users\Prasanth7799\.gemini\antigravity\scratch\saritha-portfolio'
os.makedirs(out_dir, exist_ok=True)

def img_to_b64_uri(filepath, out_filepath):
    try:
        with open(filepath, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        uri = "data:image/jpeg;base64," + encoded_string
        with open(out_filepath, 'w') as f:
            f.write(uri)
        print(f"Success for {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

img_to_b64_uri(r'C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\saritha_portrait_1785076115001.jpg', os.path.join(out_dir, 'b64_portrait.txt'))
img_to_b64_uri(r'C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\saritha_beach_1785076128364.jpg', os.path.join(out_dir, 'b64_beach.txt'))
