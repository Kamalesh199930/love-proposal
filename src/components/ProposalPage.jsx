import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

const NO_PHRASES = [
  "NO 🙈",
  "Catch me! 😜",
  "Too slow! 🏃‍♀️",
  "Over here! ✨",
  "Nope! 💍",
  "Try YES instead! 🥰",
  "Can't click me! 💨",
  "Still too slow! 🏃‍♂️",
  "Wrong choice! 💕",
  "Haha, look at YES! 👉",
  "Almost had me! 🙈",
  "Nice try, Meganya! ❤️",
];

export default function ProposalPage({ onAccept }) {
  // Coordinates are relative to VIEWPORT
  const [noPos, setNoPos] = useState(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [escapeCount, setEscapeCount] = useState(0);
  const [poofs, setPoofs] = useState([]);
  const [yesClicks, setYesClicks] = useState([]);
  const noBtnRef = useRef(null);
  const inlineAnchorRef = useRef(null);
  const currentIndexRef = useRef(-1);

  // Distinct full-screen waypoints across the visible viewport
  const WAYPOINTS = [
    { xPct: 0.12, yPct: 0.18 }, // Top-Left
    { xPct: 0.82, yPct: 0.22 }, // Top-Right
    { xPct: 0.15, yPct: 0.78 }, // Bottom-Left
    { xPct: 0.80, yPct: 0.76 }, // Bottom-Right
    { xPct: 0.10, yPct: 0.48 }, // Middle-Left
    { xPct: 0.84, yPct: 0.48 }, // Middle-Right
    { xPct: 0.50, yPct: 0.12 }, // Top-Center
    { xPct: 0.50, yPct: 0.86 }, // Bottom-Center
  ];

  // Function to move NO button dynamically across the full screen
  const travelToNextSpot = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();

    romanticAudio.playPop();

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const btnWidth = noBtnRef.current?.offsetWidth || 135;
    const btnHeight = noBtnRef.current?.offsetHeight || 46;
    const pad = 24;

    // Record puff animation at current location before flying
    if (noBtnRef.current) {
      const rect = noBtnRef.current.getBoundingClientRect();
      const oldX = rect.left + rect.width / 2;
      const oldY = rect.top + rect.height / 2;
      setPoofs((prev) => [
        ...prev.slice(-5),
        { id: Date.now() + Math.random(), x: oldX, y: oldY },
      ]);
    }

    // Pick a new random waypoint that is DIFFERENT from current position
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * WAYPOINTS.length);
    } while (nextIdx === currentIndexRef.current);
    currentIndexRef.current = nextIdx;

    const wp = WAYPOINTS[nextIdx];

    // Compute safe screen coordinates
    const targetX = Math.round(wp.xPct * vw - btnWidth / 2);
    const targetY = Math.round(wp.yPct * vh - btnHeight / 2);

    const safeX = Math.max(pad, Math.min(vw - btnWidth - pad, targetX));
    const safeY = Math.max(pad, Math.min(vh - btnHeight - pad, targetY));

    setNoPos({ x: safeX, y: safeY });
    setPhraseIndex((prev) => (prev + 1) % NO_PHRASES.length);
    setEscapeCount((prev) => prev + 1);
  }, []);

  const handleYesClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const hearts = Array.from({ length: 18 }).map((_, i) => ({
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
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-4 py-3 sm:py-6 z-10 selection:bg-rose-200">
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
          initial={{ opacity: 0.9, scale: 0.6 }}
          animate={{ opacity: 0, scale: 1.4, y: -18 }}
          transition={{ duration: 0.6 }}
          className="fixed pointer-events-none text-xl z-40 select-none"
          style={{ left: p.x - 12, top: p.y - 12 }}
        >
          ✨
        </motion.span>
      ))}

      {/* ACTIVE FLOATING NO BUTTON (RENDERED OUTSIDE TRANSFORMED CONTAINER SO FIXED POS IS 100% ACCURATE) */}
      {noPos && (
        <button
          id="no-button"
          ref={noBtnRef}
          onMouseEnter={travelToNextSpot}
          onMouseMove={travelToNextSpot}
          onTouchStart={travelToNextSpot}
          onTouchMove={travelToNextSpot}
          onPointerDown={travelToNextSpot}
          onClick={travelToNextSpot}
          tabIndex={-1}
          style={{
            position: 'fixed',
            left: `${noPos.x}px`,
            top: `${noPos.y}px`,
            zIndex: 99999,
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full font-bold text-rose-700 bg-white/95 border-2 border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.45)] ring-4 ring-rose-200 backdrop-blur-md text-sm sm:text-base select-none cursor-pointer inline-flex flex-row items-center justify-center gap-1.5 whitespace-nowrap leading-none shrink-0 animate-bounce"
        >
          <span className="leading-none">{NO_PHRASES[phraseIndex]}</span>
        </button>
      )}

      {/* Main Proposal Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-lg w-full romantic-glass rounded-3xl p-5 sm:p-8 text-center shadow-2xl border border-rose-200/90 backdrop-blur-xl overflow-hidden"
      >
        {/* Soft Background Radial Glow inside Card */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-rose-400/25 rounded-full blur-3xl pointer-events-none" />

        {/* Romantic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 border border-rose-300/70 text-rose-700 text-xs sm:text-sm font-medium tracking-wide shadow-sm mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>A Special Question Just For You</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </motion.div>

        {/* Romantic Couple Photo with Glowing Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="relative mx-auto w-32 h-32 sm:w-44 sm:h-44 mb-3 sm:mb-4 group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-400 via-pink-400 to-rose-300 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-rose-300 via-white to-pink-300 shadow-xl overflow-hidden">
            <img
              src="./couple.jpg"
              alt="Romantic Couple"
              className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
          </div>

          {/* Luxury Diamond Ring Badge */}
          <div className="absolute -bottom-1 right-1 sm:right-2 bg-white/95 p-1.5 sm:p-2 rounded-full shadow-lg border border-rose-200 animate-bounce">
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 fill-none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="14" r="7" stroke="url(#ringGrad)" strokeWidth="2.2" />
              <path d="M12 2L8.5 6h7L12 2z" fill="#67e8f9" stroke="#0891b2" strokeWidth="1.2" />
              <path d="M8.5 6L12 9l3.5-3" stroke="#0891b2" strokeWidth="1" />
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Personal Pre-Proposal Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="font-handwriting text-2xl sm:text-3xl text-rose-600 font-semibold mb-0.5"
        >
          Dearest Meganya,
        </motion.p>

        {/* Prominent Question - Clean Elegant Typography without Clunky Raw Emojis */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mb-2 sm:mb-3"
        >
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 tracking-tight leading-tight drop-shadow-sm glow-text-pink">
            Will You Marry Me?
          </h1>

          {/* Elegant Luxury Divider with Sparkling Hearts */}
          <div className="flex items-center justify-center gap-3 mt-2 sm:mt-2.5">
            <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-rose-300"></span>
            
            <div className="flex items-center gap-1.5 text-rose-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-rose-500 fill-rose-500 animate-heartbeat">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </div>

            <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-rose-300"></span>
          </div>
        </motion.div>

        {/* Tender romantic description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-gray-700 text-xs sm:text-sm md:text-base font-normal max-w-sm sm:max-w-md mx-auto mb-4 sm:mb-6 leading-relaxed"
        >
          You bring warmth, laughter, and endless sunshine into my universe. 
          Will you hold my hand, share your smiles, and make this journey forever?
        </motion.p>

        {/* Buttons Section - Single Straight Horizontal Row */}
        <div className="relative flex items-center justify-center gap-4 sm:gap-6 min-h-[54px] sm:min-h-[62px]">
          {/* YES Button - Strictly Straight Horizontal Line */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
            className="relative group px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-white text-base sm:text-lg shadow-[0_0_25px_rgba(244,63,94,0.55)] bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 transition-all duration-300 ring-4 ring-pink-200/70 overflow-hidden cursor-pointer inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap leading-none shrink-0 z-20"
          >
            {/* Shimmer Effect */}
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent transform -skew-x-12 group-hover:translate-x-[250%] transition-transform duration-1000 pointer-events-none" />
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white text-white animate-heartbeat shrink-0">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="tracking-wider drop-shadow font-extrabold leading-none">YES</span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white text-white animate-heartbeat shrink-0">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.button>

          {/* INITIAL INLINE NO BUTTON (when not yet hovered) */}
          {!noPos && (
            <div className="relative inline-flex items-center shrink-0">
              <button
                id="no-button"
                ref={inlineAnchorRef}
                onMouseEnter={travelToNextSpot}
                onMouseMove={travelToNextSpot}
                onTouchStart={travelToNextSpot}
                onTouchMove={travelToNextSpot}
                onPointerDown={travelToNextSpot}
                onClick={travelToNextSpot}
                tabIndex={-1}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-bold text-rose-700 bg-white/95 border-2 border-rose-400 shadow-xl backdrop-blur-md text-sm sm:text-base select-none cursor-pointer inline-flex flex-row items-center justify-center gap-1.5 whitespace-nowrap leading-none shrink-0 hover:scale-95 transition-transform"
              >
                <span className="leading-none">{NO_PHRASES[phraseIndex]}</span>
              </button>
            </div>
          )}
        </div>

        {/* Playful hint banner after dodging */}
        {escapeCount > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-rose-600 font-semibold bg-rose-50/80 border border-rose-200/70 rounded-full px-3 py-1 inline-block shadow-sm"
          >
            <span>🏃‍♀️ The NO button is running all around! Say YES! 🥰</span>
          </motion.div>
        )}
      </motion.div>

      {/* Romantic bottom quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.7 }}
        className="mt-3 sm:mt-5 text-rose-800/80 font-handwriting text-lg sm:text-xl text-center"
      >
        "I have found the one whom my soul loves." 🌸
      </motion.p>
    </div>
  );
}
