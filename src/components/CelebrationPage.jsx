import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper, RefreshCw, Crown } from 'lucide-react';
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
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-7 z-10 overflow-x-hidden selection:bg-rose-200">
      {/* Background Fireworks */}
      <Fireworks />

      {/* Confetti & Golden Sparkles decorative background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-400/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-300/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Celebration Header Content */}
      <div className="text-center max-w-2xl w-full z-20">
        {/* Floating Celebration Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-300/50 mb-2 backdrop-blur-md">
          <PartyPopper className="w-3.5 h-3.5 animate-bounce" />
          <span>SHE SAID YES! Best Day Ever! 🎉</span>
          <PartyPopper className="w-3.5 h-3.5 animate-bounce" />
        </div>

        {/* Main Attraction: Happy Birthday Meganya! - Rich Vibrant Typography */}
        <div className="mb-1">
          <h1 className="font-script text-5xl sm:text-7xl font-extrabold rose-gradient-text glow-text-pink leading-tight py-1">
            Happy Birthday Meganya!
          </h1>
        </div>

        {/* Golden Sub-header Sparkle with Crown Icon */}
        <div className="flex items-center justify-center gap-2 text-amber-600 font-display text-xs sm:text-base font-bold tracking-wide mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <Crown className="w-4 h-4 text-amber-500 inline-block" />
          <span className="glow-text-gold">Celebrating The Queen Of My Heart</span>
          <Crown className="w-4 h-4 text-amber-500 inline-block" />
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        </div>

        {/* Interactive Animated Birthday Cake */}
        <div>
          <BirthdayCake />
        </div>

        {/* Romantic Letter / Secondary Message Card */}
        <div className="relative mx-auto mt-2 max-w-lg romantic-glass rounded-2xl p-4 sm:p-6 text-center border-2 border-rose-300/80 shadow-xl backdrop-blur-xl">
          {/* Decorative Corner Ribbons */}
          <div className="absolute top-2 left-3 text-rose-400 text-sm">🌹</div>
          <div className="absolute top-2 right-3 text-rose-400 text-sm">🌹</div>
          <div className="absolute bottom-2 left-3 text-rose-400 text-sm">🌹</div>
          <div className="absolute bottom-2 right-3 text-rose-400 text-sm">🌹</div>

          <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-rose-600 mb-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-500 animate-heartbeat" />
          </div>

          <h2 className="font-handwriting text-lg sm:text-2xl text-rose-600 font-bold mb-1.5">
            From My Heart To Yours
          </h2>

          {/* User's exact secondary message */}
          <blockquote className="font-display italic text-xs sm:text-base text-gray-800 leading-relaxed px-2 py-1.5 border-y border-rose-200/80">
            "You're the most beautiful part of my life. Every moment with you is special. Keep smiling and stay happy forever. ❤️"
          </blockquote>

          <p className="mt-2 text-xs text-rose-700/80 font-medium">
            Forever yours, with all my love & devotion 💕
          </p>
        </div>

        {/* Interactive Buttons: Pop more confetti, or Replay */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3 sm:mt-4 pb-4">
          <button
            onClick={fireConfetti}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all shadow-rose-300/50 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch More Confetti! 🎊</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/90 hover:bg-white text-rose-600 font-semibold text-xs sm:text-sm border border-rose-300 shadow-sm hover:scale-105 active:scale-95 transition-all backdrop-blur-md cursor-pointer whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Relive The Proposal 💍</span>
          </button>
        </div>
      </div>
    </div>
  );
}
