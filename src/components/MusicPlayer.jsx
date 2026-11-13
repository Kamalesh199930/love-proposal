import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleAudio = () => {
    setHasInteracted(true);
    if (!isPlaying) {
      romanticAudio.playMusic();
      setIsPlaying(true);
    } else {
      romanticAudio.stopMusic();
      setIsPlaying(false);
    }
  };

  // If user clicks anywhere on page first time, we can show a nice gentle hint or let them toggle
  useEffect(() => {
    return () => {
      romanticAudio.stopMusic();
    };
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={toggleAudio}
        aria-label="Toggle Romantic Music"
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg ${
          isPlaying
            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-300/50 ring-2 ring-pink-300/60 animate-pulse'
            : 'bg-white/80 hover:bg-white text-rose-700 backdrop-blur-md border border-rose-200 shadow-rose-200/40 hover:scale-105'
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_100ms] h-3"></span>
              <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_300ms] h-4"></span>
              <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_200ms] h-2.5"></span>
            </div>
            <Volume2 className="w-4 h-4 ml-1" />
            <span className="hidden sm:inline font-sans font-semibold tracking-wide text-xs">Romantic Music</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline font-sans text-xs text-rose-600 font-medium">Play Music 🎵</span>
          </>
        )}
      </button>
    </div>
  );
}
