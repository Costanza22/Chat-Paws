import React from 'react';
import './Achievements.css';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "Primeira Consulta",
      description: "Realizou sua primeira consulta no chat",
      icon: "👨‍⚕️",
      progress: 0,
      total: 1,
      unlocked: false
    },
    {
      id: 2,
      title: "Amigo dos Pets",
      description: "Completou 10 consultas no chat",
      icon: "🐾",
      progress: 0,
      total: 10,
      unlocked: false
    },
    {
      id: 3,
      title: "Agendador Mestre",
      description: "Agendou 5 consultas",
      icon: "📅",
      progress: 0,
      total: 5,
      unlocked: false
    },
    {
      id: 4,
      title: "Bibliotecário",
      description: "Acessou todos os recursos da biblioteca",
      icon: "📚",
      progress: 0,
      total: 1,
      unlocked: false
    },
    {
      id: 5,
      title: "Chef Pet",
      description: "Visualizou todas as receitas do guia de alimentação",
      icon: "🍖",
      progress: 0,
      total: 1,
      unlocked: false
    },
    {
      id: 6,
      title: "Jogador Nível Máximo",
      description: "Completou todos os jogos",
      icon: "🎮",
      progress: 0,
      total: 1,
      unlocked: false
    }
  ];

  return (
    <div className="achievements-container">
      <h2>Conquistas</h2>
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
          >
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-info">
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                />
              </div>
              <span className="progress-text">
                {achievement.progress}/{achievement.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements; 