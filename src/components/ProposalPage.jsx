import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

const NO_PHRASES = [
  "NO 🙈",
  "Are you sure? 🥺",
  "Think again! 💕",
  "Can't catch me! 😜",
  "Wrong button! 💖",
  "Try YES instead! 🥰",
  "Not an option! 💍",
  "Nice try! 🏃‍♀️",
  "You know you want to! ❤️",
  "Look at the other button! 👈",
];

export default function ProposalPage({ onAccept }) {
  const [noPosition, setNoPosition] = useState(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [escapeCount, setEscapeCount] = useState(0);
  const [yesClicks, setYesClicks] = useState([]);
  const noBtnRef = useRef(null);

  // Dodging handler for NO button
  const handleNoDodge = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();

    romanticAudio.playPop();

    const padding = 30;
    const btnWidth = noBtnRef.current?.offsetWidth || 140;
    const btnHeight = noBtnRef.current?.offsetHeight || 55;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const maxX = Math.max(padding, vw - btnWidth - padding);
    const maxY = Math.max(padding, vh - btnHeight - padding);

    // Pick new coordinates that are well separated from current position
    let newX = Math.max(padding, Math.floor(Math.random() * maxX));
    let newY = Math.max(padding, Math.floor(Math.random() * maxY));

    // Avoid middle area where the YES button is to prevent overlapping YES
    const midX = vw / 2;
    const midY = vh / 2;
    if (Math.abs(newX - midX) < 100 && Math.abs(newY - midY) < 60) {
      newX = newX > midX ? Math.min(newX + 120, maxX) : Math.max(newX - 120, padding);
      newY = newY > midY ? Math.min(newY + 100, maxY) : Math.max(newY - 100, padding);
    }

    setNoPosition({ x: newX, y: newY });
    setPhraseIndex((prev) => (prev + 1) % NO_PHRASES.length);
    setEscapeCount((prev) => prev + 1);
  };

  const handleYesClick = (e) => {
    // Generate burst of mini floating hearts at click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const hearts = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 60,
    }));
    setYesClicks(hearts);

    romanticAudio.playCelebrationSound();

    setTimeout(() => {
      onAccept();
    }, 450);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 z-10 selection:bg-rose-200">
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

      {/* Main Proposal Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-xl w-full romantic-glass rounded-3xl p-6 sm:p-10 text-center shadow-2xl border border-rose-200/80 backdrop-blur-xl overflow-hidden"
      >
        {/* Soft Background Radial Glow inside Card */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-rose-400/25 rounded-full blur-3xl pointer-events-none" />

        {/* Romantic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 border border-rose-300/70 text-rose-700 text-xs sm:text-sm font-medium tracking-wide shadow-sm mb-5"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>A Special Question Just For You</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </motion.div>

        {/* Romantic Couple Photo with Glowing Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 mb-6 group"
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
          <div className="absolute -bottom-1 right-2 sm:right-4 bg-white/95 p-2 rounded-full shadow-lg border border-rose-200 animate-bounce">
            <span className="text-2xl sm:text-3xl select-none" role="img" aria-label="diamond ring">💍</span>
          </div>
        </motion.div>

        {/* Personal Pre-Proposal Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-handwriting text-2xl sm:text-3xl text-rose-600 font-semibold mb-2"
        >
          Dearest Jeevitha,
        </motion.p>

        {/* Prominent Question */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 tracking-tight leading-tight mb-4 drop-shadow-sm glow-text-pink"
        >
          Will You Marry Me? 💍❤️
        </motion.h1>

        {/* Tender romantic description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-700 text-sm sm:text-base font-normal max-w-md mx-auto mb-8 leading-relaxed"
        >
          You bring warmth, laughter, and endless sunshine into my universe. 
          Will you hold my hand, share your smiles, and make this journey forever?
        </motion.p>

        {/* Buttons Section */}
        <div className="relative flex items-center justify-center gap-6 sm:gap-8 min-h-[70px]">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleYesClick}
            className="relative group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-white text-lg sm:text-xl shadow-[0_0_30px_rgba(244,63,94,0.55)] bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 transition-all duration-300 ring-4 ring-pink-200/70 overflow-hidden cursor-pointer flex items-center gap-2.5 z-20"
          >
            {/* Shimmer Effect */}
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent transform -skew-x-12 group-hover:translate-x-[250%] transition-transform duration-1000 pointer-events-none" />
            <Heart className="w-5 h-5 fill-white text-white animate-heartbeat" />
            <span className="tracking-wide drop-shadow">YES ❤️</span>
          </motion.button>

          {/* NO Button - Initially positioned inline, then dodges anywhere within viewport */}
          <div className="relative">
            <button
              ref={noBtnRef}
              onMouseEnter={handleNoDodge}
              onMouseMove={handleNoDodge}
              onTouchStart={handleNoDodge}
              onPointerDown={handleNoDodge}
              onClick={handleNoDodge}
              tabIndex={-1}
              style={
                noPosition
                  ? {
                      position: 'fixed',
                      left: `${noPosition.x}px`,
                      top: `${noPosition.y}px`,
                      zIndex: 9999,
                      transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }
                  : {
                      position: 'relative',
                    }
              }
              className={`px-7 py-3.5 sm:py-4 rounded-full font-semibold text-rose-700 bg-white/95 border-2 border-rose-300/80 shadow-md backdrop-blur-md text-base sm:text-lg select-none cursor-not-allowed whitespace-nowrap active:scale-90 transition-transform ${
                noPosition ? 'animate-bounce shadow-xl ring-2 ring-rose-300' : 'hover:scale-95'
              }`}
            >
              <span>{NO_PHRASES[phraseIndex]}</span>
            </button>
          </div>
        </div>

        {/* Playful hint after dodging a few times */}
        {escapeCount > 2 && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-xs text-rose-500 font-medium italic animate-pulse"
          >
            Psst... the 'NO' button has feet and refuses to cooperate! Just say YES! 😉💕
          </motion.p>
        )}
      </motion.div>

      {/* Romantic bottom quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
        className="mt-8 text-rose-800/80 font-handwriting text-xl sm:text-2xl text-center"
      >
        "I have found the one whom my soul loves." 🌸
      </motion.p>
    </div>
  );
}
