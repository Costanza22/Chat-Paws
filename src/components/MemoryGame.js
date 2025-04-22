import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const petEmojis = ['🐶', '🐱', '🐹', '🐰', '🐢', '🦜', '🐠', '🐦'];

  const initializeCards = () => {
    const cardPairs = [...petEmojis, ...petEmojis];
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeCards();
  }, []);

  const handleCardClick = (cardId) => {
    if (flippedCards.length >= 2 || matchedCards.includes(cardId)) return;

    const newCards = cards.map(card => {
      if (card.id === cardId) {
        return { ...card, isFlipped: true };
      }
      return card;
    });

    setCards(newCards);
    setFlippedCards([...flippedCards, cardId]);

    if (flippedCards.length === 1) {
      const firstCard = cards.find(card => card.id === flippedCards[0]);
      const secondCard = cards.find(card => card.id === cardId);

      if (firstCard.emoji === secondCard.emoji) {
        setMatchedCards([...matchedCards, flippedCards[0], cardId]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const resetCards = cards.map(card => {
            if (card.id === flippedCards[0] || card.id === cardId) {
              return { ...card, isFlipped: false };
            }
            return card;
          });
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(moves + 1);
    }

    if (matchedCards.length + 2 === cards.length) {
      setGameWon(true);
    }
  };

  return (
    <div className="memory-container">
      <h2>Jogo da Memória dos Pets</h2>
      <div className="memory-stats">
        <span>Movimentos: {moves}</span>
        {gameWon && <span className="win-message">Parabéns! Você venceu! 🎉</span>}
      </div>
      <div className="memory-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`memory-card ${card.isFlipped ? 'flipped' : ''} ${matchedCards.includes(card.id) ? 'matched' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-front">?</div>
            <div className="card-back">{card.emoji}</div>
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={initializeCards}>
        Reiniciar
      </button>
    </div>
  );
};

export default MemoryGame; 