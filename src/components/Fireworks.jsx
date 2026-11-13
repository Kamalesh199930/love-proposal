import React, { useEffect, useRef } from 'react';

export default function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const colors = ['#ff4d8d', '#ff758c', '#ffd700', '#ff9a9e', '#fecfef', '#ffffff', '#ff1493', '#e056fd'];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.gravity = 0.08;
        this.size = Math.random() * 3 + 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.alpha -= this.decay;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const createExplosion = (x, y) => {
      const count = 55 + Math.floor(Math.random() * 35);
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const particleColor = Math.random() > 0.3 ? color : colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, particleColor));
      }
    };

    let frameCount = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Periodically trigger a new firework burst
      frameCount++;
      if (frameCount % 40 === 0) {
        const x = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
        const y = Math.random() * (canvas.height * 0.5) + canvas.height * 0.1;
        createExplosion(x, y);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(loop);
    };

    // Initial bursts
    createExplosion(canvas.width * 0.3, canvas.height * 0.3);
    createExplosion(canvas.width * 0.7, canvas.height * 0.25);
    createExplosion(canvas.width * 0.5, canvas.height * 0.35);

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
    />
  );
}
