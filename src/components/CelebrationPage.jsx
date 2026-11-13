import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Stars, PartyPopper, RefreshCw } from 'lucide-react';
import Fireworks from './Fireworks';
import BirthdayCake from './BirthdayCake';

export default function CelebrationPage({ onReset }) {
  // Trigger continuous festive confetti blasts
  const fireConfetti = () => {
    // Left cannon
    confetti({
      particleCount: 75,
      angle: 60,
      spread: 70,
      origin: { x: 0.05, y: 0.6 },
      colors: ['#ff4d8d', '#ffd700', '#ff758c', '#ffb6c1', '#ffffff', '#e056fd'],
    });
    // Right cannon
    confetti({
      particleCount: 75,
      angle: 120,
      spread: 70,
      origin: { x: 0.95, y: 0.6 },
      colors: ['#ff4d8d', '#ffd700', '#ff758c', '#ffb6c1', '#ffffff', '#e056fd'],
    });
  };

  useEffect(() => {
    // Immediate confetti
    fireConfetti();

    // Repeated celebration bursts
    const interval = setInterval(() => {
      fireConfetti();
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 z-10 overflow-x-hidden selection:bg-rose-200">
      {/* Background Fireworks */}
      <Fireworks />

      {/* Confetti & Golden Sparkles decorative background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-400/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-300/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Celebration Header Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl w-full z-20"
      >
        {/* Floating Celebration Badges */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/90 to-pink-500/90 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-300/50 mb-3 backdrop-blur-md"
        >
          <PartyPopper className="w-4 h-4 animate-bounce" />
          <span>SHE SAID YES! Best Day Ever! 🎉</span>
          <Stars className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.div>

        {/* Main Attraction: Happy Birthday Jeevitha! ❤️🎂 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring", stiffness: 120 }}
          className="mb-1"
        >
          <h1 className="font-script text-4xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 drop-shadow-md glow-text-pink leading-tight py-1">
            Happy Birthday Jeevitha! ❤️🎂
          </h1>
        </motion.div>

        {/* Golden Sub-header Sparkle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-amber-500 font-display text-sm sm:text-lg font-bold tracking-wide mb-2"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="glow-text-gold">Celebrating The Queen Of My Heart</span>
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        </motion.div>

        {/* Interactive Animated Birthday Cake */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <BirthdayCake />
        </motion.div>

        {/* Romantic Letter / Secondary Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="relative mx-auto mt-3 max-w-lg romantic-glass rounded-2xl p-5 sm:p-6 text-center border-2 border-rose-300/80 shadow-xl backdrop-blur-xl"
        >
          {/* Decorative Corner Ribbons */}
          <div className="absolute top-2 left-3 text-rose-400 text-sm">🌹</div>
          <div className="absolute top-2 right-3 text-rose-400 text-sm">🌹</div>
          <div className="absolute bottom-2 left-3 text-rose-400 text-sm">🌹</div>
          <div className="absolute bottom-2 right-3 text-rose-400 text-sm">🌹</div>

          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 text-rose-600 mb-2">
            <Heart className="w-4 h-4 fill-rose-500 animate-heartbeat" />
          </div>

          <h2 className="font-handwriting text-xl sm:text-2xl text-rose-600 font-bold mb-2">
            From My Heart To Yours
          </h2>

          {/* User's exact secondary message */}
          <blockquote className="font-display italic text-sm sm:text-base text-gray-800 leading-relaxed px-2 py-2 border-y border-rose-200/80">
            "You're the most beautiful part of my life. Every moment with you is special. Keep smiling and stay happy forever. ❤️"
          </blockquote>

          <p className="mt-2.5 text-xs text-rose-700/80 font-medium">
            Forever yours, with all my love & devotion 💕
          </p>
        </motion.div>

        {/* Interactive Buttons: Pop more confetti, or Replay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-5 pb-6"
        >
          <button
            onClick={fireConfetti}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all shadow-rose-300/50 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch More Confetti! 🎊</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-rose-600 font-semibold text-xs sm:text-sm border border-rose-300 shadow-sm hover:scale-105 active:scale-95 transition-all backdrop-blur-md cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Relive The Proposal 💍</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
