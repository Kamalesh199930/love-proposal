import React, { useEffect, useState } from 'react';

const HEART_ICONS = ['❤️', '💖', '💕', '💗', '💓', '✨', '🌸', '🌹'];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate initial hearts with random positions, delays and sizes
    const initialHearts = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      icon: HEART_ICONS[i % HEART_ICONS.length],
      left: Math.random() * 96 + '%',
      size: Math.random() * 18 + 14 + 'px',
      duration: Math.random() * 8 + 8 + 's',
      delay: Math.random() * 10 + 's',
      drift: (Math.random() - 0.5) * 60 + 'px',
      opacity: Math.random() * 0.45 + 0.35,
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute select-none filter drop-shadow-md"
          style={{
            left: h.left,
            bottom: '-40px',
            fontSize: h.size,
            opacity: h.opacity,
            animation: `floatUp ${h.duration} ease-in-out infinite`,
            animationDelay: h.delay,
            '--drift': h.drift,
          }}
        >
          {h.icon}
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(-50vh) translateX(var(--drift)) scale(1.1) rotate(15deg);
          }
          85% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) translateX(calc(var(--drift) * -1)) scale(0.9) rotate(-15deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
