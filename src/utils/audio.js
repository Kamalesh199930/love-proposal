// Romantic Web Audio Synthesizer & Sound Effects
class RomanticAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentStep = 0;
    this.timerId = null;
    this.isMuted = false;
    this.tempo = 96; // BPM
    
    // Canon in D / Romantic Ballad Progression
    // Frequencies (Hz) for romantic notes
    this.melody = [
      // Phrase 1 (Canon in D / Romantic Ballad)
      { note: 587.33, dur: 1.0 }, // D5
      { note: 554.37, dur: 1.0 }, // C#5
      { note: 493.88, dur: 1.0 }, // B4
      { note: 440.00, dur: 1.0 }, // A4
      { note: 392.00, dur: 1.0 }, // G4
      { note: 369.99, dur: 1.0 }, // F#4
      { note: 392.00, dur: 1.0 }, // G4
      { note: 440.00, dur: 1.0 }, // A4

      // Phrase 2 - Sweeter variation
      { note: 587.33, dur: 0.5 }, // D5
      { note: 659.25, dur: 0.5 }, // E5
      { note: 554.37, dur: 1.0 }, // C#5
      { note: 493.88, dur: 0.5 }, // B4
      { note: 554.37, dur: 0.5 }, // C#5
      { note: 440.00, dur: 1.0 }, // A4
      { note: 392.00, dur: 0.5 }, // G4
      { note: 440.00, dur: 0.5 }, // A4
      { note: 369.99, dur: 1.0 }, // F#4
      { note: 392.00, dur: 0.5 }, // G4
      { note: 440.00, dur: 0.5 }, // A4
      { note: 587.33, dur: 1.0 }, // D5

      // Phrase 3 - Romantic High Lullaby
      { note: 739.99, dur: 1.0 }, // F#5
      { note: 659.25, dur: 0.5 }, // E5
      { note: 587.33, dur: 0.5 }, // D5
      { note: 554.37, dur: 1.0 }, // C#5
      { note: 493.88, dur: 1.0 }, // B4
      { note: 440.00, dur: 1.0 }, // A4
      { note: 493.88, dur: 0.5 }, // B4
      { note: 554.37, dur: 0.5 }, // C#5
      { note: 587.33, dur: 2.0 }, // D5 hold
    ];

    // Harmony chords (root and fifth)
    this.bassChords = [
      [146.83, 220.00], // D3, A3
      [110.00, 164.81], // A2, E3
      [123.47, 185.00], // B2, F#3
      [92.50, 138.59],  // F#2, C#3
      [98.00, 146.83],  // G2, D3
      [73.42, 110.00],  // D2, A2
      [98.00, 146.83],  // G2, D3
      [110.00, 164.81], // A2, E3
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentStep = 0;
    this.scheduleNextNote();
  }

  scheduleNextNote() {
    if (!this.isPlaying || !this.ctx) return;

    const item = this.melody[this.currentStep % this.melody.length];
    const bass = this.bassChords[Math.floor(this.currentStep / 2) % this.bassChords.length];

    const noteDuration = (60 / this.tempo) * item.dur;

    if (!this.isMuted) {
      // Play melody note (chime/rhodes piano tone)
      this.playTone(item.note, 0.18, noteDuration, 'sine', true);
      this.playTone(item.note * 2, 0.05, noteDuration * 0.5, 'triangle', false);

      // Play soft bass harmony on longer notes
      if (this.currentStep % 2 === 0 && bass) {
        this.playTone(bass[0], 0.08, noteDuration * 1.5, 'sine', false);
        this.playTone(bass[1], 0.06, noteDuration * 1.5, 'sine', false);
      }
    }

    this.currentStep = (this.currentStep + 1) % this.melody.length;
    this.timerId = setTimeout(() => {
      this.scheduleNextNote();
    }, noteDuration * 1000);
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.playMusic();
      return true;
    }
  }

  // Soft romantic music box note
  playTone(freq, volume, duration, type = 'sine', sparkle = false) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Soft music-box / piano envelope
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(volume * 0.5, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);

      if (sparkle) {
        // High harmonic shimmer
        const shimmer = this.ctx.createOscillator();
        const shimGain = this.ctx.createGain();
        shimmer.type = 'sine';
        shimmer.frequency.setValueAtTime(freq * 3, now);
        shimGain.gain.setValueAtTime(0.0001, now);
        shimGain.gain.exponentialRampToValueAtTime(volume * 0.15, now + 0.03);
        shimGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        shimmer.connect(shimGain);
        shimGain.connect(this.ctx.destination);
        shimmer.start(now);
        shimmer.stop(now + 0.4);
      }
    } catch (e) {
      console.warn("Audio playTone error", e);
    }
  }

  // Playful pop when NO escapes
  playPop() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  // Romantic celebration chime when YES is clicked
  playCelebrationSound() {
    this.initContext();
    if (!this.ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major glowing arpeggio up
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.22, 1.4, 'sine', true);
      }, idx * 120);
    });
  }
}

export const romanticAudio = new RomanticAudio();
