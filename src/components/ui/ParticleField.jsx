import React, { useRef, useEffect, useState, memo } from 'react';

const PARTICLE_COUNT = 60;
const CONNECTION_DISTANCE = 120;
const MOUSE_REPEL_DISTANCE = 100;
const PARTICLE_SPEED = 0.3;

const colors = [
  'rgba(0, 191, 255, 0.6)',   // cyan
  'rgba(255, 20, 147, 0.5)',  // pink
  'rgba(139, 92, 246, 0.5)',  // violet
  'rgba(99, 102, 241, 0.4)',  // indigo
];

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
    this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
    this.radius = Math.random() * 1.5 + 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.baseAlpha = Math.random() * 0.5 + 0.3;
  }

  update(canvasWidth, canvasHeight, mouseX, mouseY) {
    // Mouse repulsion
    if (mouseX !== null && mouseY !== null) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_REPEL_DISTANCE) {
        const force = (MOUSE_REPEL_DISTANCE - dist) / MOUSE_REPEL_DISTANCE;
        this.vx += (dx / dist) * force * 0.5;
        this.vy += (dy / dist) * force * 0.5;
      }
    }

    // Damping
    this.vx *= 0.99;
    this.vy *= 0.99;

    // Clamp speed
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > PARTICLE_SPEED * 3) {
      this.vx = (this.vx / speed) * PARTICLE_SPEED * 3;
      this.vy = (this.vy / speed) * PARTICLE_SPEED * 3;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export const ParticleField = memo(({ className = '' }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const animFrameRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable on mobile for performance
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    // Initialize particles
    particlesRef.current = Array.from(
      { length: PARTICLE_COUNT },
      () => new Particle(canvas.width, canvas.height)
    );

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const { x: mx, y: my } = mouseRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height, mx, my);
        particles[i].draw(ctx);

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto z-0 ${className}`}
      style={{ opacity: 0.7 }}
    />
  );
});
