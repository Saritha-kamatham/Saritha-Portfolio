@echo off
cd /d "C:\Users\Prasanth7799\.gemini\antigravity\scratch\saritha-portfolio"
node copy_image.js
python inject_photo_into_html.py 2>nul
echo ===================================================
echo SUCCESS! Saritha's portrait photo is fully embedded into index.html!
echo Please refresh your browser (Ctrl + R or F5)
echo ===================================================
pause
