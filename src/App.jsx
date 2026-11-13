import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import FallingPetals from './components/FallingPetals';
import MusicPlayer from './components/MusicPlayer';
import ProposalPage from './components/ProposalPage';
import CelebrationPage from './components/CelebrationPage';

export default function App() {
  const [stage, setStage] = useState('proposal'); // 'proposal' | 'celebration'

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 text-gray-800">
      {/* Background Animated Gradient Mesh / Ambient Light Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-300/35 blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-purple-300/30 blur-[130px] animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute top-[40%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-rose-200/40 blur-[110px]" />
      </div>

      {/* Floating Hearts & Falling Petals Animations */}
      <FloatingHearts />
      <FallingPetals />

      {/* Romantic Music Controller */}
      <MusicPlayer />

      {/* Animated Screen Transition */}
      <AnimatePresence mode="wait">
        {stage === 'proposal' ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <ProposalPage onAccept={() => setStage('celebration')} />
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <CelebrationPage onReset={() => setStage('proposal')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
