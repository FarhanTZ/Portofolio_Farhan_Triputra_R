import React, { useEffect, useState } from 'react';
import { audioEngine } from '../utils/audio';

const MENU_ITEMS = [
  { id: 'start-game', label: 'START', desc: 'Play 32-Bit Mini Quest Arcade' },
  { id: 'profile', label: 'PROFILE', desc: 'Farhan Triputra Char Sheet & Equipment' },
  { id: 'projects', label: 'PROJECTS', desc: 'Browse Projects Database' },
  { id: 'skills', label: 'SKILLS', desc: 'View Skill Matrix & RPG Stats' },
  { id: 'customize', label: 'CUSTOMIZE', desc: 'Console Theme & Audio Settings' },
];

export const BootMenu = ({ onSelectOption, activeOption, setActiveOption }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const idx = MENU_ITEMS.findIndex((item) => item.id === activeOption);
    if (idx !== -1) setSelectedIndex(idx);
  }, [activeOption]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
        setActiveOption(MENU_ITEMS[next].id);
        audioEngine.playBlip();
        return next;
      });
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = (prev + 1) % MENU_ITEMS.length;
        setActiveOption(MENU_ITEMS[next].id);
        audioEngine.playBlip();
        return next;
      });
    } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'z' || e.key === 'Z') {
      e.preventDefault();
      audioEngine.playConfirm();
      onSelectOption(MENU_ITEMS[selectedIndex].id);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="flex flex-col h-full items-center justify-between w-full relative z-10 p-2 sm:p-4 md:p-6 overflow-y-auto custom-retro-scroll select-none gap-2">
      {/* Top Floating Player Status Bar */}
      <div className="w-full max-w-sm bg-[#1c1109]/85 border-2 border-[#504533] rounded-lg px-3 py-1 flex items-center justify-between text-xs font-pixel shadow-md shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 bg-[#f4b41a] rounded-sm animate-pulse flex-shrink-0" />
          <span className="font-bold text-[#f6ded1] tracking-wider truncate">FARHAN TRIPUTRA</span>
        </div>
        <span className="text-[10px] font-bold text-[#ffd587] uppercase tracking-widest bg-[#403229] px-2 py-0.5 rounded border border-[#504533]">
          READY
        </span>
      </div>

      {/* Center Translucent Menu Overlay Box */}
      <div className="w-full max-w-xs bg-[#1c1109]/90 border-3 border-[#504533] rounded-xl p-2.5 md:p-4 my-auto shadow-2xl backdrop-blur-xs flex flex-col gap-1.5 shrink-0">
        {MENU_ITEMS.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedIndex(index);
                setActiveOption(item.id);
                audioEngine.playConfirm();
                onSelectOption(item.id);
              }}
              onMouseEnter={() => {
                if (selectedIndex !== index) {
                  setSelectedIndex(index);
                  setActiveOption(item.id);
                  audioEngine.playBlip();
                }
              }}
              className={`group flex items-center justify-between px-3 py-1.5 md:py-2 rounded text-left transition-all font-pixel text-xs md:text-sm ${
                isSelected
                  ? 'bg-[#f4b41a] text-[#1c1109] font-bold border-2 border-[#1c1109] shadow-[2px_2px_0px_rgba(0,0,0,0.8)] scale-[1.02]'
                  : 'text-[#f6ded1] hover:bg-[#35271f]/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold ${
                    isSelected ? 'opacity-100 text-[#1c1109] blinking-cursor' : 'opacity-0'
                  }`}
                >
                  &gt;
                </span>
                <span className="font-bold tracking-wider">{item.label}</span>
              </div>

              {isSelected && (
                <span className="text-[9px] bg-[#1c1109] text-[#f4b41a] px-1.5 py-0.5 rounded font-mono uppercase font-bold">
                  PRESS A
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Controller Hint Footer */}
      <div className="text-[10px] font-mono text-[#f6ded1]/90 bg-[#170c05]/80 px-3 py-1 rounded-full border border-[#504533] text-center shrink-0">
        <strong className="text-[#f4b41a]">D-PAD</strong>: NAV | <strong className="text-[#f4b41a]">A</strong>: SELECT
      </div>
    </div>
  );
};
