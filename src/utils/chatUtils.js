// Lista de palavras-chave que indicam emergência
const emergencyKeywords = [
  'sangramento', 'sangue', 'acidente', 'atropelamento', 'envenenamento',
  'veneno', 'convulsão', 'desmaio', 'inconsciente', 'não respira',
  'dificuldade respirar', 'engasgado', 'quebrado', 'fratura', 'caiu',
  'intoxicação', 'intoxicado', 'vômito', 'diarreia', 'febre alta'
];

// Verifica se a mensagem contém palavras que indicam emergência
export const checkEmergency = (message) => {
  const lowercaseMessage = message.toLowerCase();
  return emergencyKeywords.some(keyword => 
    lowercaseMessage.includes(keyword.toLowerCase())
  );
};

// Base de conhecimento simplificada
const knowledgeBase = {
  alimentacao: [
    'A alimentação adequada é essencial para a saúde do seu pet.',
    'Mantenha sempre água fresca disponível.',
    'Evite dar alimentos humanos ao seu pet.',
    'Consulte um veterinário para a melhor dieta.'
  ],
  saude: [
    'Mantenha as vacinas em dia.',
    'Faça check-ups regulares.',
    'Observe mudanças no comportamento.',
    'Mantenha a higiene do seu pet.'
  ],
  comportamento: [
    'Estabeleça uma rotina.',
    'Use reforço positivo.',
    'Socialize seu pet desde cedo.',
    'Proporcione exercícios regulares.'
  ]
};

// Encontra a melhor resposta baseada na mensagem
export const findBestResponse = (message) => {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('comida') || lowercaseMessage.includes('alimentação')) {
    return knowledgeBase.alimentacao[Math.floor(Math.random() * knowledgeBase.alimentacao.length)];
  }
  
  if (lowercaseMessage.includes('saúde') || lowercaseMessage.includes('doente')) {
    return knowledgeBase.saude[Math.floor(Math.random() * knowledgeBase.saude.length)];
  }
  
  if (lowercaseMessage.includes('comportamento') || lowercaseMessage.includes('treinamento')) {
    return knowledgeBase.comportamento[Math.floor(Math.random() * knowledgeBase.comportamento.length)];
  }
  
  return 'Posso ajudar com informações sobre alimentação, saúde e comportamento do seu pet. Como posso te auxiliar?';
};

// Gera perguntas de acompanhamento baseadas no contexto
export const generateFollowUp = (originalMessage, response) => {
  const lowercaseMessage = originalMessage.toLowerCase();
  
  if (lowercaseMessage.includes('comida') || lowercaseMessage.includes('alimentação')) {
    return 'Você gostaria de saber mais sobre dietas específicas para seu pet?';
  }
  
  if (lowercaseMessage.includes('saúde') || lowercaseMessage.includes('doente')) {
    return 'Quando foi a última vez que seu pet passou por um check-up veterinário?';
  }
  
  if (lowercaseMessage.includes('comportamento') || lowercaseMessage.includes('treinamento')) {
    return 'Você tem enfrentado algum desafio específico com o comportamento do seu pet?';
  }
  
  return null;
}; 