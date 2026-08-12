import React from 'react';
import { SHELL_THEMES } from '../types';
import { audioEngine } from '../utils/audio';

export const CustomizeScreen = ({ settings, onUpdateSettings, onBack }) => {
  return (
    <div className="flex flex-col h-full w-full p-4 md:p-6 overflow-y-auto custom-retro-scroll relative z-10 text-[#1c1109]">
      {/* Header Bar */}
      <div className="dialog-box mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#664800]">settings</span>
            <h2 className="font-pixel text-xl md:text-2xl font-bold uppercase text-[#271900] tracking-tight">
              CONSOLE_CUSTOMIZE
            </h2>
          </div>
          <p className="font-mono text-xs text-[#574d2d] mt-0.5">
            CALIBRATE HARDWARE SHELL & DISPLAY CRT FILTERS
          </p>
        </div>

        <button
          onClick={() => {
            audioEngine.playCancel();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#403229] text-[#f6ded1] hover:bg-[#f4b41a] hover:text-[#1c1109] font-pixel text-xs rounded border-2 border-[#1c1109] transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>[B] BACK TO MENU</span>
        </button>
      </div>

      {/* Shell Color Themes */}
      <div className="bg-[#e9dab0] border-4 border-[#403229] p-4 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.6)] mb-6">
        <h3 className="font-pixel text-sm font-bold text-[#271900] uppercase mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#664800]">palette</span>
          CONSOLE CHASSIS SHELL TINT
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {SHELL_THEMES.map((theme) => {
            const isSelected = settings.shellColor === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  audioEngine.playConfirm();
                  onUpdateSettings({ shellColor: theme.id });
                }}
                className={`p-3 rounded-lg border-3 transition-all text-left flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#403229] text-[#f4b41a] border-[#1c1109] shadow-[3px_3px_0px_rgba(0,0,0,0.8)]'
                    : 'bg-[#cdbe96] text-[#271900] border-[#403229] hover:bg-[#d4c69d]'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-[#1c1109] shadow-inner flex-shrink-0"
                  style={{ backgroundColor: theme.hex }}
                />
                <div>
                  <div className="font-pixel text-xs font-bold">{theme.name}</div>
                  <div className="font-mono text-[10px] opacity-80">{theme.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Display & Sound Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CRT Scanline Toggle */}
        <div className="bg-[#e9dab0] border-4 border-[#403229] p-4 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.6)]">
          <h3 className="font-pixel text-sm font-bold text-[#271900] uppercase mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#664800]">tv</span>
            CRT SCANLINE OVERLAY
          </h3>
          <p className="font-mono text-xs text-[#574d2d] mb-4">
            Simulate vintage glass matrix scanlines and color bleeding.
          </p>

          <button
            onClick={() => {
              audioEngine.playBlip();
              onUpdateSettings({ crtOverlay: !settings.crtOverlay });
            }}
            className={`w-full py-2.5 font-pixel text-xs font-bold rounded border-2 border-[#1c1109] transition-all ${
              settings.crtOverlay
                ? 'bg-[#f4b41a] text-[#1c1109] shadow-[2px_2px_0px_rgba(0,0,0,0.8)]'
                : 'bg-[#403229] text-[#f6ded1]'
            }`}
          >
            {settings.crtOverlay ? '✓ CRT SCANLINES ENABLED' : '✗ CRT SCANLINES DISABLED'}
          </button>
        </div>

        {/* Chiptune Audio Synth Control */}
        <div className="bg-[#e9dab0] border-4 border-[#403229] p-4 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.6)]">
          <h3 className="font-pixel text-sm font-bold text-[#271900] uppercase mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#664800]">volume_up</span>
            8-BIT SOUND SYNTHESIZER
          </h3>
          <p className="font-mono text-xs text-[#574d2d] mb-4">
            Web Audio API generated retro chiptune blips and effects.
          </p>

          <button
            onClick={() => {
              const newSoundState = !settings.soundEnabled;
              audioEngine.enabled = newSoundState;
              if (newSoundState) audioEngine.playPowerOn();
              onUpdateSettings({ soundEnabled: newSoundState });
            }}
            className={`w-full py-2.5 font-pixel text-xs font-bold rounded border-2 border-[#1c1109] transition-all ${
              settings.soundEnabled
                ? 'bg-[#f4b41a] text-[#1c1109] shadow-[2px_2px_0px_rgba(0,0,0,0.8)]'
                : 'bg-[#93000a] text-[#ffdad6]'
            }`}
          >
            {settings.soundEnabled ? '🔊 AUDIO CHIPTUNES ON' : '🔇 AUDIO CHIPTUNES MUTED'}
          </button>
        </div>
      </div>
    </div>
  );
};
