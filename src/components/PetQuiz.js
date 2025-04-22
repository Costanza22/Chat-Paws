import React, { useState } from 'react';
import './PetQuiz.css';

const PetQuiz = ({ quizType }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const firstAidQuestions = [
    {
      question: "O que fazer se seu pet ingerir algo tóxico?",
      options: [
        "Induzir o vômito imediatamente",
        "Dar leite para neutralizar",
        "Levar ao veterinário imediatamente",
        "Esperar para ver se ele melhora"
      ],
      correctAnswer: 2
    },
    {
      question: "O que fazer se seu pet estiver engasgado?",
      options: [
        "Bater nas costas",
        "Tentar puxar o objeto com a mão",
        "Manter a calma e verificar a respiração",
        "Dar água para ajudar a engolir"
      ],
      correctAnswer: 2
    },
    {
      question: "O que fazer se seu pet tiver convulsão?",
      options: [
        "Segurar a língua",
        "Mover o pet para um local seguro",
        "Dar água",
        "Sacudir o pet"
      ],
      correctAnswer: 1
    },
    {
      question: "Como identificar um pet com dor?",
      options: [
        "Apenas se ele chorar",
        "Pelo comportamento alterado e postura",
        "Sempre ficam agressivos",
        "Não é possível identificar"
      ],
      correctAnswer: 1
    },
    {
      question: "Qual é a temperatura normal de um cão?",
      options: [
        "35-36°C",
        "37-38°C",
        "38-39°C",
        "40-41°C"
      ],
      correctAnswer: 2
    }
  ];

  const nutritionQuestions = [
    {
      question: "Qual alimento é tóxico para cães?",
      options: [
        "Chocolate",
        "Cenoura",
        "Arroz",
        "Frango cozido"
      ],
      correctAnswer: 0
    },
    {
      question: "Qual é a frequência ideal de alimentação para um cão adulto?",
      options: [
        "Uma vez por dia",
        "Duas vezes por dia",
        "Três vezes por dia",
        "Sempre que ele pedir"
      ],
      correctAnswer: 1
    },
    {
      question: "Qual é o sinal de desidratação em pets?",
      options: [
        "Pele elástica",
        "Gengivas secas e pegajosas",
        "Olhos brilhantes",
        "Nariz molhado"
      ],
      correctAnswer: 1
    },
    {
      question: "Como prevenir problemas dentários em pets?",
      options: [
        "Escovar os dentes regularmente",
        "Dar apenas ração seca",
        "Não precisa prevenir",
        "Dar ossos de verdade"
      ],
      correctAnswer: 0
    },
    {
      question: "Qual é a quantidade ideal de água para um cão?",
      options: [
        "50ml por kg de peso",
        "100ml por kg de peso",
        "150ml por kg de peso",
        "200ml por kg de peso"
      ],
      correctAnswer: 1
    }
  ];

  const behaviorQuestions = [
    {
      question: "Como acalmar um pet ansioso?",
      options: [
        "Ignorar completamente",
        "Dar muitos petiscos",
        "Criar um ambiente seguro e tranquilo",
        "Deixar ele sozinho"
      ],
      correctAnswer: 2
    },
    {
      question: "O que fazer se o pet estiver destruindo objetos?",
      options: [
        "Punir fisicamente",
        "Ignorar o comportamento",
        "Proporcionar brinquedos adequados",
        "Prender o pet"
      ],
      correctAnswer: 2
    },
    {
      question: "Como lidar com um pet agressivo?",
      options: [
        "Retribuir a agressividade",
        "Ignorar o comportamento",
        "Procurar um profissional especializado",
        "Isolar o pet"
      ],
      correctAnswer: 2
    },
    {
      question: "O que fazer se o pet estiver latindo/miando excessivamente?",
      options: [
        "Gritar com o pet",
        "Ignorar completamente",
        "Identificar a causa e trabalhar a solução",
        "Usar coleira anti-latido"
      ],
      correctAnswer: 2
    },
    {
      question: "Como socializar um filhote?",
      options: [
        "Deixar ele sozinho",
        "Apresentar a todos os pets de uma vez",
        "Apresentar gradualmente a diferentes situações",
        "Esperar ele crescer"
      ],
      correctAnswer: 2
    }
  ];

  const getQuestions = () => {
    switch (quizType) {
      case 'first-aid':
        return firstAidQuestions;
      case 'nutrition':
        return nutritionQuestions;
      case 'behavior':
        return behaviorQuestions;
      default:
        return firstAidQuestions;
    }
  };

  const questions = getQuestions();

  const handleAnswerClick = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const getQuizTitle = () => {
    switch (quizType) {
      case 'first-aid':
        return 'Quiz de Primeiros Socorros';
      case 'nutrition':
        return 'Quiz de Nutrição';
      case 'behavior':
        return 'Quiz de Comportamento';
      default:
        return 'Quiz de Cuidados com Pets';
    }
  };

  return (
    <div className="quiz-container">
      <h2>{getQuizTitle()}</h2>
      {showScore ? (
        <div className="score-section">
          <h3>Quiz Concluído!</h3>
          <p>Você acertou {score} de {questions.length} perguntas!</p>
          <button className="reset-button" onClick={resetQuiz}>
            Jogar Novamente
          </button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <h3>Pergunta {currentQuestion + 1}/{questions.length}</h3>
            <p>{questions[currentQuestion].question}</p>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`answer-button ${
                  isAnswered
                    ? index === questions[currentQuestion].correctAnswer
                      ? 'correct'
                      : selectedAnswer === index
                      ? 'wrong'
                      : ''
                    : ''
                }`}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PetQuiz; 