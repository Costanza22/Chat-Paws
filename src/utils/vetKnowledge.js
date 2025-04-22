// Base de conhecimento veterinário
const vetKnowledge = {
  emergency: {
    keywords: ['sangue', 'vômito', 'desmaiou', 'convulsão', 'atropelado', 'caiu', 'envenenado', 'não respira', 'não acorda'],
    response: 'ATENÇÃO: Isso parece uma emergência! Por favor, leve seu pet imediatamente ao veterinário mais próximo. Enquanto isso, mantenha a calma e:'
  },
  
  topics: {
    vacinacao: {
      title: 'Vacinação',
      content: 'A vacinação é essencial para a saúde do seu pet. As principais vacinas são: V8/V10 para cães e V3/V4 para gatos.',
      related: ['vermifugacao', 'prevencao']
    },
    alimentacao: {
      title: 'Alimentação',
      content: 'Uma alimentação balanceada é fundamental. Ofereça ração de qualidade adequada à idade e porte do seu pet.',
      related: ['nutricao', 'dieta']
    },
    higiene: {
      title: 'Higiene',
      content: 'Mantenha seu pet sempre limpo com banhos regulares e escovação dos dentes.',
      related: ['saude', 'cuidados']
    },
    exercicios: {
      title: 'Exercícios',
      content: 'Exercícios diários são importantes para a saúde física e mental do seu pet.',
      related: ['saude', 'comportamento']
    }
  }
};

// Verifica se é uma emergência
export const checkEmergency = (message) => {
  const lowercaseMsg = message.toLowerCase();
  return vetKnowledge.emergency.keywords.some(keyword => 
    lowercaseMsg.includes(keyword)
  );
};

// Encontra a melhor resposta baseada no input
export const findBestResponse = (message) => {
  const lowercaseMsg = message.toLowerCase();
  
  // Procura por palavras-chave nos tópicos
  for (const [key, topic] of Object.entries(vetKnowledge.topics)) {
    if (lowercaseMsg.includes(key) || 
        lowercaseMsg.includes(topic.title.toLowerCase())) {
      return {
        content: topic.content,
        relatedTopics: topic.related
      };
    }
  }

  // Resposta padrão se nenhum tópico específico for encontrado
  return {
    content: 'Desculpe, não encontrei informações específicas sobre isso. Posso ajudar com vacinação, alimentação, higiene ou exercícios.',
    relatedTopics: ['vacinacao', 'alimentacao', 'higiene', 'exercicios']
  };
};

// Gera perguntas de acompanhamento baseadas no contexto
export const generateFollowUp = (topic) => {
  const followUps = {
    vacinacao: 'Gostaria de saber mais sobre o calendário de vacinação?',
    alimentacao: 'Quer conhecer dicas para uma alimentação saudável?',
    higiene: 'Posso te dar mais informações sobre cuidados de higiene?',
    exercicios: 'Quer saber mais sobre atividades físicas recomendadas?',
    default: 'Posso ajudar com mais alguma informação?'
  };

  return followUps[topic] || followUps.default;
};

export default {
  checkEmergency,
  findBestResponse,
  generateFollowUp
}; 