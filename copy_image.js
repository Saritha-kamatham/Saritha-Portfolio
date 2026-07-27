const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\Prasanth7799\\.gemini\\antigravity\\brain\\8a991687-5b70-4535-a826-78c76e59b21e\\.user_uploaded\\media__1785129060520.jpg";
const targetDir = "C:\\Users\\Prasanth7799\\.gemini\\antigravity\\scratch\\saritha-portfolio";
const imagesDir = path.join(targetDir, "images");

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 1. Copy image files
fs.copyFileSync(src, path.join(imagesDir, "saritha_portrait.jpg"));
fs.copyFileSync(src, path.join(targetDir, "saritha_portrait.jpg"));

// 2. Generate Base64 JS
const b64 = fs.readFileSync(src).toString('base64');
const dataUri = "data:image/jpeg;base64," + b64;
const jsContent = `document.addEventListener("DOMContentLoaded", function() {
  var img = document.getElementById("hero-profile-img");
  if (img) {
    img.src = "${dataUri}";
    img.style.display = "block";
  }
});`;

fs.writeFileSync(path.join(targetDir, "photo_b64.js"), jsContent);

// 3. Inject directly into index.html
const htmlPath = path.join(targetDir, "index.html");
let html = fs.readFileSync(htmlPath, 'utf-8');
const newImgTag = `<img src="${dataUri}" alt="Saritha Kamatham" class="profile-real-img" id="hero-profile-img">`;

html = html.replace(/<img [^>]*id="hero-profile-img"[^>]*>/, newImgTag);
fs.writeFileSync(htmlPath, html, 'utf-8');

console.log("=================================================");
console.log("SUCCESS! Saritha's portrait photo is fully embedded!");
console.log("Please refresh your browser (Ctrl + R or F5)");
console.log("=================================================");
