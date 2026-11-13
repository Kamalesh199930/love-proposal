import React, { useEffect, useState } from 'react';

export default function FallingPetals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      size: Math.random() * 12 + 16, // 16 to 28px
      duration: Math.random() * 6 + 7 + 's', // 7 to 13s
      delay: Math.random() * 8 + 's',
      sway: Math.random() * 120 + 40 + 'px',
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.4 + 0.5,
    }));
    setPetals(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: '-40px',
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            opacity: p.opacity,
            animation: `fallingPetal ${p.duration} linear infinite`,
            animationDelay: p.delay,
            '--sway': p.sway,
          }}
        >
          {/* Detailed SVG Rose Petal */}
          <svg
            viewBox="0 0 30 40"
            className="w-full h-full filter drop-shadow-sm"
            style={{
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            <path
              d="M15,0 C25,5 30,18 26,30 C22,40 10,40 4,32 C-2,24 5,8 15,0 Z"
              fill="url(#petalGradient)"
            />
            <defs>
              <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff758c" />
                <stop offset="40%" stopColor="#ff4b72" />
                <stop offset="100%" stopColor="#c2185b" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes fallingPetal {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(50vh) translateX(var(--sway)) rotate(180deg);
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(105vh) translateX(calc(var(--sway) * -0.5)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
