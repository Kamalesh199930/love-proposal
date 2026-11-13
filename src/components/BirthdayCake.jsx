import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [wished, setWished] = useState(false);

  const blowCandles = () => {
    setCandlesLit([false, false, false, false, false]);
    setWished(true);
    // Extra special confetti burst for the wish!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ffd700', '#ff1493', '#fff'],
    });
  };

  const relightCandles = () => {
    setCandlesLit([true, true, true, true, true]);
    setWished(false);
  };

  return (
    <div className="flex flex-col items-center justify-center my-6 select-none">
      <div className="relative w-64 h-56 flex flex-col items-center justify-end">
        {/* Candles Row */}
        <div className="flex justify-between w-40 mb-1 z-20 px-2">
          {candlesLit.map((isLit, i) => (
            <div key={i} className="flex flex-col items-center relative">
              {/* Flame */}
              {isLit ? (
                <div className="relative mb-0.5 cursor-pointer" onClick={blowCandles}>
                  <div className="w-3.5 h-6 bg-gradient-to-t from-amber-400 via-yellow-200 to-white rounded-full animate-candle-flame shadow-[0_0_12px_#ff9800]" />
                  <div className="absolute inset-0 w-2 h-4 mx-auto my-auto bg-blue-300 rounded-full opacity-60 filter blur-[1px]" />
                </div>
              ) : (
                <div className="w-1 h-5 mb-0.5 relative">
                  {/* Smoke particle */}
                  <div className="w-1.5 h-3 bg-gray-400/40 rounded-full animate-pulse -translate-y-2" />
                </div>
              )}
              {/* Candle Body */}
              <div className="w-2.5 h-10 rounded-sm bg-gradient-to-r from-rose-300 via-pink-100 to-rose-300 shadow-sm border border-rose-200/50" />
            </div>
          ))}
        </div>

        {/* Top Cake Tier */}
        <div className="relative w-44 h-16 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 rounded-t-2xl shadow-md border-t-4 border-white flex items-center justify-center overflow-hidden z-10">
          {/* Icing Drips */}
          <div className="absolute top-0 inset-x-0 flex justify-around">
            <span className="w-6 h-4 bg-white rounded-b-full shadow-sm -mt-1"></span>
            <span className="w-7 h-5 bg-white rounded-b-full shadow-sm -mt-1"></span>
            <span className="w-6 h-3 bg-white rounded-b-full shadow-sm -mt-1"></span>
            <span className="w-8 h-6 bg-white rounded-b-full shadow-sm -mt-1"></span>
            <span className="w-6 h-4 bg-white rounded-b-full shadow-sm -mt-1"></span>
          </div>

          {/* Strawberry / Cherry Toppings */}
          <div className="flex gap-4 z-10 mt-1">
            <span className="text-sm filter drop-shadow">🍓</span>
            <span className="text-sm filter drop-shadow">🍒</span>
            <span className="text-sm filter drop-shadow">🍓</span>
          </div>

          {/* Cream Ribbon */}
          <div className="absolute bottom-1 inset-x-0 h-1.5 bg-rose-300/40"></div>
        </div>

        {/* Bottom Cake Tier */}
        <div className="relative w-56 h-20 bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 rounded-t-2xl shadow-lg border-t-4 border-white flex items-center justify-center overflow-hidden z-0 -mt-1">
          {/* Icing Drips */}
          <div className="absolute top-0 inset-x-0 flex justify-around">
            <span className="w-8 h-5 bg-white rounded-b-full shadow-sm -mt-1"></span>
            <span className="w-7 h-4 bg-white rounded-b-full shadow-sm -mt-1"></span>
            <span className="w-9 h-6 bg-white rounded-b-full shadow-sm -mt-1"></span>
            <span className="w-8 h-4 bg-white rounded-b-full shadow-sm -mt-1"></span>
            <span className="w-8 h-5 bg-white rounded-b-full shadow-sm -mt-1"></span>
          </div>

          <div className="flex gap-6 z-10 mt-2">
            <span className="text-xs font-handwriting text-rose-500 font-bold tracking-widest uppercase">
              Sweet Jeevitha
            </span>
          </div>

          {/* Cream swirls at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300"></div>
        </div>

        {/* Cake Stand / Plate */}
        <div className="w-64 h-3.5 bg-gradient-to-r from-amber-100 via-white to-amber-100 rounded-full shadow-lg border border-amber-200/60 z-0 -mt-0.5"></div>
      </div>

      {/* Interactive button to blow out or light candles */}
      <div className="mt-4">
        {candlesLit.some((l) => l) ? (
          <button
            onClick={blowCandles}
            className="text-xs md:text-sm font-medium px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 hover:bg-rose-200 hover:scale-105 active:scale-95 transition-all shadow-sm border border-rose-300 flex items-center gap-1.5"
          >
            <span>✨</span> Click to Blow the Candles & Make a Wish 🎂
          </button>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs md:text-sm font-medium text-rose-700 font-handwriting text-base animate-bounce">
              May all your wishes and sweetest dreams come true, Jeevitha! 🌟
            </p>
            <button
              onClick={relightCandles}
              className="text-xs text-rose-500 underline hover:text-rose-700 transition"
            >
              Relight Candles 🕯️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
