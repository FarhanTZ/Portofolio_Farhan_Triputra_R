import React, { useEffect, useState } from 'react';
import { BootMenu } from './BootMenu';
import { ProjectsScreen } from './ProjectsScreen';
import { SkillsScreen } from './SkillsScreen';
import { ProfileScreen } from './ProfileScreen';
import { CustomizeScreen } from './CustomizeScreen';
import { GameScreen } from './GameScreen';
import { SCREEN_BACKGROUND_URL } from '../data/portfolioData';
import { audioEngine } from '../utils/audio';

export const ConsoleShell = () => {
  const [activeMenu, setActiveMenu] = useState('start-game');
  const [currentScreen, setCurrentScreen] = useState('BOOT');
  const [isZoomed, setIsZoomed] = useState(false);
  const [powerOn, setPowerOn] = useState(true);
  const [isOpening, setIsOpening] = useState(true);
  const [openingKey, setOpeningKey] = useState(0);

  const handleTriggerOpening = () => {
    setIsOpening(true);
    setOpeningKey((prev) => prev + 1);
    if (audioEngine.playPowerOn) audioEngine.playPowerOn();
    setTimeout(() => {
      setIsOpening(false);
    }, 1400);
  };

  useEffect(() => {
    handleTriggerOpening();
  }, []);

  const [settings, setSettings] = useState({
    crtOverlay: true,
    soundEnabled: true,
    volume: 0.3,
    shellColor: 'yellow',
  });

  const [activeDPadDirection, setActiveDPadDirection] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Keyboard navigation for hardware buttons
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        setActiveDPadDirection('up');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        setActiveDPadDirection('down');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setActiveDPadDirection('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setActiveDPadDirection('right');
      } else if (e.key === 'z' || e.key === 'Z' || e.key === 'Enter') {
        setActiveButton('A');
      } else if (e.key === 'x' || e.key === 'X' || e.key === 'Escape') {
        setActiveButton('B');
      } else if (e.key === 'q' || e.key === 'Q') {
        setActiveButton('L');
        audioEngine.playBlip();
      } else if (e.key === 'e' || e.key === 'E') {
        setActiveButton('R');
        audioEngine.playBlip();
      }
    };

    const handleKeyUp = () => {
      setActiveDPadDirection(null);
      setActiveButton(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Map shell color theme to CSS background color
  const shellBgColors = {
    yellow: '#f4b41a',
    purple: '#8b5cf6',
    gray: '#9ca3af',
    teal: '#06b6d4',
    red: '#ef4444',
  };

  const handleSelectMenuOption = (option) => {
    setCurrentScreen(option);
  };

  const handlePowerToggle = () => {
    if (!powerOn) {
      setPowerOn(true);
      if (settings.soundEnabled) audioEngine.playPowerOn();
    } else {
      setPowerOn(false);
      audioEngine.playCancel();
    }
  };

  const handleDPadPress = (dir) => {
    setActiveDPadDirection(dir);
    const keyMap = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    };
    if (keyMap[dir]) {
      const evt = new KeyboardEvent('keydown', { key: keyMap[dir] });
      window.dispatchEvent(evt);
    }
    setTimeout(() => setActiveDPadDirection(null), 150);
  };

  const handleButtonAPress = () => {
    setActiveButton('A');
    audioEngine.playConfirm();
    if (currentScreen === 'BOOT') {
      setCurrentScreen(activeMenu);
    }
    setTimeout(() => setActiveButton(null), 150);
  };

  const handleButtonBPress = () => {
    setActiveButton('B');
    audioEngine.playCancel();
    if (currentScreen !== 'BOOT') {
      setCurrentScreen('BOOT');
    }
    setTimeout(() => setActiveButton(null), 150);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 font-pixel relative select-none">
      {/* GameBoy Split Opening Animation Doors Overlay */}
      {isOpening && (
        <div
          key={openingKey}
          className="fixed inset-0 z-[100] overflow-hidden pointer-events-none flex"
        >
          {/* Left Door Panel */}
          <div className="w-1/2 h-full bg-[#f4b41a] border-r-8 border-[#403229] animate-open-left flex flex-col justify-between p-6 md:p-12 shadow-2xl relative">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-600 animate-pulse-glow border border-[#1c1109]" />
              <span className="font-pixel text-xs md:text-sm font-bold text-[#1c1109] uppercase tracking-widest">
                GAME BOY COLOR
              </span>
            </div>

            <div className="flex flex-col items-center justify-center my-auto">
              <div className="w-24 h-24 md:w-36 md:h-36 bg-[#403229] rounded-2xl border-4 border-[#1c1109] flex items-center justify-center shadow-lg mb-4">
                <span className="material-symbols-outlined text-4xl md:text-6xl text-[#f4b41a]">
                  sports_esports
                </span>
              </div>
              <span className="font-pixel text-sm md:text-lg font-bold text-[#1c1109] tracking-widest text-center">
                FARHAN TRIPUTRA
              </span>
              <span className="font-mono text-[10px] md:text-xs text-[#574d2d] mt-1 font-semibold">
                SYSTEM OPENING...
              </span>
            </div>

            <div className="font-pixel text-[10px] md:text-xs text-[#574d2d] uppercase">
              LEFT CHASSIS &bull; REV 2026
            </div>
          </div>

          {/* Right Door Panel */}
          <div className="w-1/2 h-full bg-[#f4b41a] border-l-8 border-[#403229] animate-open-right flex flex-col justify-between p-6 md:p-12 shadow-2xl relative">
            <div className="flex justify-end items-center gap-2">
              <span className="font-pixel text-xs md:text-sm font-bold text-[#1c1109] uppercase tracking-widest">
                32-BIT SYSTEM
              </span>
            </div>

            <div className="flex flex-col items-center justify-center my-auto">
              <div className="w-24 h-24 md:w-36 md:h-36 bg-[#403229] rounded-2xl border-4 border-[#1c1109] flex items-center justify-center shadow-lg mb-4">
                <div className="flex gap-2">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-[#93000a] rounded-full border-2 border-[#1c1109] font-pixel text-xs md:text-sm font-bold text-white flex items-center justify-center">
                    B
                  </div>
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-[#93000a] rounded-full border-2 border-[#1c1109] font-pixel text-xs md:text-sm font-bold text-white flex items-center justify-center">
                    A
                  </div>
                </div>
              </div>
              <span className="font-pixel text-sm md:text-lg font-bold text-[#1c1109] tracking-widest text-center">
                PORTFOLIO EDITION
              </span>
              <span className="font-mono text-[10px] md:text-xs text-[#574d2d] mt-1 font-semibold">
                READY PLAYER ONE
              </span>
            </div>

            <div className="font-pixel text-[10px] md:text-xs text-[#574d2d] uppercase text-right">
              RIGHT CHASSIS &bull; READY
            </div>
          </div>
        </div>
      )}

      {/* Top Header Floating Actions */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <button
          onClick={handleTriggerOpening}
          className="text-[10px] font-pixel text-[#f6ded1] hover:text-[#f4b41a] uppercase tracking-widest bg-[#251911]/90 backdrop-blur-xs px-3 py-2 border border-[#9d8f79] hover:border-[#f4b41a] transition-all rounded-md shadow-lg flex items-center gap-1.5 cursor-pointer"
          title="Replay GameBoy Split Opening Animation"
        >
          <span className="material-symbols-outlined text-sm">replay</span>
          <span>RE-OPEN CONSOLE</span>
        </button>

        <button
          onClick={() => {
            setIsZoomed((prev) => !prev);
            audioEngine.playConfirm();
          }}
          className="text-[10px] font-pixel text-[#f6ded1] hover:text-[#f4b41a] uppercase tracking-widest bg-[#251911]/90 backdrop-blur-xs px-3 py-2 border border-[#9d8f79] hover:border-[#f4b41a] transition-all rounded-md shadow-lg flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">
            {isZoomed ? 'fullscreen_exit' : 'open_in_full'}
          </span>
          <span>{isZoomed ? 'CONSOLE VIEW' : 'SKIP TO STANDARD'}</span>
        </button>
      </div>

      {/* Main Console Shell Body */}
      <div
        id="console-shell"
        className={`console-shell-border w-full max-w-[390px] md:max-w-6xl min-h-[660px] md:min-h-0 md:h-auto md:aspect-[21/9] flex flex-col md:flex-row items-center justify-between p-3 sm:p-5 md:p-10 relative z-10 zoom-transition ${
          isZoomed ? 'zoom-active' : ''
        } ${isOpening ? 'animate-console-entrance' : ''}`}
        style={{
          backgroundColor: shellBgColors[settings.shellColor] || '#f4b41a',
        }}
      >
        {/* Shoulder Bumpers (Desktop View) */}
        <div
          id="shoulder-bumpers"
          className="absolute -top-[34px] left-12 right-12 h-[36px] z-[0] justify-between items-end transition-all duration-300 hidden md:flex pointer-events-auto"
        >
          <button
            onClick={() => {
              setActiveButton('L');
              audioEngine.playBlip();
              setTimeout(() => setActiveButton(null), 150);
            }}
            className={`w-44 h-[32px] bg-[#403229] border-t-4 border-l-4 border-r-4 border-[#9d8f79] rounded-t-2xl shadow-[inset_4px_4px_6px_rgba(255,255,255,0.15)] flex items-center justify-center font-pixel text-[#d4c4ac] text-xs pt-1 transition-all ${
              activeButton === 'L' ? 'h-[28px] translate-y-[4px] bg-[#2a1d15]' : ''
            }`}
          >
            L [Q]
          </button>

          <div className="w-1/3 h-[24px] bg-[#9d8f79] rounded-t-lg border-t-4 border-[#403229] shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] flex items-end justify-center pb-1">
            <div className="w-3/4 h-2 bg-[#170c05] rounded-full opacity-60" />
          </div>

          <button
            onClick={() => {
              setActiveButton('R');
              audioEngine.playBlip();
              setTimeout(() => setActiveButton(null), 150);
            }}
            className={`w-44 h-[32px] bg-[#403229] border-t-4 border-l-4 border-r-4 border-[#9d8f79] rounded-t-2xl shadow-[inset_4px_4px_6px_rgba(255,255,255,0.15)] flex items-center justify-center font-pixel text-[#d4c4ac] text-xs pt-1 transition-all ${
              activeButton === 'R' ? 'h-[28px] translate-y-[4px] bg-[#2a1d15]' : ''
            }`}
          >
            R [E]
          </button>
        </div>

        {/* Left Physical Controls (Desktop Only) */}
        <div className="console-controls hidden md:flex flex-col items-center justify-center w-60 h-full relative">
          <div className="relative w-40 h-40 mt-[-8%] flex items-center justify-center">
            <div className="d-pad-housing">
              <div className="d-pad-base">
                <button
                  onClick={() => handleDPadPress('up')}
                  className={`d-pad-button d-pad-up button-press ${
                    activeDPadDirection === 'up' ? 'active' : ''
                  }`}
                >
                  <div className="d-pad-arrow" />
                </button>
                <button
                  onClick={() => handleDPadPress('down')}
                  className={`d-pad-button d-pad-down button-press ${
                    activeDPadDirection === 'down' ? 'active' : ''
                  }`}
                >
                  <div className="d-pad-arrow" />
                </button>
                <button
                  onClick={() => handleDPadPress('left')}
                  className={`d-pad-button d-pad-left button-press ${
                    activeDPadDirection === 'left' ? 'active' : ''
                  }`}
                >
                  <div className="d-pad-arrow" />
                </button>
                <button
                  onClick={() => handleDPadPress('right')}
                  className={`d-pad-button d-pad-right button-press ${
                    activeDPadDirection === 'right' ? 'active' : ''
                  }`}
                >
                  <div className="d-pad-arrow" />
                </button>
                <div className="d-pad-button d-pad-center" />
              </div>
            </div>
          </div>

          <div className="flex gap-6 mt-14 absolute bottom-10 left-1/2 -translate-x-1/2">
            <button
              onClick={() => {
                audioEngine.playBlip();
                setCurrentScreen('BOOT');
              }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-14 h-5 bg-[#403229] rounded-full border-2 border-[#9d8f79] transform -rotate-12 group-active:translate-y-0.5 transition-transform shadow-inner" />
              <span className="mt-2.5 font-pixel text-[#664800] font-bold uppercase text-[10px] tracking-wider">
                Select
              </span>
            </button>

            <button
              onClick={() => {
                audioEngine.playConfirm();
                setCurrentScreen(activeMenu);
              }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-14 h-5 bg-[#403229] rounded-full border-2 border-[#9d8f79] transform -rotate-12 group-active:translate-y-0.5 transition-transform shadow-inner" />
              <span className="mt-2.5 font-pixel text-[#664800] font-bold uppercase text-[10px] tracking-wider">
                Start
              </span>
            </button>
          </div>
        </div>

        {/* Display Screen Frame & Glass */}
        <div
          id="inner-screen"
          className="screen-bezel w-full md:flex-1 h-[330px] sm:h-[360px] md:h-full flex flex-col relative zoom-transition bg-[#fdbb24] mx-0 md:mx-4 overflow-hidden rounded-[28px] md:rounded-[36px]"
        >
          {/* Display Glass */}
          <div
            className={`screen-glass w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden flex flex-col relative ${
              settings.crtOverlay ? 'crt-on' : ''
            }`}
            style={{
              backgroundColor: powerOn ? '#1c1109' : '#0e0804',
            }}
          >
            {/* Animated Retro Cat Background Layer */}
            {powerOn && (
              <div
                className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none animate-cat-bg"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("${SCREEN_BACKGROUND_URL}")`,
                }}
              />
            )}
            {!powerOn ? (
              <div className="flex flex-col items-center justify-center h-full text-[#504533] font-pixel text-xs">
                <span>SYSTEM POWER OFF</span>
                <button
                  onClick={handlePowerToggle}
                  className="mt-3 px-3 py-1 bg-[#f4b41a] text-[#1c1109] rounded border border-[#1c1109] font-bold cursor-pointer"
                >
                  POWER ON
                </button>
              </div>
            ) : (
              <>
                {currentScreen === 'BOOT' && (
                  <BootMenu
                    onSelectOption={handleSelectMenuOption}
                    activeOption={activeMenu}
                    setActiveOption={setActiveMenu}
                  />
                )}

                {currentScreen === 'start-game' && (
                  <GameScreen onBack={() => setCurrentScreen('BOOT')} />
                )}

                {currentScreen === 'projects' && (
                  <ProjectsScreen onBack={() => setCurrentScreen('BOOT')} />
                )}

                {currentScreen === 'skills' && (
                  <SkillsScreen onBack={() => setCurrentScreen('BOOT')} />
                )}

                {currentScreen === 'profile' && (
                  <ProfileScreen isZoomed={isZoomed} onBack={() => setCurrentScreen('BOOT')} />
                )}

                {currentScreen === 'customize' && (
                  <CustomizeScreen
                    settings={settings}
                    onUpdateSettings={updateSettings}
                    onBack={() => setCurrentScreen('BOOT')}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Retro Brand Text Under Screen (Mobile Only) */}
        <div className="block md:hidden font-pixel text-[13px] font-bold text-[#664800] tracking-[0.25em] uppercase mt-2 mb-1 opacity-80 text-center">
          FARHAN TRIPUTRA RAMADHAN
        </div>

        {/* Horizontal Seam Divider Line (Mobile Only) */}
        <div className="w-full h-[2px] bg-[#d4c4ac] border-b border-[#504533]/30 my-2 shadow-inner block md:hidden" />

        {/* Mobile Vertical Controller Section */}
        <div className="w-full flex md:hidden flex-col items-center justify-between pt-1">
          {/* Power Indicator */}
          <div className="w-full flex justify-end items-center gap-1.5 px-3 mb-1">
            <span className="font-pixel text-[8px] text-[#333] tracking-widest uppercase font-bold">
              POWER
            </span>
            <div
              className={`w-2 h-2 rounded-full ${
                powerOn
                  ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]'
                  : 'bg-red-950 opacity-40'
              }`}
            />
          </div>

          {/* D-Pad & A/B Buttons Row */}
          <div className="w-full flex items-center justify-between px-2 my-1">
            {/* Left D-Pad */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="d-pad-housing scale-90">
                <div className="d-pad-base">
                  <button
                    onClick={() => handleDPadPress('up')}
                    className={`d-pad-button d-pad-up button-press ${
                      activeDPadDirection === 'up' ? 'active' : ''
                    }`}
                  >
                    <div className="d-pad-arrow" />
                  </button>
                  <button
                    onClick={() => handleDPadPress('down')}
                    className={`d-pad-button d-pad-down button-press ${
                      activeDPadDirection === 'down' ? 'active' : ''
                    }`}
                  >
                    <div className="d-pad-arrow" />
                  </button>
                  <button
                    onClick={() => handleDPadPress('left')}
                    className={`d-pad-button d-pad-left button-press ${
                      activeDPadDirection === 'left' ? 'active' : ''
                    }`}
                  >
                    <div className="d-pad-arrow" />
                  </button>
                  <button
                    onClick={() => handleDPadPress('right')}
                    className={`d-pad-button d-pad-right button-press ${
                      activeDPadDirection === 'right' ? 'active' : ''
                    }`}
                  >
                    <div className="d-pad-arrow" />
                  </button>
                  <div className="d-pad-button d-pad-center" />
                </div>
              </div>
            </div>

            {/* Right Action Buttons (B & A) */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="action-housing scale-95 transform -rotate-12">
                <button
                  onClick={handleButtonBPress}
                  className={`absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 action-btn button-press flex items-center justify-center font-pixel text-lg font-bold ${
                    activeButton === 'B' ? 'active' : ''
                  }`}
                >
                  B
                </button>
                <button
                  onClick={handleButtonAPress}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 action-btn button-press flex items-center justify-center font-pixel text-lg font-bold ${
                    activeButton === 'A' ? 'active' : ''
                  }`}
                >
                  A
                </button>
              </div>
            </div>
          </div>

          {/* Speaker Dot Matrix Grill */}
          <div className="grid grid-cols-3 gap-1.5 justify-center my-2 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1109] shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1109] shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1109] shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1109] shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1109] shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1109] shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1109] shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1109] shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1109] shadow-inner" />
          </div>

          {/* SELECT / START Buttons */}
          <div className="flex gap-8 justify-center items-center mt-1">
            <button
              onClick={() => {
                audioEngine.playBlip();
                setCurrentScreen('BOOT');
              }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-10 h-3.5 bg-[#403229] rounded-full border border-[#9d8f79] transform -rotate-12 group-active:translate-y-0.5 transition-transform shadow-inner" />
              <span className="mt-1 font-pixel text-[#664800] font-bold uppercase text-[9px] tracking-wider">
                Select
              </span>
            </button>

            <button
              onClick={() => {
                audioEngine.playConfirm();
                setCurrentScreen(activeMenu);
              }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-10 h-3.5 bg-[#403229] rounded-full border border-[#9d8f79] transform -rotate-12 group-active:translate-y-0.5 transition-transform shadow-inner" />
              <span className="mt-1 font-pixel text-[#664800] font-bold uppercase text-[9px] tracking-wider">
                Start
              </span>
            </button>
          </div>
        </div>

        {/* Right Physical Controls (Desktop Only) */}
        <div className="console-controls hidden md:flex flex-col items-center justify-center w-60 h-full relative">
          <div className="absolute top-12 left-6 flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  powerOn
                    ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]'
                    : 'bg-red-950 opacity-40'
                }`}
              />
              <button
                onClick={handlePowerToggle}
                className="w-4 h-4 rounded-full bg-[#9d8f79] border border-[#333] shadow-[inset_-1px_-1px_0px_rgba(0,0,0,0.5)] active:scale-90 transition-transform cursor-pointer"
                title="Power Switch"
              />
            </div>
            <span className="font-pixel text-[8px] text-[#333] tracking-wider uppercase ml-3 font-bold">
              POWER
            </span>
          </div>

          <div className="w-40 h-40 relative flex items-center justify-center mt-[-8%]">
            <div className="action-housing transform -rotate-12">
              <button
                onClick={handleButtonBPress}
                className={`absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 action-btn button-press flex items-center justify-center font-pixel text-xl font-bold ${
                  activeButton === 'B' ? 'active' : ''
                }`}
              >
                B
              </button>
              <button
                onClick={handleButtonAPress}
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 action-btn button-press flex items-center justify-center font-pixel text-xl font-bold ${
                  activeButton === 'A' ? 'active' : ''
                }`}
              >
                A
              </button>
            </div>
          </div>

          <div className="absolute bottom-12 right-6 flex flex-col gap-2 transform -rotate-12">
            <div className="w-16 h-1.5 rounded-full bg-[#111] opacity-60 shadow-inner" />
            <div className="w-16 h-1.5 rounded-full bg-[#111] opacity-60 shadow-inner" />
            <div className="w-16 h-1.5 rounded-full bg-[#111] opacity-60 shadow-inner" />
            <div className="w-16 h-1.5 rounded-full bg-[#111] opacity-60 shadow-inner" />
            <div className="w-16 h-1.5 rounded-full bg-[#111] opacity-60 shadow-inner" />
          </div>
        </div>

        {/* Console Screws */}
        <div className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full bg-[#9d8f79] shadow-inner flex items-center justify-center opacity-80 pointer-events-none">
          <span className="material-symbols-outlined text-[9px] font-bold text-[#333]">add</span>
        </div>
        <div className="absolute top-3 right-3 w-3.5 h-3.5 rounded-full bg-[#9d8f79] shadow-inner flex items-center justify-center opacity-80 pointer-events-none">
          <span className="material-symbols-outlined text-[9px] font-bold text-[#333]">add</span>
        </div>
        <div className="absolute bottom-3 left-3 w-3.5 h-3.5 rounded-full bg-[#9d8f79] shadow-inner flex items-center justify-center opacity-80 pointer-events-none">
          <span className="material-symbols-outlined text-[9px] font-bold text-[#333]">add</span>
        </div>
        <div className="absolute bottom-3 right-3 w-3.5 h-3.5 rounded-full bg-[#9d8f79] shadow-inner flex items-center justify-center opacity-80 pointer-events-none">
          <span className="material-symbols-outlined text-[9px] font-bold text-[#333]">add</span>
        </div>
      </div>

      {/* Floating FAB B Button in Fullscreen Mode */}
      {isZoomed && (
        <button
          onClick={() => {
            setIsZoomed(false);
            audioEngine.playCancel();
          }}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#93000a] text-[#ffdad6] border-4 border-[#1c1109] rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center font-pixel text-xl font-bold active:translate-y-1 active:shadow-none transition-all z-[10001] cursor-pointer"
          title="Exit Fullscreen View [B]"
        >
          B
        </button>
      )}
    </div>
  );
};
