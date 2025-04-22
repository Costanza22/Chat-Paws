import React, { useState, useEffect } from 'react';
import './PuzzleGame.css';

const PuzzleGame = () => {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const imageUrl = 'https://img.freepik.com/fotos-gratis/adoravel-cachorro-basenji-marrom-e-branco-sorrindo-e-dando-mais-uns-cinco-isolado-no-branco_346278-1657.jpg';
    const gridSize = 3;
    const pieceSize = 100;
    
    const newPieces = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      newPieces.push({
        id: i,
        position: i,
        correctPosition: i,
        style: {
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: `${-col * pieceSize}px ${-row * pieceSize}px`,
          backgroundSize: `${gridSize * pieceSize}px ${gridSize * pieceSize}px`,
          width: `${pieceSize}px`,
          height: `${pieceSize}px`,
        }
      });
    }
    
    // Embaralhar as peças
    const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
    setPieces(shuffledPieces);
  };

  const handlePieceClick = (piece) => {
    if (selectedPiece === null) {
      setSelectedPiece(piece);
    } else {
      const newPieces = [...pieces];
      const piece1Index = newPieces.findIndex(p => p.id === selectedPiece.id);
      const piece2Index = newPieces.findIndex(p => p.id === piece.id);
      
      [newPieces[piece1Index], newPieces[piece2Index]] = 
      [newPieces[piece2Index], newPieces[piece1Index]];
      
      setPieces(newPieces);
      setSelectedPiece(null);
      
      // Verificar se o quebra-cabeça está completo
      const isComplete = newPieces.every((piece, index) => piece.correctPosition === index);
      if (isComplete) {
        setIsComplete(true);
        setTimeout(() => {
          alert('Parabéns! Você completou o quebra-cabeça! 🎉');
          initializePuzzle();
          setIsComplete(false);
        }, 500);
      }
    }
  };

  return (
    <div className="puzzle-container">
      <h2>Quebra-Cabeça do Pet</h2>
      <div className="puzzle-grid">
        {pieces.map((piece) => (
          <div
            key={piece.id}
            className={`puzzle-piece ${selectedPiece?.id === piece.id ? 'selected' : ''}`}
            style={piece.style}
            onClick={() => handlePieceClick(piece)}
          />
        ))}
      </div>
      <button className="reset-button" onClick={initializePuzzle}>
        Reiniciar
      </button>
    </div>
  );
};

export default PuzzleGame; 