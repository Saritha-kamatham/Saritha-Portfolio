/* ==========================================================================
   SARITHA KAMATHAM - THREE.JS 3D CYBER ENGINE (three-scene.js)
   Renders a continuous, interactive 3D WebGL Cyber Particle Wave,
   Ambient Starfield, & Minimalist AI Octahedron Core that remains
   vibrant and active across ALL page scroll positions.
   ========================================================================== */

class SleekThreeScene {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas || typeof THREE === 'undefined') return;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;
    this.targetScrollY = 0;
    this.count = 0;

    this.init();
    this.create3DWaveGrid();
    this.createMinimalCrystal();
    this.createAmbientStarfield();
    this.bindEvents();
    this.animate();
  }

  init() {
    // 1. Scene setup with soft dark background fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030712, 0.0006);

    // 2. Camera Setup
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );
    this.camera.position.set(0, 80, 480);
    this.camera.lookAt(0, -20, 0);

    // 3. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  create3DWaveGrid() {
    // Grid dimensions - wide and deep
    this.gridWidth = 75;
    this.gridHeight = 55;
    this.numParticles = this.gridWidth * this.gridHeight;

    const positions = new Float32Array(this.numParticles * 3);
    const scales = new Float32Array(this.numParticles);
    const colors = new Float32Array(this.numParticles * 3);

    const cyanColor = new THREE.Color(0x00f2fe);
    const purpleColor = new THREE.Color(0xa855f7);

    let i = 0, j = 0;
    for (let ix = 0; ix < this.gridWidth; ix++) {
      for (let iy = 0; iy < this.gridHeight; iy++) {
        // Grid spacing
        positions[i] = (ix * 24) - ((this.gridWidth * 24) / 2); // X
        positions[i + 1] = -100; // Y base level
        positions[i + 2] = (iy * 22) - ((this.gridHeight * 22) / 2) - 50; // Z

        scales[j] = 1;

        // Color gradient across grid
        const ratio = ix / this.gridWidth;
        const color = cyanColor.clone().lerp(purpleColor, ratio);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;

        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Soft Particle Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(0, 242, 254, 0.8)');
    grad.addColorStop(0.7, 'rgba(168, 85, 247, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.waveMesh = new THREE.Points(geometry, material);
    this.scene.add(this.waveMesh);
  }

  createMinimalCrystal() {
    this.crystalGroup = new THREE.Group();

    // Minimalist 3D Octahedron AI Core
    const octaGeom = new THREE.OctahedronGeometry(60, 0);
    
    // Outer glowing wireframe
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    this.octaWire = new THREE.Mesh(octaGeom, wireMat);
    this.crystalGroup.add(this.octaWire);

    // Inner translucent core
    const innerGeom = new THREE.OctahedronGeometry(40, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.2,
      wireframe: false
    });
    this.octaInner = new THREE.Mesh(innerGeom, innerMat);
    this.crystalGroup.add(this.octaInner);

    // Orbiting light ring
    const ringGeom = new THREE.TorusGeometry(80, 1, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.4
    });
    this.orbitRing = new THREE.Mesh(ringGeom, ringMat);
    this.orbitRing.rotation.x = Math.PI / 3;
    this.crystalGroup.add(this.orbitRing);

    // Position subtly background right
    this.crystalGroup.position.set(220, 30, -100);
    this.scene.add(this.crystalGroup);
  }

  createAmbientStarfield() {
    const starCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1400;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2.2,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.15;
      this.mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.15;
    });

    window.addEventListener('scroll', () => {
      this.targetScrollY = window.scrollY;
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Smooth Mouse & Scroll Dampening
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.05;

    // Anchor camera safely so particles never turn blank on scroll!
    this.camera.position.x = this.mouse.x * 0.5;
    this.camera.position.y = 80 - (this.mouse.y * 0.3);
    this.camera.lookAt(0, -20, 0);

    // Rotate scene elements continuously based on scroll momentum
    const scrollFactor = this.scrollY * 0.0005;

    // 1. Animate 3D Wave Grid Vertices
    const positions = this.waveMesh.geometry.attributes.position.array;
    let i = 0;
    for (let ix = 0; ix < this.gridWidth; ix++) {
      for (let iy = 0; iy < this.gridHeight; iy++) {
        // Sine wave elevation math
        positions[i + 1] = -100 + 
          (Math.sin((ix + this.count + scrollFactor * 10) * 0.22) * 18) + 
          (Math.sin((iy + this.count + scrollFactor * 10) * 0.28) * 18);

        i += 3;
      }
    }
    this.waveMesh.geometry.attributes.position.needsUpdate = true;
    this.count += 0.025;

    // 2. Animate Minimal AI Crystal
    if (this.crystalGroup) {
      this.octaWire.rotation.y += 0.005;
      this.octaWire.rotation.x += 0.003;
      this.octaInner.rotation.y -= 0.006;
      this.orbitRing.rotation.z += 0.008;

      // Smooth subtle response to scroll
      this.crystalGroup.position.y = 30 + Math.sin(this.count * 0.8) * 14 + (Math.sin(scrollFactor) * 20);
    }

    // 3. Rotate Starfield
    if (this.starfield) {
      this.starfield.rotation.y = this.count * 0.02 + scrollFactor * 0.5;
      this.starfield.rotation.x = scrollFactor * 0.2;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.threeScene = new SleekThreeScene();
});
