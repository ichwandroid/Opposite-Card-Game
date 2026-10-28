class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicEnabled: boolean = true;
  private musicInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private musicStep: number = 0;

  constructor() {
    // AudioContext will be initialized upon first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // Dedicated music channel
        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.09, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.3, this.ctx.currentTime);
    }
    if (muted) {
      this.stopMusic();
    } else if (this.isMusicEnabled) {
      this.startMusic();
    }
  }

  public setMusicEnabled(enabled: boolean) {
    this.isMusicEnabled = enabled;
    if (enabled && !this.isMuted) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  public playRoll() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio fallback silent
    }
  }

  public playSelect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  public playCancel() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {}
  }

  public playMatchFly() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(700, now + 0.2);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }

  public playCorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch {}
  }

  public playWrong() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // Gentle downward wobble
      [220, 180].forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.12;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(start);
        osc.stop(start + 0.15);
      });
    } catch {}
  }

  public playCountdown(num: number) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (num === 0) {
        // "MULAI!"
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.2); // D6
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        // 3, 2, 1
        osc.type = 'sine';
        const freq = 440 + (3 - num) * 80;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }

      osc.connect(gain);
      gain.connect(this.masterGain);
    } catch {}
  }

  public playTimeout() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [392.0, 349.23, 329.63, 261.63]; // G4, F4, E4, C4
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(start);
        osc.stop(start + 0.2);
      });
    } catch {}
  }

  public playVictory() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const melody = [
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.12 },
        { f: 1046.5, d: 0.3 },
        { f: 880.0, d: 0.15 },
        { f: 1046.5, d: 0.45 },
      ];
      const now = this.ctx.currentTime;
      let timeOffset = 0;

      melody.forEach((note) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + timeOffset;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, start);

        gain.gain.setValueAtTime(0.28, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(start);
        osc.stop(start + note.d);

        timeOffset += note.d * 0.9;
      });
    } catch {}
  }

  public startMusic() {
    if (this.musicInterval || !this.isMusicEnabled || this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.musicGain) return;

    // Cute, upbeat, cheerful pentatonic melody notes (Hz)
    // C5=523.25, D5=587.33, E5=659.25, G5=783.99, A5=880, C6=1046.5
    const melodyPattern: (number | null)[] = [
      523.25, 659.25, 783.99, 880.0,   // C5, E5, G5, A5
      783.99, 659.25, null,   587.33,  // G5, E5, -,  D5
      523.25, 587.33, 659.25, 783.99,  // C5, D5, E5, G5
      659.25, 587.33, 523.25, null,    // E5, D5, C5, -
      659.25, 783.99, 880.0,  1046.5,  // E5, G5, A5, C6
      880.0,  783.99, 659.25, null,    // A5, G5, E5, -
      587.33, 659.25, 783.99, 880.0,   // D5, E5, G5, A5
      783.99, 587.33, 523.25, null,    // G5, D5, C5, -
    ];

    // Bouncy cartoon walking bass notes (Hz)
    const bassPattern: (number | null)[] = [
      130.81, null, 196.0,  null, // C3, -, G3, -
      130.81, null, 196.0,  null,
      174.61, null, 261.63, null, // F3, -, C4, -
      196.0,  null, 146.83, null, // G3, -, D3, -
      130.81, null, 196.0,  null,
      220.0,  null, 164.81, null, // A3, -, E3, -
      174.61, null, 261.63, null,
      196.0,  null, 246.94, null, // G3, -, B3, -
    ];

    const stepDurationMs = 210; // ~142 BPM cheerful bouncy tempo

    this.musicInterval = window.setInterval(() => {
      if (this.isMuted || !this.isMusicEnabled || !this.ctx || !this.musicGain) return;
      try {
        const now = this.ctx.currentTime;
        const currentStep = this.musicStep % melodyPattern.length;
        const melodyFreq = melodyPattern[currentStep];
        const bassFreq = bassPattern[currentStep];

        // 1. Cute Playful Marimba / Toy-Piano Melody Tone
        if (melodyFreq) {
          // Primary fundamental tone (sine)
          const osc1 = this.ctx.createOscillator();
          const gain1 = this.ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(melodyFreq, now);

          // Subtle woodsy harmonic overtone (triangle at 2x)
          const osc2 = this.ctx.createOscillator();
          const gain2 = this.ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(melodyFreq * 2, now);

          // Plucky, cute bouncy envelope
          gain1.gain.setValueAtTime(0.065, now);
          gain1.gain.exponentialRampToValueAtTime(0.0008, now + 0.17);

          gain2.gain.setValueAtTime(0.02, now);
          gain2.gain.exponentialRampToValueAtTime(0.0008, now + 0.11);

          osc1.connect(gain1);
          gain1.connect(this.musicGain);

          osc2.connect(gain2);
          gain2.connect(this.musicGain);

          osc1.start(now);
          osc1.stop(now + 0.18);
          osc2.start(now);
          osc2.stop(now + 0.12);
        }

        // 2. Playful Bouncy Cartoon Bass
        if (bassFreq) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(bassFreq, now);

          bassGain.gain.setValueAtTime(0.055, now);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);

          bassOsc.connect(bassGain);
          bassGain.connect(this.musicGain);

          bassOsc.start(now);
          bassOsc.stop(now + 0.2);
        }

        // 3. Cute Cartoon Woodblock / Bubble Percussion Tick (every 4th step)
        if (currentStep % 4 === 2) {
          const tickOsc = this.ctx.createOscillator();
          const tickGain = this.ctx.createGain();
          tickOsc.type = 'sine';
          tickOsc.frequency.setValueAtTime(950, now);
          tickOsc.frequency.exponentialRampToValueAtTime(350, now + 0.035);

          tickGain.gain.setValueAtTime(0.025, now);
          tickGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.035);

          tickOsc.connect(tickGain);
          tickGain.connect(this.musicGain);

          tickOsc.start(now);
          tickOsc.stop(now + 0.04);
        }

        this.musicStep++;
      } catch {
        // Safe fallback
      }
    }, stepDurationMs);
  }

  public stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.musicStep = 0;
  }

  public pauseMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public resumeMusic() {
    if (!this.musicInterval && this.isMusicEnabled && !this.isMuted) {
      this.startMusic();
    }
  }
}

export const sound = new SoundEngine();
