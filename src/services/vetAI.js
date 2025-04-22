const vetResponses = {
  cumprimentos: [
    "Olá! Como posso ajudar seu pet hoje?",
    "Oi! Estou aqui para ajudar com qualquer dúvida sobre seu pet.",
    "Bem-vindo! Como está seu pet hoje?"
  ],
  sintomas: {
    "vômito": "Se seu pet está vomitando, é importante observar a frequência e o aspecto do vômito. Se for frequente ou contiver sangue, procure um veterinário imediatamente.",
    "diarreia": "Diarreia pode ser causada por diversos fatores. Mantenha seu pet hidratado e, se persistir por mais de 24 horas, consulte um veterinário.",
    "coceira": "Coceira excessiva pode indicar alergias ou problemas de pele. Verifique se há vermelhidão ou feridas na pele."
  },
  emergencias: [
    "convulsão",
    "dificuldade para respirar",
    "sangramento intenso",
    "inconsciência"
  ]
};

export const getVetResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  // Verifica se é um cumprimento
  if (lowerMessage.includes("oi") || lowerMessage.includes("olá") || lowerMessage.includes("bom dia") || lowerMessage.includes("boa tarde") || lowerMessage.includes("boa noite")) {
    return vetResponses.cumprimentos[Math.floor(Math.random() * vetResponses.cumprimentos.length)];
  }

  // Verifica sintomas específicos
  for (const [sintoma, resposta] of Object.entries(vetResponses.sintomas)) {
    if (lowerMessage.includes(sintoma)) {
      return resposta;
    }
  }

  // Verifica emergências
  for (const emergencia of vetResponses.emergencias) {
    if (lowerMessage.includes(emergencia)) {
      return "Isso parece uma emergência! Por favor, leve seu pet ao veterinário imediatamente ou entre em contato com um hospital veterinário 24 horas.";
    }
  }

  // Resposta padrão
  return "Entendi sua preocupação. Para um diagnóstico mais preciso, recomendo que você consulte um veterinário. Posso ajudar com informações gerais sobre cuidados com pets.";
}; 