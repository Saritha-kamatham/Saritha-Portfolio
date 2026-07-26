/* ==========================================================================
   NEURAL NETWORK BACKGROUND PARTICLES (particles.js)
   Renders a lightweight, high-performance interactive starry particle net.
   ========================================================================== */

class NeuralParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    
    // Performance optimized configuration
    this.config = {
      particleCount: 75,
      connectionDistance: 110,
      particleSpeed: 0.35,
      baseRadius: 1.5,
      glowColor: 'rgba(0, 242, 254, 0.08)',
      lineColor: 'rgba(168, 85, 247, 0.04)',
      dotColor: 'rgba(255, 255, 255, 0.18)'
    };
    
    this.init();
  }
  
  init() {
    this.resizeCanvas();
    this.createParticles();
    this.setupListeners();
    this.animate();
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Adjust density based on screen resolution
    if (window.innerWidth < 768) {
      this.config.particleCount = 35;
      this.config.connectionDistance = 85;
    } else {
      this.config.particleCount = 75;
      this.config.connectionDistance = 110;
    }
  }
  
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      const radius = Math.random() * 1.5 + this.config.baseRadius;
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.particleSpeed,
        vy: (Math.random() - 0.5) * this.config.particleSpeed,
        radius: radius,
        originalRadius: radius
      });
    }
  }
  
  setupListeners() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createParticles();
    });
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 1. Move and draw particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      // Screen edge bounce
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      
      // Mouse interaction (gravity effect)
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
          p.radius = p.originalRadius * (1 + force * 1.5);
        } else {
          if (p.radius > p.originalRadius) {
            p.radius -= 0.05;
          }
        }
      } else {
        if (p.radius > p.originalRadius) {
          p.radius -= 0.05;
        }
      }
      
      // Render dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.config.dotColor;
      this.ctx.fill();
    });
    
    // 2. Connect particles with neural lines
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.config.connectionDistance) {
          const opacity = (1 - (dist / this.config.connectionDistance)) * 0.12;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          
          // Color based on active gradients
          this.ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialise on load
document.addEventListener('DOMContentLoaded', () => {
  new NeuralParticles('particles-canvas');
});
