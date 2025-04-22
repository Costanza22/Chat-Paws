import React, { useState, useEffect } from 'react';
import './PetChess.css';

const PetChess = () => {
  const [board, setBoard] = useState([
    ['🐕', '🐈', '🐇', '🦜', '🐢', '🐇', '🐈', '🐕'],
    ['🐹', '🐹', '🐹', '🐹', '🐹', '🐹', '🐹', '🐹'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['🐭', '🐭', '🐭', '🐭', '🐭', '🐭', '🐭', '🐭'],
    ['🐶', '🐱', '🐰', '🦜', '🐢', '🐰', '🐱', '🐶']
  ]);

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [gameStatus, setGameStatus] = useState('playing');
  const [validMoves, setValidMoves] = useState([]);

  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    const piece = board[fromRow][fromCol];
    const targetPiece = board[toRow][toCol];
    
    // Verifica se a peça está tentando capturar uma peça do mesmo time
    if (targetPiece && 
        ((piece === '🐕' || piece === '🐈' || piece === '🐇' || piece === '🦜' || piece === '🐢' || piece === '🐹') &&
         (targetPiece === '🐕' || targetPiece === '🐈' || targetPiece === '🐇' || targetPiece === '🦜' || targetPiece === '🐢' || targetPiece === '🐹')) ||
        ((piece === '🐶' || piece === '🐱' || piece === '🐰' || piece === '🦜' || piece === '🐢' || piece === '🐭') &&
         (targetPiece === '🐶' || targetPiece === '🐱' || targetPiece === '🐰' || targetPiece === '🦜' || targetPiece === '🐢' || targetPiece === '🐭'))) {
      return false;
    }

    // Movimentos básicos para todas as peças
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    // Peões (🐹 e 🐭)
    if (piece === '🐹') {
      if (colDiff === 0 && toRow === fromRow - 1) return true; // Movimento para frente
      if (colDiff === 1 && rowDiff === 1 && targetPiece) return true; // Captura diagonal
    }
    if (piece === '🐭') {
      if (colDiff === 0 && toRow === fromRow + 1) return true;
      if (colDiff === 1 && rowDiff === 1 && targetPiece) return true;
    }

    // Reis (🐕 e 🐶)
    if (piece === '🐕' || piece === '🐶') {
      return rowDiff <= 1 && colDiff <= 1;
    }

    // Rainhas (🐈 e 🐱)
    if (piece === '🐈' || piece === '🐱') {
      return rowDiff === colDiff || rowDiff === 0 || colDiff === 0;
    }

    // Bispos (🐇 e 🐰)
    if (piece === '🐇' || piece === '🐰') {
      return rowDiff === colDiff;
    }

    // Torres (🐢)
    if (piece === '🐢') {
      return rowDiff === 0 || colDiff === 0;
    }

    // Cavalos (🦜)
    if (piece === '🦜') {
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }

    return false;
  };

  const getValidMoves = (row, col) => {
    const moves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (isValidMove(row, col, i, j)) {
          moves.push({ row: i, col: j });
        }
      }
    }
    return moves;
  };

  const computerMove = () => {
    const computerPieces = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece && (piece === '🐶' || piece === '🐱' || piece === '🐰' || piece === '🦜' || piece === '🐢' || piece === '🐭')) {
          const moves = getValidMoves(i, j);
          if (moves.length > 0) {
            computerPieces.push({ row: i, col: j, piece, moves });
          }
        }
      }
    }

    if (computerPieces.length === 0) return;

    // Escolhe uma peça aleatória com movimentos válidos
    const randomPiece = computerPieces[Math.floor(Math.random() * computerPieces.length)];
    const validMoves = randomPiece.moves;
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];

    // Executa o movimento
    const newBoard = [...board];
    newBoard[randomMove.row][randomMove.col] = randomPiece.piece;
    newBoard[randomPiece.row][randomPiece.col] = '';
    setBoard(newBoard);
    setCurrentPlayer('white');

    // Verifica se o rei branco foi capturado
    if (randomPiece.piece === '🐶' && board[randomMove.row][randomMove.col] === '🐕') {
      setGameStatus('black_won');
    }
  };

  useEffect(() => {
    if (currentPlayer === 'black' && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        computerMove();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameStatus]);

  const handlePieceClick = (row, col) => {
    if (currentPlayer !== 'white' || gameStatus !== 'playing') return;

    const piece = board[row][col];

    if (selectedPiece) {
      if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
        const newBoard = [...board];
        newBoard[row][col] = selectedPiece.piece;
        newBoard[selectedPiece.row][selectedPiece.col] = '';
        setBoard(newBoard);
        setSelectedPiece(null);
        setValidMoves([]);
        setCurrentPlayer('black');

        // Verifica se o rei preto foi capturado
        if (piece === '🐶') {
          setGameStatus('white_won');
        }
      } else {
        setSelectedPiece(null);
        setValidMoves([]);
      }
    } else if (piece && (piece === '🐕' || piece === '🐈' || piece === '🐇' || piece === '🦜' || piece === '🐢' || piece === '🐹')) {
      setSelectedPiece({ row, col, piece });
      setValidMoves(getValidMoves(row, col));
    }
  };

  const renderSquare = (row, col) => {
    const isSelected = selectedPiece && selectedPiece.row === row && selectedPiece.col === col;
    const isBlack = (row + col) % 2 === 1;
    const piece = board[row][col];
    const isValidMove = validMoves.some(move => move.row === row && move.col === col);

    return (
      <div
        key={`${row}-${col}`}
        className={`chess-square ${isBlack ? 'black' : 'white'} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}`}
        onClick={() => handlePieceClick(row, col)}
      >
        {piece}
      </div>
    );
  };

  const resetGame = () => {
    setBoard([
      ['🐕', '🐈', '🐇', '🦜', '🐢', '🐇', '🐈', '🐕'],
      ['🐹', '🐹', '🐹', '🐹', '🐹', '🐹', '🐹', '🐹'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['🐭', '🐭', '🐭', '🐭', '🐭', '🐭', '🐭', '🐭'],
      ['🐶', '🐱', '🐰', '🦜', '🐢', '🐰', '🐱', '🐶']
    ]);
    setSelectedPiece(null);
    setCurrentPlayer('white');
    setGameStatus('playing');
    setValidMoves([]);
  };

  return (
    <div className="chess-container">
      <h2>Xadrez dos Pets</h2>
      <div className="chess-stats">
        <span>Jogador atual: {currentPlayer === 'white' ? 'Branco' : 'Preto'}</span>
        {gameStatus !== 'playing' && (
          <div className="game-over">
            {gameStatus === 'white_won' ? 'Você venceu! 🎉' : 'O computador venceu! 😢'}
          </div>
        )}
      </div>
      <div className="chess-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="chess-row">
            {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
          </div>
        ))}
      </div>
      <div className="chess-instructions">
        <p>Clique em uma peça para selecioná-la e depois clique onde quer movê-la</p>
        <p>Peças brancas: 🐕 🐈 🐇 🦜 🐢 🐹</p>
        <p>Peças pretas: 🐶 🐱 🐰 🦜 🐢 🐭</p>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reiniciar
      </button>
    </div>
  );
};

export default PetChess; 