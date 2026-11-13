import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

const NO_PHRASES = [
  "NO 🙈",
  "Over here! 😜",
  "Can't catch me! 🏃‍♀️💨",
  "Too slow! 🏃‍♂️",
  "Wrong button! 💖",
  "Try YES instead! 🥰",
  "Not an option! 💍",
  "Nice try! 🙈",
  "Still can't click me! ✨",
  "Haha, look at YES! 👉",
  "Think again! 💕",
  "I have wings! 🕊️",
];

export default function ProposalPage({ onAccept }) {
  // noPos: { x: number, y: number } in pixels (fixed viewport coordinates)
  const [noPos, setNoPos] = useState(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [escapeCount, setEscapeCount] = useState(0);
  const [poofs, setPoofs] = useState([]);
  const [yesClicks, setYesClicks] = useState([]);
  const noBtnRef = useRef(null);
  const waypointsIndexRef = useRef(0);

  // Diverse waypoints across the full webpage (percentages of viewport)
  const WAYPOINTS = [
    { xPct: 0.12, yPct: 0.15 }, // Top-Left
    { xPct: 0.82, yPct: 0.20 }, // Top-Right
    { xPct: 0.15, yPct: 0.82 }, // Bottom-Left
    { xPct: 0.80, yPct: 0.82 }, // Bottom-Right
    { xPct: 0.08, yPct: 0.48 }, // Middle-Left
    { xPct: 0.86, yPct: 0.48 }, // Middle-Right
    { xPct: 0.48, yPct: 0.10 }, // Top-Center
    { xPct: 0.50, yPct: 0.88 }, // Bottom-Center
  ];

  // Function to move NO button to next spot across the full screen
  const travelToNextSpot = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();

    romanticAudio.playPop();

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const btnWidth = noBtnRef.current?.offsetWidth || 150;
    const btnHeight = noBtnRef.current?.offsetHeight || 55;
    const pad = 24;

    // Record puff animation at old location
    if (noBtnRef.current) {
      const rect = noBtnRef.current.getBoundingClientRect();
      const oldX = rect.left + rect.width / 2;
      const oldY = rect.top + rect.height / 2;
      setPoofs((prev) => [
        ...prev.slice(-6),
        { id: Date.now() + Math.random(), x: oldX, y: oldY },
      ]);
    }

    // Pick next waypoint in rotation with slight random jitter for natural playfulness
    waypointsIndexRef.current = (waypointsIndexRef.current + 1) % WAYPOINTS.length;
    const wp = WAYPOINTS[waypointsIndexRef.current];

    // Calculate clamped coordinates
    const targetX = Math.round(wp.xPct * vw - btnWidth / 2);
    const targetY = Math.round(wp.yPct * vh - btnHeight / 2);

    const safeX = Math.max(pad, Math.min(vw - btnWidth - pad, targetX));
    const safeY = Math.max(pad, Math.min(vh - btnHeight - pad, targetY));

    setNoPos({ x: safeX, y: safeY });
    setPhraseIndex((prev) => (prev + 1) % NO_PHRASES.length);
    setEscapeCount((prev) => prev + 1);
  }, []);

  // Global cursor proximity detector: when cursor comes within 100px of NO button, glide away!
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!noBtnRef.current) return;
      const rect = noBtnRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      // If cursor is within 95px on desktop, escape immediately
      if (dist < 95) {
        travelToNextSpot(e);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [travelToNextSpot]);

  const handleYesClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const hearts = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 80,
      y: y + (Math.random() - 0.5) * 80,
    }));
    setYesClicks(hearts);

    romanticAudio.playCelebrationSound();

    setTimeout(() => {
      onAccept();
    }, 450);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 z-10 selection:bg-rose-200">
      {/* Click Hearts Burst */}
      {yesClicks.map((h) => (
        <span
          key={h.id}
          className="fixed pointer-events-none text-2xl z-50 animate-ping"
          style={{ left: h.x, top: h.y }}
        >
          💖
        </span>
      ))}

      {/* Traveling Puffs / Dust Clouds behind the NO button */}
      {poofs.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0.9, scale: 0.7 }}
          animate={{ opacity: 0, scale: 1.4, y: -20 }}
          transition={{ duration: 0.7 }}
          className="fixed pointer-events-none text-xl z-40 select-none"
          style={{ left: p.x - 12, top: p.y - 12 }}
        >
          💨
        </motion.span>
      ))}

      {/* Main Proposal Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-xl w-full romantic-glass rounded-3xl p-6 sm:p-9 text-center shadow-2xl border border-rose-200/80 backdrop-blur-xl overflow-hidden"
      >
        {/* Soft Background Radial Glow inside Card */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-rose-400/25 rounded-full blur-3xl pointer-events-none" />

        {/* Romantic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 border border-rose-300/70 text-rose-700 text-xs sm:text-sm font-medium tracking-wide shadow-sm mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>A Special Question Just For You</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </motion.div>

        {/* Romantic Couple Photo with Glowing Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 mb-5 group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-400 via-pink-400 to-rose-300 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          <div className="relative w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-rose-300 via-white to-pink-300 shadow-xl overflow-hidden">
            <img
              src="/couple.jpg"
              alt="Romantic Couple"
              className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
          </div>

          {/* Floating Ring Badge */}
          <div className="absolute -bottom-1 right-2 sm:right-3 bg-white/95 p-2 rounded-full shadow-lg border border-rose-200 animate-bounce">
            <span className="text-2xl sm:text-3xl select-none" role="img" aria-label="diamond ring">💍</span>
          </div>
        </motion.div>

        {/* Personal Pre-Proposal Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-handwriting text-2xl sm:text-3xl text-rose-600 font-semibold mb-1"
        >
          Dearest Jeevitha,
        </motion.p>

        {/* Prominent Question */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 tracking-tight leading-tight mb-3 drop-shadow-sm glow-text-pink"
        >
          Will You Marry Me? 💍❤️
        </motion.h1>

        {/* Tender romantic description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-700 text-xs sm:text-base font-normal max-w-md mx-auto mb-6 leading-relaxed"
        >
          You bring warmth, laughter, and endless sunshine into my universe. 
          Will you hold my hand, share your smiles, and make this journey forever?
        </motion.p>

        {/* Buttons Section */}
        <div className="relative flex items-center justify-center gap-5 sm:gap-8 min-h-[70px]">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleYesClick}
            className="relative group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-white text-base sm:text-xl shadow-[0_0_30px_rgba(244,63,94,0.55)] bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 transition-all duration-300 ring-4 ring-pink-200/70 overflow-hidden cursor-pointer flex items-center gap-2.5 z-20"
          >
            {/* Shimmer Effect */}
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent transform -skew-x-12 group-hover:translate-x-[250%] transition-transform duration-1000 pointer-events-none" />
            <Heart className="w-5 h-5 fill-white text-white animate-heartbeat" />
            <span className="tracking-wide drop-shadow">YES ❤️</span>
          </motion.button>

          {/* NO Button Anchor / Initial Container */}
          <div className="relative inline-block">
            <button
              ref={noBtnRef}
              onMouseEnter={travelToNextSpot}
              onMouseMove={travelToNextSpot}
              onTouchStart={travelToNextSpot}
              onTouchMove={travelToNextSpot}
              onPointerDown={travelToNextSpot}
              onClick={travelToNextSpot}
              tabIndex={-1}
              style={
                noPos
                  ? {
                      position: 'fixed',
                      left: `${noPos.x}px`,
                      top: `${noPos.y}px`,
                      zIndex: 9999,
                      transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }
                  : {
                      position: 'relative',
                    }
              }
              className={`px-6 py-3.5 sm:py-4 rounded-full font-bold text-rose-700 bg-white/95 border-2 border-rose-400 shadow-xl backdrop-blur-md text-sm sm:text-lg select-none cursor-pointer whitespace-nowrap active:scale-90 transition-transform ${
                noPos
                  ? 'animate-bounce shadow-[0_0_25px_rgba(244,63,94,0.45)] ring-4 ring-rose-200'
                  : 'hover:scale-95'
              }`}
            >
              <span>{NO_PHRASES[phraseIndex]}</span>
            </button>
          </div>
        </div>

        {/* Playful hint banner after dodging */}
        {escapeCount > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-xs text-rose-600 font-semibold bg-rose-50/80 border border-rose-200/70 rounded-full px-4 py-1.5 inline-block shadow-sm"
          >
            <span>🏃‍♀️ The NO button is running all around the screen! Catch it if you can... or just say YES! 🥰</span>
          </motion.div>
        )}
      </motion.div>

      {/* Romantic bottom quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-rose-800/80 font-handwriting text-xl sm:text-2xl text-center"
      >
        "I have found the one whom my soul loves." 🌸
      </motion.p>
    </div>
  );
}
