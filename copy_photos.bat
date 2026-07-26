@echo off
echo Copying photos directly into portfolio images folder...
if not exist "images" mkdir "images"
copy /Y "C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\saritha_portrait_1785076115001.jpg" "images\saritha_portrait.jpg"
copy /Y "C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\saritha_beach_1785076128364.jpg" "images\saritha_beach.jpg"
copy /Y "C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\saritha_portrait_1785076115001.jpg" "saritha_portrait.jpg"
copy /Y "C:\Users\Prasanth7799\.gemini\antigravity\brain\8a991687-5b70-4535-a826-78c76e59b21e\saritha_beach_1785076128364.jpg" "saritha_beach.jpg"
echo Done! Photos copied successfully into portfolio.
pause
