import os
import shutil

src_portrait = r'C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\saritha_portrait_1785076115001.jpg'
src_beach = r'C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\saritha_beach_1785076128364.jpg'

out_dir = r'C:\Users\Prasanth7799\.gemini\antigravity\scratch\saritha-portfolio\images'
os.makedirs(out_dir, exist_ok=True)

dst_portrait = os.path.join(out_dir, 'saritha_portrait.jpg')
dst_beach = os.path.join(out_dir, 'saritha_beach.jpg')

if os.path.exists(src_portrait):
    shutil.copy2(src_portrait, dst_portrait)
    print("Copied portrait successfully!")

if os.path.exists(src_beach):
    shutil.copy2(src_beach, dst_beach)
    print("Copied beach photo successfully!")
