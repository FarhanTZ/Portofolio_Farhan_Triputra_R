import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { audioEngine } from '../utils/audio';

export const ProjectsScreen = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTag, setSelectedTag] = useState('ALL');

  const allTags = ['ALL', ...Array.from(new Set(PROJECTS_DATA.flatMap((p) => p.tags)))];

  const filteredProjects =
    selectedTag === 'ALL'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.tags.includes(selectedTag));

  return (
    <div className="flex flex-col h-full w-full p-4 md:p-6 overflow-y-auto custom-retro-scroll relative z-10 text-[#1c1109]">
      {/* Header Bar */}
      <div className="dialog-box mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#664800]">folder_open</span>
            <h2 className="font-pixel text-xl md:text-2xl font-bold uppercase text-[#271900] tracking-tight">
              PROJECTS_DB
            </h2>
          </div>
          <p className="font-mono text-xs text-[#574d2d] mt-0.5">
            DATABASE RECORDS: {PROJECTS_DATA.length} SYSTEM MODULES
          </p>
        </div>

        {/* Back Button */}
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

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              audioEngine.playBlip();
              setSelectedTag(tag);
            }}
            className={`px-2.5 py-1 font-pixel text-xs rounded border transition-all ${
              selectedTag === tag
                ? 'bg-[#f4b41a] text-[#1c1109] font-bold border-[#1c1109] shadow-[2px_2px_0px_rgba(0,0,0,0.8)]'
                : 'bg-[#2a1d15] text-[#d4c4ac] border-[#504533] hover:border-[#f4b41a]'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              audioEngine.playConfirm();
              setSelectedProject(project);
            }}
            className="group cursor-pointer bg-[#e9dab0] border-4 border-[#403229] p-3 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.6)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.8)] hover:scale-[1.01] transition-all flex flex-col justify-between"
          >
            <div>
              {/* Project Hotlinked Pixel Thumbnail */}
              <div className="relative w-full h-40 md:h-44 mb-3 border-2 border-[#403229] rounded overflow-hidden bg-[#1c1109]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 bg-[#1c1109]/90 text-[#f4b41a] px-2 py-0.5 rounded text-[10px] font-pixel border border-[#f4b41a]">
                  STARS: {project.stats.stars} ★
                </div>
              </div>

              <h3 className="font-pixel text-lg font-bold text-[#271900] uppercase tracking-tight mb-1 group-hover:text-[#664800]">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-[#383012] mb-3 line-clamp-2">
                {project.description}
              </p>
            </div>

            <div className="pt-2 border-t-2 border-[#cdbe96] flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#403229] text-[#f6ded1] px-1.5 py-0.5 text-[10px] font-pixel rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="font-pixel text-[11px] font-bold text-[#664800] group-hover:underline flex items-center gap-0.5">
                DETAILS <span className="material-symbols-outlined text-sm">chevron_right</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#1c1109]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="dialog-box max-w-xl w-full bg-[#f1e2b7] max-h-[90vh] overflow-y-auto custom-retro-scroll text-[#1c1109] border-8 border-[#403229] rounded-xl shadow-[8px_8px_0px_rgba(0,0,0,0.9)]">
            <div className="flex justify-between items-start mb-4 border-b-4 border-[#403229] pb-3">
              <div>
                <span className="bg-[#f4b41a] text-[#1c1109] px-2 py-0.5 text-[10px] font-pixel font-bold uppercase border border-[#1c1109] rounded">
                  MODULE ID: {selectedProject.id.toUpperCase()}
                </span>
                <h3 className="font-pixel text-xl md:text-2xl font-bold uppercase text-[#271900] mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  audioEngine.playCancel();
                  setSelectedProject(null);
                }}
                className="w-8 h-8 bg-[#93000a] text-[#ffdad6] font-pixel font-bold rounded border-2 border-[#1c1109] flex items-center justify-center hover:bg-[#ff897d]"
              >
                X
              </button>
            </div>

            <div className="w-full h-48 md:h-56 mb-4 border-4 border-[#403229] rounded overflow-hidden bg-[#1c1109]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 bg-[#cdbe96] p-2.5 rounded border-2 border-[#403229] text-center font-pixel text-xs">
              <div>
                <div className="text-[10px] text-[#574d2d]">STARS</div>
                <div className="font-bold text-[#271900]">{selectedProject.stats.stars} ★</div>
              </div>
              <div>
                <div className="text-[10px] text-[#574d2d]">COMMITS</div>
                <div className="font-bold text-[#271900]">{selectedProject.stats.commits}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#574d2d]">COMPLEXITY</div>
                <div className="font-bold text-[#664800]">{selectedProject.stats.complexity}</div>
              </div>
            </div>

            <p className="font-mono text-xs md:text-sm text-[#271900] mb-4 leading-relaxed bg-[#e9dab0] p-3 rounded border-2 border-[#403229]">
              {selectedProject.fullDetails}
            </p>

            <div className="mb-4">
              <div className="font-pixel text-xs font-bold text-[#574d2d] mb-1.5 uppercase">
                TECH STACK ARCHITECTURE:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#403229] text-[#f4b41a] px-2 py-1 text-xs font-pixel rounded border border-[#1c1109]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t-4 border-[#403229]">
              <button
                onClick={() => {
                  audioEngine.playConfirm();
                  alert(`Simulation launched for ${selectedProject.title}!`);
                }}
                className="flex-1 py-2 bg-[#f4b41a] text-[#1c1109] font-pixel font-bold text-xs rounded border-2 border-[#1c1109] shadow-[2px_2px_0px_rgba(0,0,0,0.8)] hover:bg-[#ffd587]"
              >
                RUN SIMULATION
              </button>
              <button
                onClick={() => {
                  audioEngine.playCancel();
                  setSelectedProject(null);
                }}
                className="px-4 py-2 bg-[#403229] text-[#f6ded1] font-pixel font-bold text-xs rounded border-2 border-[#1c1109]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
