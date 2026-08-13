// Web Audio API Synthesizer for authentic 8-bit chiptune sound effects

class RetroAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.volume = 0.3;
  }

  getContext() {
    if (!this.enabled) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play a simple frequency note
  playNote(freq, type = 'square', duration = 0.08, gainVal = 0.15) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio errors if context fails
    }
  }

  // Sound FX: Menu Select / Blip
  playBlip() {
    this.playNote(440, 'square', 0.05, 0.12);
  }

  // Sound FX: Menu Confirm / A Button
  playConfirm() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.playNote(523.25, 'square', 0.06, 0.15); // C5
    setTimeout(() => {
      this.playNote(659.25, 'square', 0.09, 0.18); // E5
    }, 60);
  }

  // Sound FX: Cancel / B Button
  playCancel() {
    this.playNote(300, 'sawtooth', 0.08, 0.15);
    setTimeout(() => {
      this.playNote(220, 'sawtooth', 0.1, 0.12);
    }, 50);
  }

  // Sound FX: Jump in Mini-game
  playJump() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.18 * this.volume, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  }

  // Sound FX: Collect Item / Coin
  playCoin() {
    this.playNote(987.77, 'square', 0.08, 0.15); // B5
    setTimeout(() => {
      this.playNote(1318.51, 'square', 0.15, 0.18); // E6
    }, 70);
  }

  // Sound FX: Power On Boot Sound
  playPowerOn() {
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C E G C E G
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playNote(note, 'triangle', 0.12, 0.2);
      }, index * 60);
    });
  }

  // Sound FX: Hit / Damage
  playHit() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.25 * this.volume, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {}
  }
  // Lofi Chiptune BGM Sequencer (100% Web Audio API Synthesized - Royalty Free)
  startLofiBgm() {
    if (this.bgmPlaying) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.bgmPlaying = true;
    let step = 0;

    // Chill Lofi Chords & Bass Frequencies (Cmaj7 -> Am7 -> Dm7 -> G7)
    const chords = [
      { bass: 130.81, notes: [261.63, 329.63, 392.00, 493.88] }, // Cmaj7
      { bass: 110.00, notes: [220.00, 261.63, 329.63, 392.00] }, // Am7
      { bass: 146.83, notes: [293.66, 349.23, 440.00, 523.25] }, // Dm7
      { bass: 98.00,  notes: [196.00, 246.94, 293.66, 349.23] }  // G7
    ];

    const playStep = () => {
      if (!this.bgmPlaying || !this.enabled) return;

      const chordIdx = Math.floor(step / 4) % chords.length;
      const currentChord = chords[chordIdx];
      const beatInChord = step % 4;

      // Bass note on beats 0 & 2 (Triangle wave - warm Lofi bass)
      if (beatInChord === 0 || beatInChord === 2) {
        this.playLofiTone(currentChord.bass, 'triangle', 0.45, 0.35);
      }

      // Soft Chord Pad on beat 0
      if (beatInChord === 0) {
        currentChord.notes.forEach((freq) => {
          this.playLofiTone(freq, 'sine', 0.6, 0.15);
        });
      }

      // Gentle Lofi Melody Arpeggio
      const melNote = currentChord.notes[beatInChord % currentChord.notes.length];
      this.playLofiTone(melNote * 1.5, 'triangle', 0.28, 0.18);

      step++;
      this.bgmTimer = setTimeout(playStep, 480); // ~62 BPM chill Lofi tempo
    };

    playStep();
  }

  stopLofiBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleLofiBgm() {
    if (this.bgmPlaying) {
      this.stopLofiBgm();
    } else {
      this.startLofiBgm();
    }
    return this.bgmPlaying;
  }

  playLofiTone(freq, type = 'sine', duration = 0.3, gainVal = 0.1) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const masterVol = Math.max(this.volume, 0.6);
      const actualGain = gainVal * masterVol;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(actualGain, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }
}

export const audioEngine = new RetroAudioEngine();
