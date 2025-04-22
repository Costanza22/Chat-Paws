import React, { useState, useEffect } from 'react';
import './MazeGame.css';

const MazeGame = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [ghosts, setGhosts] = useState([
    { x: 3, y: 3, color: 'red' },
    { x: 6, y: 6, color: 'pink' },
    { x: 8, y: 2, color: 'blue' }
  ]);
  const [dots, setDots] = useState([]);
  const [powerPellets, setPowerPellets] = useState([]);
  const [isPoweredUp, setIsPoweredUp] = useState(false);
  const [powerUpTimer, setPowerUpTimer] = useState(null);

  const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  useEffect(() => {
    const initialDots = [];
    const initialPowerPellets = [];
    
    // Adicionar pontos em todas as posições vazias
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[0].length; x++) {
        if (maze[y][x] === 0) {
          initialDots.push({ x, y });
        }
      }
    }
    
    // Adicionar power pellets em posições estratégicas
    initialPowerPellets.push(
      { x: 1, y: 1 },
      { x: 8, y: 1 },
      { x: 1, y: 8 },
      { x: 8, y: 8 }
    );
    
    setDots(initialDots);
    setPowerPellets(initialPowerPellets);
    setPlayerPosition({ x: 1, y: 1 });
    setGameWon(false);
    setMoves(0);
    setScore(0);
    setGhosts([
      { x: 3, y: 3, color: 'red' },
      { x: 6, y: 6, color: 'pink' },
      { x: 8, y: 2, color: 'blue' }
    ]);
    setIsPoweredUp(false);
    if (powerUpTimer) clearTimeout(powerUpTimer);
  }, []);

  useEffect(() => {
    // Mover fantasmas
    const ghostInterval = setInterval(() => {
      setGhosts(prevGhosts => 
        prevGhosts.map(ghost => {
          // Calcular a direção para o jogador
          const dx = playerPosition.x - ghost.x;
          const dy = playerPosition.y - ghost.y;
          
          // Lista de todos os movimentos possíveis
          const allMoves = [
            { x: ghost.x + 1, y: ghost.y },
            { x: ghost.x - 1, y: ghost.y },
            { x: ghost.x, y: ghost.y + 1 },
            { x: ghost.x, y: ghost.y - 1 }
          ];

          // Filtrar movimentos válidos
          const validMoves = allMoves.filter(move => 
            maze[move.y]?.[move.x] !== 1 && 
            !prevGhosts.some(g => g.x === move.x && g.y === move.y)
          );

          if (validMoves.length > 0) {
            // Escolher movimento que aproxima do jogador, mas não bloqueia o caminho
            const bestMove = validMoves.reduce((best, current) => {
              const currentDist = Math.abs(current.x - playerPosition.x) + Math.abs(current.y - playerPosition.y);
              const bestDist = Math.abs(best.x - playerPosition.x) + Math.abs(best.y - playerPosition.y);
              
              // Preferir movimentos que não bloqueiam o caminho
              const currentBlocksPath = maze[current.y]?.[current.x] === 1;
              const bestBlocksPath = maze[best.y]?.[best.x] === 1;
              
              if (currentBlocksPath && !bestBlocksPath) return best;
              if (!currentBlocksPath && bestBlocksPath) return current;
              
              return currentDist < bestDist ? current : best;
            });
            return { ...ghost, ...bestMove };
          }
          return ghost;
        })
      );
    }, 800); // Aumentado o intervalo para movimentos mais lentos

    return () => clearInterval(ghostInterval);
  }, [playerPosition]);

  useEffect(() => {
    // Verificar colisão com fantasmas
    const collision = ghosts.some(ghost => 
      ghost.x === playerPosition.x && ghost.y === playerPosition.y
    );

    if (collision) {
      if (isPoweredUp) {
        // Comer fantasma
        setGhosts(prevGhosts => 
          prevGhosts.filter(ghost => 
            !(ghost.x === playerPosition.x && ghost.y === playerPosition.y)
          )
        );
        setScore(prev => prev + 200);
      } else {
        // Game over
        setGameWon(false);
        setTimeout(() => {
          alert('Ah não! O cachorrinho foi pego pelos fantasmas! 😱\nTente novamente!');
          resetGame();
        }, 500);
      }
    }
  }, [playerPosition, ghosts, isPoweredUp]);

  const handleKeyPress = (e) => {
    if (gameWon) return;

    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;

    switch (e.key) {
      case 'ArrowUp':
        newY = Math.max(0, y - 1);
        break;
      case 'ArrowDown':
        newY = Math.min(maze.length - 1, y + 1);
        break;
      case 'ArrowLeft':
        newX = Math.max(0, x - 1);
        break;
      case 'ArrowRight':
        newX = Math.min(maze[0].length - 1, x + 1);
        break;
      default:
        return;
    }

    if (maze[newY][newX] !== 1) {
      setPlayerPosition({ x: newX, y: newY });
      setMoves(moves + 1);

      // Verificar se pegou um ponto
      const dotIndex = dots.findIndex(dot => dot.x === newX && dot.y === newY);
      if (dotIndex !== -1) {
        setDots(prevDots => prevDots.filter((_, index) => index !== dotIndex));
        setScore(prev => prev + 10);
      }

      // Verificar se pegou um power pellet
      const powerPelletIndex = powerPellets.findIndex(pellet => 
        pellet.x === newX && pellet.y === newY
      );
      if (powerPelletIndex !== -1) {
        setPowerPellets(prev => prev.filter((_, index) => index !== powerPelletIndex));
        setIsPoweredUp(true);
        setScore(prev => prev + 50);
        
        // Resetar timer se já houver um
        if (powerUpTimer) clearTimeout(powerUpTimer);
        
        // Definir novo timer
        const timer = setTimeout(() => {
          setIsPoweredUp(false);
        }, 10000);
        setPowerUpTimer(timer);
      }

      if (maze[newY][newX] === 2) {
        setGameWon(true);
        setTimeout(() => {
          alert(`Parabéns! Você completou o labirinto!\nPontuação: ${score} 🎉`);
          resetGame();
        }, 500);
      }
    }
  };

  const resetGame = () => {
    setPlayerPosition({ x: 1, y: 1 });
    setGameWon(false);
    setMoves(0);
    setScore(0);
    setGhosts([
      { x: 3, y: 3, color: 'red' },
      { x: 6, y: 6, color: 'pink' },
      { x: 8, y: 2, color: 'blue' }
    ]);
    setIsPoweredUp(false);
    if (powerUpTimer) clearTimeout(powerUpTimer);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition, gameWon, dots, powerPellets, isPoweredUp]);

  return (
    <div className="maze-container">
      <h2>Labirinto do Pet</h2>
      <div className="maze-stats">
        <span>Movimentos: {moves}</span>
        <span>Pontuação: {score}</span>
        {isPoweredUp && <span className="power-up">Power Up Ativo! ⚡</span>}
      </div>
      <div className="maze-grid">
        {maze.map((row, y) => (
          <div key={y} className="maze-row">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`maze-cell ${
                  cell === 1 ? 'wall' :
                  cell === 2 ? 'goal' :
                  playerPosition.x === x && playerPosition.y === y ? 'player' : ''
                }`}
              >
                {playerPosition.x === x && playerPosition.y === y && '🐕'}
                {cell === 2 && '🏥'}
                {dots.some(dot => dot.x === x && dot.y === y) && (
                  <span className="dot" style={{ fontSize: '20px', color: '#FF69B4' }}>•</span>
                )}
                {powerPellets.some(pellet => pellet.x === x && pellet.y === y) && (
                  <span className="power-pellet" style={{ fontSize: '20px', color: '#FFD700' }}>⚡</span>
                )}
                {ghosts.map((ghost, index) => 
                  ghost.x === x && ghost.y === y && (
                    <span 
                      key={index} 
                      className={`ghost ${ghost.color} ${isPoweredUp ? 'scared' : ''}`}
                      style={{ fontSize: '24px' }}
                    >
                      👻
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="maze-instructions">
        <p>Use as setas do teclado para mover o pet até o veterinário (🏥)</p>
        <p>Colete os pontos (•) e power pellets (⚡) para ganhar pontos</p>
        <p>Evite os fantasmas (👻) ou coma-os quando estiver com power up!</p>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reiniciar
      </button>
    </div>
  );
};

export default MazeGame; 