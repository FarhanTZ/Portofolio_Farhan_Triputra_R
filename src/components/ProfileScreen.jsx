import React, { useState } from 'react';
import { PLAYER_STATS_DATA, PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION, PROJECTS_DATA } from '../data/portfolioData';
import { audioEngine } from '../utils/audio';

export const ProfileScreen = ({ onBack, isZoomed }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    audioEngine.playConfirm();
    setSent(true);
    setTimeout(() => {
      setMessage('');
      setSent(false);
    }, 3000);
  };

  const handleCvDownload = () => {
    audioEngine.playCoin();
  };

  const keyProjects = PROJECTS_DATA.filter((p) => p.featured);

  return (
    <div className="flex flex-col h-full w-full p-4 md:p-6 overflow-y-auto custom-retro-scroll relative z-10 text-[#1c1109]">
      {/* Header Bar */}
      <div className="dialog-box mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#664800]">badge</span>
            <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold uppercase text-[#271900] tracking-tight break-words">
              FARHAN TRIPUTRA PROFILE
            </h2>
          </div>
          <p className="font-mono text-[11px] sm:text-xs text-[#574d2d] mt-0.5 break-words">
            {PERSONAL_INFO.title} | {PERSONAL_INFO.location}
          </p>
        </div>

        <button
          onClick={() => {
            audioEngine.playCancel();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#403229] text-[#f6ded1] hover:bg-[#f4b41a] hover:text-[#1c1109] font-pixel text-xs rounded border-2 border-[#1c1109] transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.8)] cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>[B] BACK TO MENU</span>
        </button>
      </div>

      {/* Main Stats (Stacked in GameBoy mode, Side-by-Side in Expanded mode) */}
      <div className={`grid grid-cols-1 ${isZoomed ? 'lg:grid-cols-2' : ''} gap-4 mb-6`}>
        {/* Character Card */}
        <div className="bg-[#e9dab0] border-4 border-[#403229] p-3 sm:p-4 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.6)] flex flex-col justify-between min-w-0 w-full">
          <div>
            <div className="flex flex-row items-center gap-3.5 pb-3 border-b-2 border-[#cdbe96] mb-3">
              {/* Profile Photo with Pixel Border */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#403229] text-[#f4b41a] rounded-lg border-2 border-[#1c1109] overflow-hidden shrink-0 shadow-md">
                <img
                  src="/profile/Foto_Ijazah.jpeg"
                  alt="Farhan Triputra Ramadhan"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center font-pixel text-xl font-bold -z-10">
                  FT
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-pixel text-sm sm:text-base md:text-lg font-bold text-[#271900] leading-tight break-words">
                  {PLAYER_STATS_DATA.name}
                </h3>
                <div className="font-mono text-[11px] sm:text-xs text-[#664800] mt-0.5 font-semibold break-words">
                  EXP: {PLAYER_STATS_DATA.exp} / {PLAYER_STATS_DATA.maxExp} (LVL {PLAYER_STATS_DATA.level})
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] text-[#574d2d] mt-1 break-all">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#664800] hover:underline font-bold break-all">
                    ✉ {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Vitals Bars */}
            <div className="space-y-2 mb-4 font-pixel text-xs">
              <div>
                <div className="flex justify-between text-[#271900] mb-0.5">
                  <span>HP (HEALTH)</span>
                  <span>{PLAYER_STATS_DATA.hp}/{PLAYER_STATS_DATA.maxHp}</span>
                </div>
                <div className="w-full bg-[#1c1109] h-3 rounded overflow-hidden p-0.5">
                  <div className="bg-red-500 h-full rounded" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#271900] mb-0.5">
                  <span>MP (STAMINA)</span>
                  <span>{PLAYER_STATS_DATA.mp}/{PLAYER_STATS_DATA.maxMp}</span>
                </div>
                <div className="w-full bg-[#1c1109] h-3 rounded overflow-hidden p-0.5">
                  <div className="bg-blue-500 h-full rounded" style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            {/* Attribute Scores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-pixel text-xs mb-4">
              <div className="bg-[#cdbe96] p-2 rounded border border-[#403229] flex justify-between items-center gap-1 min-w-0">
                <span className="text-[#574d2d] text-[10px] sm:text-xs truncate">STR (FLUTTER/GO):</span>
                <span className="font-bold text-[#271900] text-xs shrink-0">{PLAYER_STATS_DATA.stats.str}</span>
              </div>
              <div className="bg-[#cdbe96] p-2 rounded border border-[#403229] flex justify-between items-center gap-1 min-w-0">
                <span className="text-[#574d2d] text-[10px] sm:text-xs truncate">INT (AI/YOLOv8):</span>
                <span className="font-bold text-[#271900] text-xs shrink-0">{PLAYER_STATS_DATA.stats.int}</span>
              </div>
              <div className="bg-[#cdbe96] p-2 rounded border border-[#403229] flex justify-between items-center gap-1 min-w-0">
                <span className="text-[#574d2d] text-[10px] sm:text-xs truncate">AGI (CLEAN ARCH):</span>
                <span className="font-bold text-[#271900] text-xs shrink-0">{PLAYER_STATS_DATA.stats.agi}</span>
              </div>
              <div className="bg-[#cdbe96] p-2 rounded border border-[#403229] flex justify-between items-center gap-1 min-w-0">
                <span className="text-[#574d2d] text-[10px] sm:text-xs truncate">VIT (IT SUPPORT):</span>
                <span className="font-bold text-[#271900] text-xs shrink-0">{PLAYER_STATS_DATA.stats.vit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Academic Credentials */}
        <div className="bg-[#e9dab0] border-4 border-[#403229] p-4 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.6)] flex flex-col justify-between">
          <div>
            <h3 className="font-pixel text-base font-bold text-[#271900] uppercase mb-3 flex items-center gap-2 border-b-2 border-[#cdbe96] pb-2">
              <span className="material-symbols-outlined text-[#664800]">school</span>
              EDUCATION ACADEMY
            </h3>

            <div className="bg-[#cdbe96] p-3 rounded border-2 border-[#403229] mb-3">
              <div className="font-pixel text-sm font-bold text-[#271900]">{EDUCATION.institution}</div>
              <div className="font-mono text-xs font-semibold text-[#664800]">{EDUCATION.degree}</div>
              <div className="font-mono text-[11px] text-[#574d2d] mt-1">
                <strong>GPA:</strong> {EDUCATION.gpa} &bull; {EDUCATION.graduation}
              </div>
              <div className="font-mono text-[11px] text-[#271900] mt-2 pt-2 border-t border-[#403229]/40 italic">
                <strong>Thesis:</strong> {EDUCATION.thesis}
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-1.5 bg-[#403229] text-[#f4b41a] hover:bg-[#1c1109] font-pixel text-xs rounded border border-[#1c1109] flex items-center justify-center gap-1 font-bold"
              >
                <span>GITHUB</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-1.5 bg-[#403229] text-[#06b6d4] hover:bg-[#1c1109] font-pixel text-xs rounded border border-[#1c1109] flex items-center justify-center gap-1 font-bold"
              >
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* KEY PROJECTS ARCHIVE */}
      <div className="dialog-box bg-[#e9dab0] border-4 border-[#403229] mb-6 shadow-[4px_4px_0px_rgba(0,0,0,0.6)]">
        <h3 className="font-pixel text-base font-bold text-[#271900] uppercase mb-3 flex items-center gap-2 border-b-2 border-[#cdbe96] pb-2">
          <span className="material-symbols-outlined text-[#664800]">star</span>
          KEY PROJECTS & SYSTEM ACHIEVEMENTS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {keyProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#cdbe96] p-3 rounded-lg border-2 border-[#403229] flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="font-pixel text-[9px] bg-[#f4b41a] text-[#1c1109] px-1.5 py-0.5 rounded font-bold border border-[#1c1109]">
                    KEY PROJECT
                  </span>
                  <span className="font-pixel text-[9px] text-[#664800] font-bold">
                    ★ {proj.stats.stars}
                  </span>
                </div>

                <h4 className="font-pixel text-sm font-bold text-[#271900] mb-0.5 leading-tight">
                  {proj.title}
                </h4>
                <div className="font-mono text-[10px] text-[#664800] font-semibold mb-2">
                  Role: {proj.role}
                </div>
                <p className="font-mono text-xs text-[#271900] mb-3 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#403229]/30">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#403229] text-[#f6ded1] px-1.5 py-0.5 text-[9px] font-pixel rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience Quest Log */}
      <div className="dialog-box bg-[#e9dab0] border-4 border-[#403229] mb-6 shadow-[4px_4px_0px_rgba(0,0,0,0.6)]">
        <h3 className="font-pixel text-base font-bold text-[#271900] uppercase mb-3 flex items-center gap-2 border-b-2 border-[#cdbe96] pb-2">
          <span className="material-symbols-outlined text-[#664800]">work</span>
          WORK EXPERIENCE QUEST LOG
        </h3>

        <div className="space-y-4">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="bg-[#cdbe96] p-3 rounded border-2 border-[#403229]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <h4 className="font-pixel text-xs md:text-sm font-bold text-[#271900]">{exp.role}</h4>
                  <div className="font-mono text-xs font-semibold text-[#664800]">{exp.company} &bull; {exp.location}</div>
                </div>
                <span className="font-pixel text-[10px] bg-[#403229] text-[#f4b41a] px-2 py-0.5 rounded self-start sm:self-center border border-[#1c1109]">
                  {exp.period}
                </span>
              </div>
              <ul className="list-disc list-inside font-mono text-xs text-[#271900] space-y-1">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="leading-relaxed">{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Items */}
      <div className="bg-[#e9dab0] border-4 border-[#403229] p-4 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.6)] mb-6">
        <h3 className="font-pixel text-base font-bold text-[#271900] uppercase mb-3 flex items-center gap-2 border-b-2 border-[#cdbe96] pb-2">
          <span className="material-symbols-outlined text-[#664800]">inventory_2</span>
          EQUIPPED INVENTORY
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PLAYER_STATS_DATA.inventory.map((item) => (
            <div
              key={item.name}
              className="bg-[#cdbe96] p-2.5 rounded border-2 border-[#403229] flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-[#403229] text-[#f4b41a] rounded flex items-center justify-center border border-[#1c1109] shrink-0">
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-pixel text-xs font-bold text-[#271900] truncate">{item.name}</div>
                <div className="font-mono text-[11px] text-[#574d2d] truncate">{item.effect}</div>
              </div>
              <span className="bg-[#f4b41a] text-[#1c1109] text-[9px] font-pixel px-1.5 py-0.5 rounded uppercase font-bold border border-[#1c1109]">
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CV Download Transmission Box */}
      <div className="dialog-box bg-[#e9dab0] border-4 border-[#403229] mb-6 shadow-[4px_4px_0px_rgba(0,0,0,0.6)]">
        <h3 className="font-pixel text-base font-bold text-[#271900] uppercase mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#664800]">description</span>
          CURRICULUM VITAE (CV) TRANSMISSION
        </h3>
        <p className="font-mono text-xs text-[#574d2d] mb-4">
          Unduh dokumen kualifikasi & pengalaman kerja Farhan Triputra Ramadhan:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/cv/CV_Farhan_TP_Ramadhan_KeyProjects_First.pdf"
            download="CV_Farhan_TP_Ramadhan_Indonesia.pdf"
            onClick={handleCvDownload}
            className="flex items-center justify-between p-3 bg-[#403229] text-[#f6ded1] hover:bg-[#f4b41a] hover:text-[#1c1109] font-pixel text-xs rounded border-2 border-[#1c1109] transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.8)] group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🇮🇩</span>
              <span className="font-bold">VERSI INDONESIA</span>
            </div>
            <span className="material-symbols-outlined text-sm group-hover:translate-y-0.5 transition-transform">
              download
            </span>
          </a>

          <a
            href="/cv/CV_Farhan_TP_Ramadhan_English_Version.pdf"
            download="CV_Farhan_TP_Ramadhan_English.pdf"
            onClick={handleCvDownload}
            className="flex items-center justify-between p-3 bg-[#403229] text-[#f6ded1] hover:bg-[#f4b41a] hover:text-[#1c1109] font-pixel text-xs rounded border-2 border-[#1c1109] transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.8)] group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🇬🇧</span>
              <span className="font-bold">ENGLISH VERSION</span>
            </div>
            <span className="material-symbols-outlined text-sm group-hover:translate-y-0.5 transition-transform">
              download
            </span>
          </a>
        </div>
      </div>

      {/* Terminal Contact Form */}
      <div className="dialog-box bg-[#2a1d15] text-[#f6ded1] border-4 border-[#403229] mb-6">
        <h3 className="font-pixel text-base font-bold text-[#f4b41a] uppercase mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">terminal</span>
          COMMUNICATIONS_TERMINAL
        </h3>
        <p className="font-mono text-xs text-[#d4c4ac] mb-3">
          Send a direct transmission packet to Farhan Triputra Ramadhan ({PERSONAL_INFO.email}):
        </p>

        {sent ? (
          <div className="p-3 bg-[#f4b41a] text-[#1c1109] font-pixel text-xs font-bold rounded text-center border-2 border-[#1c1109]">
            ✓ TRANSMISSION RECEIVED! FARHAN TRIPUTRA WILL RESPOND SHORTLY.
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="space-y-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message, project query, or job offer..."
              rows={3}
              className="w-full bg-[#170c05] text-[#f6ded1] border-2 border-[#504533] rounded p-2.5 font-mono text-xs focus:outline-none focus:border-[#f4b41a] resize-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#f4b41a] text-[#1c1109] font-pixel font-bold text-xs rounded border-2 border-[#1c1109] hover:bg-[#ffd587] shadow-[2px_2px_0px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              TRANSMIT PACKET
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
