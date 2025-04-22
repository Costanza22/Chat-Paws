import React, { useState, useEffect, useRef } from 'react';
import { getVetResponse } from './services/vetAI';
import { analyzeUltrasound, analisarSintomas, analisarCasoCompleto } from './services/vetAnalysis';
import AppointmentScheduler from './components/AppointmentScheduler';
import './App.css';
import PetProfile from './components/PetProfile';
import EmergencyPanel from './components/EmergencyPanel';
import HelpPanel from './components/HelpPanel';
import ResourceLibrary from './components/ResourceLibrary';
import FoodGuide from './components/FoodGuide';
import ClinicMap from './components/ClinicMap';
import GamesAndActivities from './components/GamesAndActivities';
import Achievements from './components/Achievements';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [themeColor, setThemeColor] = useState('rosa');
  const [typing, setTyping] = useState(false);
  const [petType, setPetType] = useState('cachorro');
  const [favorites, setFavorites] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('chat');
  const [ultrasoundData, setUltrasoundData] = useState({
    orgao: '',
    descricao: ''
  });
  const messagesEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedOrgan, setSelectedOrgan] = useState('');
  const [showScheduler, setShowScheduler] = useState(false);
  const [showPetProfile, setShowPetProfile] = useState(false);
  const fileInputRef = useRef(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showResourceLibrary, setShowResourceLibrary] = useState(false);
  const [symptomSeverity, setSymptomSeverity] = useState('normal');
  const [showFoodGuide, setShowFoodGuide] = useState(false);
  const [showClinicMap, setShowClinicMap] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [dogMessage, setDogMessage] = useState("Au au! Como posso ajudar?");
  const [showAchievements, setShowAchievements] = useState(false);

  const petTypes = {
    cachorro: { emoji: '🐕', name: 'Cachorro' },
    gato: { emoji: '🐈', name: 'Gato' },
    passaro: { emoji: '🦜', name: 'Pássaro' },
    hamster: { emoji: '🐹', name: 'Hamster' },
    coelho: { emoji: '🐰', name: 'Coelho' },
    peixe: { emoji: '🐠', name: 'Peixe' }
  };

  const organs = [
    'Rim',
    'Fígado',
    'Coração',
    'Bexiga',
    'Baço',
    'Pâncreas',
    'Intestino',
    'Estômago'
  ];

  const organDiseases = {
    'Rim': {
      diseases: [
        {
          name: 'Insuficiência Renal',
          symptoms: ['aumento da sede', 'aumento da urina', 'perda de apetite', 'vômitos', 'perda de peso', 'fraqueza'],
          description: 'Condição em que os rins não conseguem filtrar adequadamente as toxinas do sangue.',
          treatment: 'Fluidoterapia, dieta especial, medicamentos para controlar a pressão arterial e suplementos.',
          commonIn: ['cachorro', 'gato']
        },
        {
          name: 'Cálculos Renais',
          symptoms: ['dificuldade para urinar', 'sangue na urina', 'dor ao urinar', 'vômitos', 'perda de apetite'],
          description: 'Formação de pedras nos rins que podem causar obstrução e dor.',
          treatment: 'Fluidoterapia, dieta especial, medicamentos para dissolver as pedras ou cirurgia em casos graves.',
          commonIn: ['cachorro', 'gato']
        },
        {
          name: 'Pielonefrite',
          symptoms: ['febre', 'dor abdominal', 'vômitos', 'perda de apetite', 'letargia'],
          description: 'Infecção bacteriana dos rins que pode ser aguda ou crônica.',
          treatment: 'Antibióticos, fluidoterapia e analgésicos.',
          commonIn: ['cachorro', 'gato']
        },
        {
          name: 'Doença Renal Poliquística',
          symptoms: ['aumento da sede', 'aumento da urina', 'perda de peso', 'vômitos', 'fraqueza'],
          description: 'Doença genética caracterizada pela formação de cistos nos rins.',
          treatment: 'Tratamento de suporte, dieta especial e monitoramento constante.',
          commonIn: ['gato']
        }
      ]
    },
    'Fígado': {
      diseases: [
        {
          name: 'Hepatite',
          symptoms: ['icterícia', 'vômitos', 'diarreia', 'perda de apetite', 'letargia', 'dor abdominal'],
          description: 'Inflamação do fígado que pode ser causada por infecções, toxinas ou doenças autoimunes.',
          treatment: 'Fluidoterapia, dieta especial, medicamentos para proteger o fígado e tratar a causa específica.',
          commonIn: ['cachorro', 'gato']
        },
        {
          name: 'Lipidose Hepática',
          symptoms: ['perda de peso rápida', 'icterícia', 'vômitos', 'letargia', 'anorexia'],
          description: 'Acúmulo de gordura no fígado, comum em gatos obesos que param de comer.',
          treatment: 'Alimentação forçada, fluidoterapia, suplementos e monitoramento constante.',
          commonIn: ['gato']
        },
        {
          name: 'Shunt Portossistêmico',
          symptoms: ['crescimento retardado', 'convulsões', 'comportamento anormal', 'icterícia', 'vômitos'],
          description: 'Anomalia vascular que permite que o sangue contorne o fígado.',
          treatment: 'Cirurgia para correção do shunt, dieta especial e medicamentos.',
          commonIn: ['cachorro', 'gato']
        },
        {
          name: 'Cirrose',
          symptoms: ['icterícia', 'ascite', 'perda de peso', 'fraqueza', 'vômitos'],
          description: 'Doença crônica do fígado caracterizada por fibrose e perda de função.',
          treatment: 'Tratamento de suporte, dieta especial e medicamentos para controlar os sintomas.',
          commonIn: ['cachorro', 'gato']
        }
      ]
    },
    'Coração': {
      diseases: [
        {
          name: 'Cardiomiopatia',
          symptoms: ['tosse', 'dificuldade respiratória', 'intolerância ao exercício', 'fraqueza', 'desmaios'],
          description: 'Doença do músculo cardíaco que afeta sua capacidade de bombear sangue.',
          treatment: 'Medicamentos para o coração, dieta especial, restrição de exercícios e monitoramento regular.',
          commonIn: ['cachorro', 'gato']
        },
        {
          name: 'Insuficiência Cardíaca',
          symptoms: ['tosse', 'dificuldade respiratória', 'intolerância ao exercício', 'abdômen distendido', 'desmaios'],
          description: 'Condição em que o coração não consegue bombear sangue suficiente para o corpo.',
          treatment: 'Medicamentos para o coração, diuréticos, dieta especial e monitoramento constante.',
          commonIn: ['cachorro', 'gato']
        },
        {
          name: 'Doença Valvar Crônica',
          symptoms: ['tosse', 'intolerância ao exercício', 'dificuldade respiratória', 'fraqueza', 'desmaios'],
          description: 'Degeneração das válvulas cardíacas, mais comum em cães de pequeno porte.',
          treatment: 'Medicamentos para o coração, dieta especial e monitoramento regular.',
          commonIn: ['cachorro']
        },
        {
          name: 'Cardiomiopatia Hipertrófica',
          symptoms: ['dificuldade respiratória', 'intolerância ao exercício', 'fraqueza', 'desmaios'],
          description: 'Espessamento anormal do músculo cardíaco, mais comum em gatos.',
          treatment: 'Medicamentos para o coração, dieta especial e monitoramento constante.',
          commonIn: ['gato']
        }
      ]
    },
    'Bexiga': {
      diseases: [
        {
          name: 'Cistite',
          symptoms: ['dificuldade para urinar', 'sangue na urina', 'urinar em pequenas quantidades', 'lamber a região genital'],
          description: 'Inflamação da bexiga, muitas vezes causada por infecção bacteriana.',
          treatment: 'Antibióticos, aumento da ingestão de água, dieta especial e analgésicos se necessário.'
        },
        {
          name: 'Cálculos na Bexiga',
          symptoms: ['dificuldade para urinar', 'sangue na urina', 'urinar em pequenas quantidades', 'lamber a região genital'],
          description: 'Formação de pedras na bexiga que podem causar obstrução e infecção.',
          treatment: 'Fluidoterapia, dieta especial, medicamentos para dissolver as pedras ou cirurgia em casos graves.'
        }
      ]
    },
    'Baço': {
      diseases: [
        {
          name: 'Torsão Esplênica',
          symptoms: ['abdômen distendido', 'fraqueza', 'gengivas pálidas', 'colapso', 'dor abdominal'],
          description: 'Torção do baço que pode levar a hemorragia interna e choque.',
          treatment: 'Emergência cirúrgica imediata, transfusão de sangue se necessário e cuidados intensivos.'
        },
        {
          name: 'Hemangiossarcoma',
          symptoms: ['fraqueza', 'gengivas pálidas', 'perda de peso', 'abdômen distendido', 'colapso'],
          description: 'Câncer maligno do baço que pode se espalhar rapidamente.',
          treatment: 'Cirurgia para remover o baço, quimioterapia e cuidados paliativos.'
        }
      ]
    },
    'Pâncreas': {
      diseases: [
        {
          name: 'Pancreatite',
          symptoms: ['vômitos', 'diarreia', 'dor abdominal', 'perda de apetite', 'desidratação', 'fraqueza'],
          description: 'Inflamação do pâncreas que pode ser aguda ou crônica.',
          treatment: 'Hospitalização, fluidoterapia, analgésicos, antieméticos e dieta especial.'
        },
        {
          name: 'Diabetes Mellitus',
          symptoms: ['aumento da sede', 'aumento da urina', 'perda de peso', 'aumento do apetite', 'fraqueza'],
          description: 'Doença que afeta a produção ou ação da insulina, levando a altos níveis de açúcar no sangue.',
          treatment: 'Insulina, dieta especial, exercícios regulares e monitoramento constante da glicemia.'
        }
      ]
    },
    'Intestino': {
      diseases: [
        {
          name: 'Enterite',
          symptoms: ['diarreia', 'vômitos', 'perda de apetite', 'dor abdominal', 'desidratação'],
          description: 'Inflamação do intestino que pode ser causada por infecções, parasitas ou alergias.',
          treatment: 'Fluidoterapia, dieta especial, medicamentos para controlar os sintomas e tratar a causa.'
        },
        {
          name: 'Obstrução Intestinal',
          symptoms: ['vômitos', 'diarreia ou constipação', 'dor abdominal', 'perda de apetite', 'fraqueza'],
          description: 'Bloqueio do intestino que pode ser causado por corpos estranhos ou tumores.',
          treatment: 'Emergência cirúrgica em muitos casos, fluidoterapia e cuidados intensivos.'
        }
      ]
    },
    'Estômago': {
      diseases: [
        {
          name: 'Gastrite',
          symptoms: ['vômitos', 'perda de apetite', 'dor abdominal', 'fraqueza', 'desidratação'],
          description: 'Inflamação do estômago que pode ser aguda ou crônica.',
          treatment: 'Dieta especial, antieméticos, protetores gástricos e tratamento da causa específica.'
        },
        {
          name: 'Úlcera Gástrica',
          symptoms: ['vômitos com sangue', 'dor abdominal', 'perda de apetite', 'fraqueza', 'gengivas pálidas'],
          description: 'Feridas no revestimento do estômago que podem causar hemorragia.',
          treatment: 'Medicamentos para reduzir a acidez, protetores gástricos, dieta especial e tratamento da causa.'
        }
      ]
    }
  };

  const analyzeSymptoms = (organ, symptoms, petType) => {
    const diseases = organDiseases[organ].diseases;
    const matchingDiseases = diseases.filter(disease => 
      disease.symptoms.some(symptom => 
        symptoms.toLowerCase().includes(symptom.toLowerCase())
      ) && (!disease.commonIn || disease.commonIn.includes(petType))
    );

    if (matchingDiseases.length === 0) {
      return {
        text: `Não identifiquei sintomas específicos de doenças comuns do ${organ.toLowerCase()} nos sintomas descritos. Por favor, descreva com mais detalhes o que você observou.`,
        severity: 'baixa'
      };
    }

    const response = matchingDiseases.map(disease => `
      Possível diagnóstico: ${disease.name}
      Descrição: ${disease.description}
      Sintomas observados: ${disease.symptoms.join(', ')}
      Tratamento recomendado: ${disease.treatment}
      ${disease.commonIn ? `Mais comum em: ${disease.commonIn.map(pet => petTypes[pet].name).join(', ')}` : ''}
    `).join('\n\n');

    return {
      text: `Com base nos sintomas descritos, identifiquei as seguintes possibilidades para o ${organ.toLowerCase()}:\n\n${response}\n\nLembre-se que este é apenas um diagnóstico preliminar. É fundamental consultar um veterinário para um exame completo e diagnóstico preciso.`,
      severity: matchingDiseases.some(d => d.name.includes('câncer') || d.name.includes('torsão')) ? 'alta' : 'média'
    };
  };

  const emojis = {
    pets: ['🐕', '🐈', '🐹', '🐰', '🦜', '🐠', '🐢', '🐍'],
    emotions: ['😊', '😢', '🤒', '🤢', '🤕', '😴', '😋', '❤️'],
    actions: ['🏥', '💊', '💉', '🩺', '📝', '📅', '📸', '🔍'],
    nature: ['🌿', '🌞', '🌙', '💧', '❄️', '🔥', '⚡', '🌈']
  };

  const themes = {
    rosa: {
      primary: '#FF69B4',
      secondary: '#FFB6C1',
      background: '#FFF0F5',
      text: '#4A4A4A',
      accent: '#FF1493'
    },
    laranja: {
      primary: '#FFA500',
      secondary: '#FFD700',
      background: '#FFF8DC',
      text: '#4A4A4A',
      accent: '#FF8C00'
    },
    verde: {
      primary: '#2E8B57',
      secondary: '#98FB98',
      background: '#F0FFF0',
      text: '#4A4A4A',
      accent: '#228B22'
    },
    azul: {
      primary: '#1E90FF',
      secondary: '#87CEEB',
      background: '#F0F8FF',
      text: '#4A4A4A',
      accent: '#0000FF'
    },
    roxo: {
      primary: '#9370DB',
      secondary: '#DDA0DD',
      background: '#F8F0FF',
      text: '#4A4A4A',
      accent: '#800080'
    },
    marrom: {
      primary: '#8B4513',
      secondary: '#DEB887',
      background: '#F5F5DC',
      text: '#4A4A4A',
      accent: '#A52A2A'
    },
    turquesa: {
      primary: '#40E0D0',
      secondary: '#AFEEEE',
      background: '#E0FFFF',
      text: '#4A4A4A',
      accent: '#00CED1'
    },
    dourado: {
      primary: '#FFD700',
      secondary: '#FFE4B5',
      background: '#FFFACD',
      text: '#4A4A4A',
      accent: '#DAA520'
    }
  };

  const dogMessages = [
    "Au au! Vamos brincar? 🎾",
    "Woof! Quer um petisco? 🦴",
    "Au! Vamos passear? 🦮",
    "Woof woof! Hora do carinho! 🐾",
    "Au au! Vamos jogar? 🎮",
    "Woof! Quer ver um truque? 🎪",
    "Au! Vamos correr? 🏃‍♂️",
    "Woof woof! Hora da soneca! 😴"
  ];

  const handleDogClick = () => {
    const randomMessage = dogMessages[Math.floor(Math.random() * dogMessages.length)];
    setDogMessage(randomMessage);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !selectedImage) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      id: Date.now(),
      image: imagePreview
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setSelectedImage(null);
    setImagePreview(null);
    setTyping(true);

    try {
      let response;
      if (selectedImage) {
        response = await analyzeUltrasound(imagePreview);
      } else {
        response = await getVetResponse(input, petType);
      }

      const botMessage = {
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now() + 1
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro ao obter resposta:', error);
      const errorMessage = {
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now() + 1
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setTyping(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Aplicar tema escuro com cores personalizadas
    if (!isDarkMode) {
      document.documentElement.style.setProperty('--background-color', '#1a1a1a');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
      document.documentElement.style.setProperty('--accent-color', themes[themeColor].accent);
    } else {
      document.documentElement.style.setProperty('--background-color', themes[themeColor].background);
      document.documentElement.style.setProperty('--text-color', themes[themeColor].text);
      document.documentElement.style.setProperty('--accent-color', themes[themeColor].primary);
    }
  };

  const toggleThemeColor = (newTheme) => {
    setThemeColor(newTheme);
    // Aplicar novo tema com cores personalizadas
    document.documentElement.style.setProperty('--primary-color', themes[newTheme].primary);
    document.documentElement.style.setProperty('--secondary-color', themes[newTheme].secondary);
    document.documentElement.style.setProperty('--background-color', themes[newTheme].background);
    document.documentElement.style.setProperty('--text-color', themes[newTheme].text);
    document.documentElement.style.setProperty('--accent-color', themes[newTheme].accent);
  };

  const clearChat = () => {
    setMessages([]);
    setFavorites([]);
    setAnalysisMode('chat');
  };

  const toggleFavorite = (messageId) => {
    setFavorites(prev => 
      prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const addEmoji = (emoji) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const closeAllPanels = () => {
    setShowSettings(false);
    setShowHistory(false);
    setShowScheduler(false);
    setShowPetProfile(false);
    setShowEmergency(false);
    setShowHelp(false);
    setShowResourceLibrary(false);
    setShowFoodGuide(false);
    setShowClinicMap(false);
    setShowGames(false);
  };

  const handlePanelToggle = (panel) => {
    // Se o painel já estiver aberto, fecha todos os painéis (volta para o chat)
    if (
      (panel === 'food' && showFoodGuide) ||
      (panel === 'clinic' && showClinicMap) ||
      (panel === 'games' && showGames) ||
      (panel === 'settings' && showSettings) ||
      (panel === 'history' && showHistory) ||
      (panel === 'scheduler' && showScheduler) ||
      (panel === 'petProfile' && showPetProfile) ||
      (panel === 'emergency' && showEmergency) ||
      (panel === 'help' && showHelp) ||
      (panel === 'resourceLibrary' && showResourceLibrary) ||
      (panel === 'achievements' && showAchievements)
    ) {
      closeAllPanels();
      setShowAchievements(false);
      return;
    }

    // Caso contrário, fecha todos os painéis e abre o novo
    closeAllPanels();
    switch (panel) {
      case 'food':
        setShowFoodGuide(true);
        break;
      case 'clinic':
        setShowClinicMap(true);
        break;
      case 'games':
        setShowGames(true);
        break;
      case 'settings':
        setShowSettings(true);
        break;
      case 'history':
        setShowHistory(true);
        break;
      case 'scheduler':
        setShowScheduler(true);
        break;
      case 'petProfile':
        setShowPetProfile(true);
        break;
      case 'emergency':
        setShowEmergency(true);
        break;
      case 'help':
        setShowHelp(true);
        break;
      case 'resourceLibrary':
        setShowResourceLibrary(true);
        break;
      case 'achievements':
        setShowAchievements(true);
        break;
    }
  };

  const handleOrganSelect = (e) => {
    const selectedOrgan = e.target.value;
    setSelectedOrgan(selectedOrgan);
    
    if (selectedOrgan) {
      // Cria uma mensagem automática perguntando sobre o órgão selecionado
      const autoMessage = {
        text: `Me conte sobre os sintomas que seu ${petTypes[petType].name.toLowerCase()} está sentindo no ${selectedOrgan.toLowerCase()}. Descreva em detalhes o que você observou.`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now()
      };

      setMessages(prev => [...prev, autoMessage]);
      scrollToBottom();
    }
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'} ${themeColor}`}>
      <div className="dog-3d" onClick={handleDogClick}>🐕</div>
      <div className="dog-speech">{dogMessage}</div>
      <header className="App-header">
        <div className="header-left">
          <span className="pet-icon">{petTypes[petType].emoji}</span>
          <h1>VetAI - Assistente Veterinário</h1>
        </div>
        <div className="header-right">
          <button 
            className="menu-button"
            onClick={() => handlePanelToggle('history')}
            title="Histórico de Consultas"
          >
            📋 Histórico
          </button>
          
          <button 
            className="menu-button"
            onClick={() => handlePanelToggle('petProfile')}
            title="Perfil do Pet"
          >
            🐾 Perfil
          </button>
          
          <button 
            className="menu-button"
            onClick={() => handlePanelToggle('scheduler')}
            title="Agendar Consulta"
          >
            📅 Agendar
          </button>
          
          <button 
            className="menu-button"
            onClick={() => handlePanelToggle('settings')}
            title="Configurações"
          >
            ⚙️ Config
          </button>
          
          <button 
            className="menu-button"
            onClick={clearChat}
            title="Limpar Conversa"
          >
            🧹 Limpar
          </button>
          
          <button 
            className="menu-button"
            onClick={() => handlePanelToggle('help')}
            title="Ajuda"
          >
            ❓ Ajuda
          </button>
          
          <button 
            className="menu-button"
            onClick={() => handlePanelToggle('emergency')}
            title="Emergência"
          >
            🚨 Emergência
          </button>
          
          <button 
            className="menu-button"
            onClick={() => handlePanelToggle('resourceLibrary')}
            title="Biblioteca de Recursos"
          >
            📚 Biblioteca
          </button>
          
          <button 
            className="menu-button achievements"
            onClick={() => handlePanelToggle('achievements')}
            title="Conquistas"
          >
            🏆 Conquistas
          </button>
          
          <button 
            className="header-button"
            onClick={() => handlePanelToggle('food')}
          >
            🍖 Alimentação
          </button>
          
          <button 
            className="header-button"
            onClick={() => handlePanelToggle('clinic')}
          >
            🏥 Clínicas
          </button>
          
          <button 
            className="header-button"
            onClick={() => handlePanelToggle('games')}
          >
            🎮 Jogos
          </button>
        </div>
      </header>
      
      {showSettings && (
        <div className="settings-panel">
          <h3>Configurações</h3>
          <div className="setting-item">
            <label>Modo Escuro</label>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
          </div>
          <div className="setting-item">
            <label>Tema de Cores</label>
            <div className="theme-picker">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  className={`theme-button ${themeColor === key ? 'active' : ''}`}
                  onClick={() => toggleThemeColor(key)}
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                    border: `2px solid ${theme.accent}`,
                    boxShadow: themeColor === key ? `0 0 10px ${theme.accent}` : 'none'
                  }}
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                >
                  <span className="theme-emoji">
                    {key === 'rosa' ? '🌸' :
                     key === 'laranja' ? '🍊' :
                     key === 'verde' ? '🌿' :
                     key === 'azul' ? '💙' :
                     key === 'roxo' ? '💜' :
                     key === 'marrom' ? '🌰' :
                     key === 'turquesa' ? '🌊' :
                     '🌟'}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="setting-item">
            <label>Tipo de Pet</label>
            <select value={petType} onChange={(e) => setPetType(e.target.value)}>
              {Object.entries(petTypes).map(([key, { emoji, name }]) => (
                <option key={key} value={key}>
                  {name} {emoji}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="history-panel">
          <h3>Histórico de Conversas</h3>
          <div className="history-list">
            {messages.map((message) => (
              <div key={message.id} className="history-item">
                <span className="history-timestamp">{message.timestamp}</span>
                <span className="history-message">{message.text}</span>
                <button 
                  className={`favorite-button ${favorites.includes(message.id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(message.id)}
                  title={favorites.includes(message.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  {favorites.includes(message.id) ? '⭐' : '☆'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showScheduler && (
        <AppointmentScheduler />
      )}

      {showPetProfile && (
        <PetProfile />
      )}

      {showEmergency && (
        <EmergencyPanel 
          isOpen={showEmergency}
          onClose={() => setShowEmergency(false)}
        />
      )}

      {showHelp && (
        <HelpPanel 
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        />
      )}

      {showResourceLibrary && (
        <ResourceLibrary />
      )}

      {showFoodGuide && (
        <FoodGuide />
      )}

      {showClinicMap && <ClinicMap />}

      {showGames && <GamesAndActivities />}

      {showAchievements && (
        <div className="panel">
          <Achievements />
        </div>
      )}

      {!showSettings && !showHistory && !showScheduler && !showPetProfile && !showEmergency && !showHelp && !showResourceLibrary && !showFoodGuide && !showClinicMap && !showGames && !showAchievements && (
        <div className="chat-container">
          <div className="messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.image && (
                  <div className="ultrasound-image">
                    <img src={message.image} alt="Ultrassom" />
                  </div>
                )}
                <div className="message-content">
                  {message.text}
                  <span className="message-timestamp">{message.timestamp}</span>
                </div>
                <div className="message-actions">
                  <span className="message-icon">
                    {message.sender === 'user' ? '👤' : '🤖'}
                  </span>
                </div>
              </div>
            ))}
            {typing && (
              <div className="typing-indicator">
                <span>Digitando</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="input-form">
            <div className="input-container">
              <button 
                type="button" 
                className="emoji-button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                title="Inserir emoji"
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="emoji-picker">
                  {Object.entries(emojis).map(([category, emojiList]) => (
                    <div key={category} className="emoji-category">
                      <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                      <div className="emoji-grid">
                        {emojiList.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            className="emoji-option"
                            onClick={() => addEmoji(emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Digite sua mensagem sobre seu ${petTypes[petType].name.toLowerCase()}...`}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="upload-button"
                onClick={() => fileInputRef.current?.click()}
                title="Anexar imagem de ultrassom"
              >
                📷
              </button>
            </div>
            <button type="submit" title="Enviar mensagem">
              ✉️
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
