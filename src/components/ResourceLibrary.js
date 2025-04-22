import React, { useState } from 'react';
import './ResourceLibrary.css';

const ResourceLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('artigos');

  const resources = {
    artigos: [
      {
        title: 'Cuidados Básicos com Cães',
        description: 'Guia completo sobre alimentação, exercícios e cuidados diários para cães de todas as idades.',
        link: 'https://www.petlove.com.br/dicas/cuidados-basicos-com-caes',
        category: 'cuidados-basicos',
        petType: 'cachorro'
      },
      {
        title: 'Saúde Bucal em Gatos',
        description: 'Importância da higiene bucal e prevenção de doenças periodontais em gatos.',
        link: 'https://www.petlove.com.br/dicas/saude-bucal-em-gatos',
        category: 'saude-bucal',
        petType: 'gato'
      },
      {
        title: 'Vacinação em Animais',
        description: 'Calendário completo de vacinas e importância da imunização para pets.',
        link: 'https://www.petlove.com.br/dicas/calendario-de-vacinacao-para-caes-e-gatos',
        category: 'vacinas',
        petType: 'geral'
      },
      {
        title: 'Alimentação Natural para Pets',
        description: 'Guia completo sobre dietas naturais e balanceadas para cães e gatos.',
        link: 'https://www.petlove.com.br/dicas/alimentacao-natural-para-pets',
        category: 'nutricao',
        petType: 'geral'
      },
      {
        title: 'Primeiros Socorros para Pets',
        description: 'Manual completo de primeiros socorros para situações de emergência.',
        link: 'https://www.petlove.com.br/dicas/primeiros-socorros-para-pets',
        category: 'primeiros-socorros',
        petType: 'geral'
      },
      {
        title: 'Cuidados com Pets Idosos',
        description: 'Guia especial para cuidar de pets na terceira idade.',
        link: 'https://www.petlove.com.br/dicas/cuidados-com-pets-idosos',
        category: 'cuidados-especiais',
        petType: 'geral'
      }
    ],
    videos: [
      {
        title: 'Como Dar Banho em Gatos',
        description: 'Técnicas para banho seguro e sem estresse para gatos.',
        link: 'https://www.youtube.com/watch?v=exemplo-gatos',
        category: 'cuidados-basicos',
        petType: 'gato'
      },
      {
        title: 'Exercícios para Pets Idosos',
        description: 'Atividades físicas adequadas para pets mais velhos.',
        link: 'https://www.youtube.com/watch?v=exemplo-exercicios',
        category: 'exercicios',
        petType: 'geral'
      },
      {
        title: 'Como Escovar os Dentes do Seu Pet',
        description: 'Tutorial completo sobre higiene bucal para pets.',
        link: 'https://www.youtube.com/watch?v=exemplo-escovacao',
        category: 'saude-bucal',
        petType: 'geral'
      }
    ],
    primeirosSocorros: [
      {
        title: 'Envenenamento',
        description: 'O que fazer em caso de envenenamento acidental.',
        steps: [
          'Mantenha a calma',
          'Identifique a substância ingerida',
          'Ligue para o veterinário imediatamente',
          'Não induza vômito sem orientação',
          'Mantenha o pet aquecido e confortável'
        ],
        emergency: true
      },
      {
        title: 'Convulsões',
        description: 'Como agir durante uma crise convulsiva.',
        steps: [
          'Mantenha o pet em local seguro',
          'Não tente segurar a língua',
          'Cronometre a duração da crise',
          'Mantenha o ambiente calmo e escuro',
          'Procure atendimento veterinário após a crise'
        ],
        emergency: true
      },
      {
        title: 'Queimaduras',
        description: 'Primeiros socorros para queimaduras em pets.',
        steps: [
          'Resfrie a área com água fria',
          'Não aplique pomadas sem orientação',
          'Cubra a área com gaze limpa',
          'Mantenha o pet aquecido',
          'Procure atendimento veterinário'
        ],
        emergency: true
      }
    ]
  };

  const categories = {
    artigos: ['cuidados-basicos', 'saude-bucal', 'vacinas', 'nutricao'],
    videos: ['primeiros-socorros', 'cuidados-basicos', 'exercicios'],
    primeirosSocorros: ['emergencia']
  };

  const renderResourceCard = (resource) => (
    <div className="resource-card" key={resource.title}>
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      {resource.steps && (
        <div className="steps-list">
          {resource.steps.map((step, index) => (
            <div key={index} className="step-item">
              <span className="step-number">{index + 1}</span>
              <span className="step-text">{step}</span>
            </div>
          ))}
        </div>
      )}
      {resource.link && (
        <a href={resource.link} className="resource-link" target="_blank" rel="noopener noreferrer">
          Acessar {selectedCategory === 'videos' ? 'Vídeo' : 'Artigo'}
        </a>
      )}
      {resource.emergency && (
        <div className="emergency-badge">EMERGÊNCIA</div>
      )}
    </div>
  );

  return (
    <div className="resource-library">
      <div className="library-header">
        <h2>Biblioteca de Recursos</h2>
        <div className="category-tabs">
          <button
            className={selectedCategory === 'artigos' ? 'active' : ''}
            onClick={() => setSelectedCategory('artigos')}
          >
            Artigos
          </button>
          <button
            className={selectedCategory === 'videos' ? 'active' : ''}
            onClick={() => setSelectedCategory('videos')}
          >
            Vídeos
          </button>
          <button
            className={selectedCategory === 'primeirosSocorros' ? 'active' : ''}
            onClick={() => setSelectedCategory('primeirosSocorros')}
          >
            Primeiros Socorros
          </button>
        </div>
      </div>

      <div className="resources-grid">
        {resources[selectedCategory].map(renderResourceCard)}
      </div>
    </div>
  );
};

export default ResourceLibrary; 