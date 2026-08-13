import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { audioEngine } from '../utils/audio';

export const SkillsScreen = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSkillNote, setActiveSkillNote] = useState(null);

  const testSkillEffect = (skillName) => {
    setActiveSkillNote(`Testing ${skillName}... OK!`);
    audioEngine.playCoin();
    setTimeout(() => {
      setActiveSkillNote(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full w-full p-4 md:p-6 overflow-y-auto custom-retro-scroll relative z-10 text-[#1c1109]">
      {/* Header Bar */}
      <div className="dialog-box mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#664800]">psychology</span>
            <h2 className="font-pixel text-xl md:text-2xl font-bold uppercase text-[#271900] tracking-tight">
              SKILLS_MATRIX
            </h2>
          </div>
          <p className="font-mono text-xs text-[#574d2d] mt-0.5">
            FARHAN TRIPUTRA TECHNICAL CAPABILITIES & POWER MAPPING
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

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SKILLS_DATA.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => {
              audioEngine.playBlip();
              setActiveCategory(idx);
            }}
            className={`px-2.5 py-1.5 font-pixel text-xs rounded border-2 transition-all cursor-pointer ${
              activeCategory === idx
                ? 'bg-[#f4b41a] text-[#1c1109] font-bold border-[#1c1109] shadow-[2px_2px_0px_rgba(0,0,0,0.8)]'
                : 'bg-[#2a1d15] text-[#d4c4ac] border-[#504533] hover:border-[#f4b41a]'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Notification Toast */}
      {activeSkillNote && (
        <div className="mb-3 p-2 bg-[#f4b41a] text-[#1c1109] font-pixel text-xs font-bold rounded border-2 border-[#1c1109] text-center animate-bounce">
          ⚡ {activeSkillNote}
        </div>
      )}

      {/* Skills List for Selected Category */}
      <div className="flex flex-col gap-3 pb-6">
        {SKILLS_DATA[activeCategory].skills.map((skill) => (
          <div
            key={skill.name}
            className="bg-[#e9dab0] border-3 border-[#403229] p-3.5 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,0.5)] flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-lg text-[#664800]">
                  {skill.icon}
                </span>
                <h4 className="font-pixel text-base font-bold text-[#271900]">
                  {skill.name}
                </h4>
                <span className="ml-auto font-pixel text-xs font-bold text-[#664800]">
                  LVL {skill.level}%
                </span>
              </div>

              <p className="font-mono text-xs text-[#574d2d] mb-2">{skill.description}</p>

              {/* Progress Bar */}
              <div className="w-full bg-[#2a1d15] h-3.5 rounded-full overflow-hidden border border-[#403229] p-0.5">
                <div
                  className="bg-gradient-to-r from-[#f4b41a] to-[#ffd587] h-full rounded-full transition-all duration-500 shadow-inner"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => testSkillEffect(skill.name)}
              className="px-3 py-1.5 bg-[#403229] text-[#f4b41a] hover:bg-[#f4b41a] hover:text-[#1c1109] font-pixel text-xs rounded border border-[#1c1109] transition-all self-start md:self-center font-bold"
            >
              TEST SKILL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
