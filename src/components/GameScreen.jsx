import React, { useEffect, useRef, useState } from 'react';
import { audioEngine } from '../utils/audio';

export const GameScreen = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('32bit_high_score') || '1200', 10);
  });
  const [gameState, setGameState] = useState('PLAYING');

  // Game variables stored in refs for animation loop
  const playerRef = useRef({
    x: 50,
    y: 180,
    width: 24,
    height: 32,
    velocityY: 0,
    isGrounded: true,
  });

  const keysRef = useRef({ left: false, right: false, jump: false });
  const obstaclesRef = useRef([]);
  const gemsRef = useRef([]);
  const frameCountRef = useRef(0);
  const scoreRef = useRef(0);

  const handleJump = () => {
    const p = playerRef.current;
    if (p.isGrounded && gameState === 'PLAYING') {
      p.velocityY = -10.5;
      p.isGrounded = false;
      audioEngine.playJump();
    }
  };

  const restartGame = () => {
    playerRef.current = {
      x: 50,
      y: 180,
      width: 24,
      height: 32,
      velocityY: 0,
      isGrounded: true,
    };
    obstaclesRef.current = [];
    gemsRef.current = [];
    scoreRef.current = 0;
    setScore(0);
    setGameState('PLAYING');
    audioEngine.playConfirm();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      } else if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'W' || e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        handleJump();
      } else if (e.key === 'Escape' || e.key === 'x' || e.key === 'X') {
        onBack();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    const groundY = 210;

    const gameLoop = () => {
      frameCountRef.current++;

      // Clear Screen
      ctx.fillStyle = '#1c1109';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Retro Grid Background
      ctx.strokeStyle = '#2a1d15';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Brick Ground
      ctx.fillStyle = '#403229';
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      ctx.fillStyle = '#f4b41a';
      ctx.fillRect(0, groundY, canvas.width, 4);

      if (gameState === 'PLAYING') {
        scoreRef.current += 1;
        setScore(scoreRef.current);

        // Update High score
        if (scoreRef.current > highScore) {
          setHighScore(scoreRef.current);
          localStorage.setItem('32bit_high_score', scoreRef.current.toString());
        }

        // Spawn Obstacles (Bugs)
        if (frameCountRef.current % 110 === 0) {
          obstaclesRef.current.push({
            x: canvas.width + 20,
            y: groundY - 22,
            width: 22,
            height: 22,
            type: 'BUG.EXE',
          });
        }

        // Spawn Code Gems
        if (frameCountRef.current % 140 === 0) {
          const gems = ['REACT', 'TS', 'AI', 'VITE'];
          gemsRef.current.push({
            x: canvas.width + 30,
            y: groundY - 60 - Math.random() * 40,
            width: 18,
            height: 18,
            label: gems[Math.floor(Math.random() * gems.length)],
            collected: false,
          });
        }

        // Move Player
        const p = playerRef.current;
        if (keysRef.current.left && p.x > 10) p.x -= 3.5;
        if (keysRef.current.right && p.x < canvas.width - 35) p.x += 3.5;

        // Apply Gravity
        p.velocityY += 0.55;
        p.y += p.velocityY;

        if (p.y >= groundY - p.height) {
          p.y = groundY - p.height;
          p.velocityY = 0;
          p.isGrounded = true;
        }

        // Move and draw Obstacles
        obstaclesRef.current.forEach((obs) => {
          obs.x -= 3.2;

          // Draw Bug Sprite
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#ffffff';
          ctx.font = '8px Space Mono';
          ctx.fillText('BUG', obs.x + 2, obs.y + 14);

          // Collision Check
          if (
            p.x < obs.x + obs.width &&
            p.x + p.width > obs.x &&
            p.y < obs.y + obs.height &&
            p.y + p.height > obs.y
          ) {
            audioEngine.playHit();
            setGameState('GAMEOVER');
          }
        });

        // Move and draw Gems
        gemsRef.current.forEach((gem) => {
          if (!gem.collected) {
            gem.x -= 2.8;

            ctx.fillStyle = '#f4b41a';
            ctx.fillRect(gem.x, gem.y, gem.width, gem.height);
            ctx.fillStyle = '#1c1109';
            ctx.font = 'bold 8px Space Mono';
            ctx.fillText(gem.label.substring(0, 2), gem.x + 2, gem.y + 12);

            // Gem Collision
            if (
              p.x < gem.x + gem.width &&
              p.x + p.width > gem.x &&
              p.y < gem.y + gem.height &&
              p.y + p.height > gem.y
            ) {
              gem.collected = true;
              scoreRef.current += 150;
              audioEngine.playCoin();
            }
          }
        });

        // Clean off-screen objects
        obstaclesRef.current = obstaclesRef.current.filter((o) => o.x > -40);
        gemsRef.current = gemsRef.current.filter((g) => g.x > -40);
      }

      // Draw Player 1 Sprite
      const p = playerRef.current;
      ctx.fillStyle = '#f4b41a';
      ctx.fillRect(p.x, p.y, p.width, p.height);

      // Player Visor
      ctx.fillStyle = '#1c1109';
      ctx.fillRect(p.x + 4, p.y + 6, p.width - 8, 8);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(p.x + 6, p.y + 8, 6, 4);

      // Draw Game Overlay / Gameover Screen
      if (gameState === 'GAMEOVER') {
        ctx.fillStyle = 'rgba(28, 17, 9, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 20px Space Mono';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, 90);

        ctx.fillStyle = '#f6ded1';
        ctx.font = '12px Space Mono';
        ctx.fillText(`SCORE: ${scoreRef.current}`, canvas.width / 2, 125);
        ctx.fillText(`HIGH SCORE: ${highScore}`, canvas.width / 2, 145);

        ctx.fillStyle = '#f4b41a';
        ctx.font = 'bold 11px Space Mono';
        ctx.fillText('PRESS [A] OR CLICK RESTART', canvas.width / 2, 185);
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationId);
  }, [gameState, highScore]);

  return (
    <div className="flex flex-col h-full w-full p-4 items-center justify-between relative z-10 text-[#f6ded1]">
      {/* Game Header Bar */}
      <div className="w-full dialog-box bg-[#2a1d15] text-[#f6ded1] border-4 border-[#403229] flex items-center justify-between p-2.5 mb-2 font-pixel text-xs">
        <div>
          <span className="text-[#f4b41a] font-bold">32-BIT QUEST</span>
          <span className="ml-3 text-[#d4c4ac]">SCORE: {score}</span>
        </div>
        <div>
          <span className="text-[#ffd587]">HI: {highScore}</span>
        </div>
        <button
          onClick={() => {
            audioEngine.playCancel();
            onBack();
          }}
          className="px-2 py-0.5 bg-[#403229] hover:bg-[#f4b41a] hover:text-[#1c1109] font-pixel text-[10px] rounded border border-[#1c1109]"
        >
          [B] EXIT
        </button>
      </div>

      {/* Canvas Display */}
      <div className="relative w-full max-w-md aspect-[4/3] border-4 border-[#403229] rounded-lg overflow-hidden bg-[#1c1109] shadow-[6px_6px_0px_rgba(0,0,0,0.8)]">
        <canvas
          ref={canvasRef}
          width={400}
          height={250}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Touch / Click Controls for Mini Game */}
      <div className="w-full max-w-md mt-3 flex items-center justify-between gap-4 font-pixel text-xs">
        <button
          onClick={handleJump}
          className="flex-1 py-2 bg-[#f4b41a] text-[#1c1109] font-bold rounded border-2 border-[#1c1109] shadow-[2px_2px_0px_rgba(0,0,0,0.8)] active:translate-y-0.5"
        >
          JUMP / ACTION [A]
        </button>

        {gameState === 'GAMEOVER' && (
          <button
            onClick={restartGame}
            className="flex-1 py-2 bg-[#06b6d4] text-[#1c1109] font-bold rounded border-2 border-[#1c1109] shadow-[2px_2px_0px_rgba(0,0,0,0.8)] active:translate-y-0.5"
          >
            RESTART GAME
          </button>
        )}
      </div>
    </div>
  );
};
