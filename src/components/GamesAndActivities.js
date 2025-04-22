import React, { useState } from 'react';
import './GamesAndActivities.css';
import PuzzleGame from './PuzzleGame';
import MemoryGame from './MemoryGame';
import MazeGame from './MazeGame';
import PetChess from './PetChess';
import PetQuiz from './PetQuiz';

const GamesAndActivities = () => {
  const [activeTab, setActiveTab] = useState('games');
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const games = [
    {
      id: 'puzzle',
      title: 'Pet Puzzle',
      description: 'Monte o quebra-cabeça do pet!',
      difficulty: 'Fácil',
      duration: '5 min',
      icon: '🧩'
    },
    {
      id: 'memory',
      title: 'Veterinary Memory',
      description: 'Encontre os pares de cartas relacionadas à saúde dos pets',
      difficulty: 'Médio',
      duration: '10 min',
      icon: '🎴'
    },
    {
      id: 'maze',
      title: 'Pet Maze',
      description: 'Ajude o pet a encontrar o caminho para o veterinário',
      difficulty: 'Difícil',
      duration: '15 min',
      icon: '🏥'
    },
    {
      id: 'chess',
      title: 'Pet Chess',
      description: 'Jogue xadrez com peças de pets!',
      difficulty: 'Difícil',
      duration: '20 min',
      icon: '♟️'
    }
  ];

  const quizzes = [
    {
      id: 'first-aid',
      title: 'Primeiros Socorros',
      description: 'Teste seus conhecimentos sobre primeiros socorros para pets',
      difficulty: 'Médio',
      duration: '10 min',
      icon: '🏥'
    },
    {
      id: 'nutrition',
      title: 'Nutrição',
      description: 'Quiz sobre alimentação saudável para pets',
      difficulty: 'Médio',
      duration: '8 min',
      icon: '🥗'
    },
    {
      id: 'behavior',
      title: 'Comportamento',
      description: 'Entenda melhor o comportamento do seu pet',
      difficulty: 'Médio',
      duration: '10 min',
      icon: '🐾'
    }
  ];

  const renderGameContent = () => {
    switch (selectedGame) {
      case 'puzzle':
        return <PuzzleGame />;
      case 'memory':
        return <MemoryGame />;
      case 'maze':
        return <MazeGame />;
      case 'chess':
        return <PetChess />;
      default:
        return (
          <div className="games-grid">
            {games.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => setSelectedGame(game.id)}
              >
                <div className="game-icon">{game.icon}</div>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <div className="game-info">
                  <span>Dificuldade: {game.difficulty}</span>
                  <span>Duração: {game.duration}</span>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  const renderQuizContent = () => {
    if (selectedQuiz) {
      return <PetQuiz quizType={selectedQuiz} />;
    }

    return (
      <div className="games-grid">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="game-card"
            onClick={() => setSelectedQuiz(quiz.id)}
          >
            <div className="game-icon">{quiz.icon}</div>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <div className="game-info">
              <span>Dificuldade: {quiz.difficulty}</span>
              <span>Duração: {quiz.duration}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPlayContent = () => {
    return (
      <div className="games-grid">
        <div className="game-card">
          <div className="game-icon">🐕</div>
          <h3>Para Cachorros</h3>
          <div className="tips-list">
            <h4>Brincadeiras Interativas:</h4>
            <ul>
              <li>Esconde-esconde com petiscos</li>
              <li>Pista de obstáculos caseira</li>
              <li>Brincadeira de buscar com diferentes objetos</li>
              <li>Jogo de quebra-cabeça com comida</li>
              <li>Treino de agilidade com cones</li>
            </ul>
            <h4>Brincadeiras em Dupla:</h4>
            <ul>
              <li>Cabo de guerra com brinquedo</li>
              <li>Lançamento de frisbee</li>
              <li>Jogo de bolinhas</li>
              <li>Treino de comandos divertidos</li>
              <li>Massagem e carinho</li>
            </ul>
          </div>
        </div>
        <div className="game-card">
          <div className="game-icon">🐈</div>
          <h3>Para Gatos</h3>
          <div className="tips-list">
            <h4>Brincadeiras de Caça:</h4>
            <ul>
              <li>Varinhas com penas</li>
              <li>Bolinhas de papel</li>
              <li>Laser pointer (com moderação)</li>
              <li>Ratinhos de pelúcia</li>
              <li>Caixas de papelão</li>
            </ul>
            <h4>Enriquecimento Ambiental:</h4>
            <ul>
              <li>Prateleiras para escalar</li>
              <li>Arranhadores em diferentes texturas</li>
              <li>Esconderijos e túneis</li>
              <li>Janelas com vista para pássaros</li>
              <li>Fonte de água corrente</li>
            </ul>
          </div>
        </div>
        <div className="game-card">
          <div className="game-icon">🐇</div>
          <h3>Pets Pequenos</h3>
          <div className="tips-list">
            <h4>Para Roedores:</h4>
            <ul>
              <li>Labirintos de papelão</li>
              <li>Bolas de feno com petiscos</li>
              <li>Rolinhos de papel higiênico</li>
              <li>Escalada em rampas</li>
              <li>Caixas de areia para cavar</li>
            </ul>
            <h4>Para Aves:</h4>
            <ul>
              <li>Brinquedos para bicar</li>
              <li>Escadas e balanços</li>
              <li>Espelhos seguros</li>
              <li>Jogos de inteligência</li>
              <li>Treino de voo controlado</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderExercisesContent = () => {
    return (
      <div className="games-grid">
        <div className="game-card">
          <div className="game-icon">🐶</div>
          <h3>Para Filhotes</h3>
          <div className="tips-list">
            <h4>Exercícios Básicos:</h4>
            <ul>
              <li>Caminhadas curtas (5-10 min)</li>
              <li>Jogos de busca suaves</li>
              <li>Socialização com outros pets</li>
              <li>Treino de comandos básicos</li>
              <li>Brincadeiras com brinquedos macios</li>
            </ul>
            <h4>Desenvolvimento:</h4>
            <ul>
              <li>Obstáculos baixos</li>
              <li>Passeios em diferentes superfícies</li>
              <li>Jogos de estimulação mental</li>
              <li>Treino de coordenação</li>
              <li>Exercícios de equilíbrio</li>
            </ul>
          </div>
        </div>
        <div className="game-card">
          <div className="game-icon">🐕</div>
          <h3>Para Adultos</h3>
          <div className="tips-list">
            <h4>Exercícios Físicos:</h4>
            <ul>
              <li>Caminhadas diárias (30-60 min)</li>
              <li>Corridas e trotes</li>
              <li>Natação (se possível)</li>
              <li>Jogos de agilidade</li>
              <li>Treino de força com peso corporal</li>
            </ul>
            <h4>Atividades Mentais:</h4>
            <ul>
              <li>Treino de comandos avançados</li>
              <li>Jogos de busca e farejo</li>
              <li>Obstáculos e circuitos</li>
              <li>Interação com outros pets</li>
              <li>Exercícios de concentração</li>
            </ul>
          </div>
        </div>
        <div className="game-card">
          <div className="game-icon">🐾</div>
          <h3>Para Idosos</h3>
          <div className="tips-list">
            <h4>Exercícios Suaves:</h4>
            <ul>
              <li>Caminhadas curtas e frequentes</li>
              <li>Natação terapêutica</li>
              <li>Massagens e alongamentos</li>
              <li>Jogos de baixo impacto</li>
              <li>Exercícios de mobilidade</li>
            </ul>
            <h4>Cuidados Especiais:</h4>
            <ul>
              <li>Superfícies antiderrapantes</li>
              <li>Rampas em vez de escadas</li>
              <li>Exercícios de equilíbrio</li>
              <li>Atividades mentais leves</li>
              <li>Pausas frequentes</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="games-activities">
      <h2 className="games-header">Jogos e Atividades</h2>
      <div className="games-tabs">
        <button
          className={`tab-button ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('games');
            setSelectedGame(null);
            setSelectedQuiz(null);
          }}
        >
          🎮 Jogos
        </button>
        <button
          className={`tab-button ${activeTab === 'quizzes' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('quizzes');
            setSelectedGame(null);
            setSelectedQuiz(null);
          }}
        >
          📝 Quiz
        </button>
        <button
          className={`tab-button ${activeTab === 'play' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('play');
            setSelectedGame(null);
            setSelectedQuiz(null);
          }}
        >
          🎯 Brincadeiras
        </button>
        <button
          className={`tab-button ${activeTab === 'exercises' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('exercises');
            setSelectedGame(null);
            setSelectedQuiz(null);
          }}
        >
          🏃 Exercícios
        </button>
      </div>

      {activeTab === 'games' && renderGameContent()}
      {activeTab === 'quizzes' && renderQuizContent()}
      {activeTab === 'play' && renderPlayContent()}
      {activeTab === 'exercises' && renderExercisesContent()}
    </div>
  );
};

export default GamesAndActivities; 