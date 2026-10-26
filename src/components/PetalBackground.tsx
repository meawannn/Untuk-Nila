import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'sakura' | 'heart';
  color: string;
  swingAngle: number;
  swingSpeed: number;
}

export const PetalBackground: React.FC<{ isDark?: boolean; enabled?: boolean }> = ({
  isDark = false,
  enabled = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Respects prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const lightColors = [
      'rgba(255, 182, 193, 0.75)',
      'rgba(255, 192, 203, 0.7)',
      'rgba(255, 218, 224, 0.8)',
      'rgba(255, 154, 162, 0.65)',
      'rgba(244, 143, 177, 0.7)',
    ];

    const darkColors = [
      'rgba(244, 114, 182, 0.6)',
      'rgba(251, 146, 60, 0.45)',
      'rgba(249, 168, 212, 0.5)',
      'rgba(225, 29, 72, 0.45)',
    ];

    const colors = isDark ? darkColors : lightColors;
    const petalCount = Math.min(Math.floor(width / 32), 38);
    const petals: Petal[] = [];

    const types: ('petal' | 'sakura' | 'heart')[] = ['petal', 'sakura', 'petal', 'sakura', 'heart'];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 9 + 8,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.5 + 0.4,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        swingAngle: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.03 + 0.015,
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'heart') {
        ctx.fillStyle = p.color;
        const s = p.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.2, s * 0.3, 0, s * 1.1);
        ctx.bezierCurveTo(s * 1.2, s * 0.3, s, -s * 0.6, 0, s * 0.3);
        ctx.fill();
      } else if (p.type === 'sakura') {
        ctx.fillStyle = p.color;
        const w = p.size * 0.6;
        const h = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -h / 2);
        ctx.bezierCurveTo(w, -h / 4, w, h / 3, 0, h / 2);
        ctx.bezierCurveTo(-w, h / 3, -w, -h / 4, 0, -h / 2);
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        const w = p.size * 0.7;
        const h = p.size;
        ctx.beginPath();
        ctx.ellipse(0, 0, w, h * 0.6, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swingAngle += p.swingSpeed;
        p.x += Math.sin(p.swingAngle) * 0.8 + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 20;
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, isDark]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
