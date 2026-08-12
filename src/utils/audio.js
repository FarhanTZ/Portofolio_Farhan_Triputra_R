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
}

export const audioEngine = new RetroAudioEngine();
