// Lista de palavras-chave que indicam emergência
const emergencyKeywords = [
  'sangramento', 'sangue', 'acidente', 'atropelamento', 'envenenamento',
  'veneno', 'convulsão', 'desmaio', 'não respira', 'não está respirando',
  'parou de respirar', 'engasgou', 'quebrou', 'fratura', 'caiu',
  'não levanta', 'não consegue levantar', 'vomitando sangue'
];

// Verifica se a mensagem contém palavras-chave de emergência
export const checkEmergency = (message) => {
  const lowercaseMessage = message.toLowerCase();
  return emergencyKeywords.some(keyword => lowercaseMessage.includes(keyword));
};

// Encontra a melhor resposta baseada na mensagem do usuário
export const findBestResponse = async (message) => {
  const lowercaseMessage = message.toLowerCase();
  
  if (checkEmergency(message)) {
    if (lowercaseMessage.includes('sangue') || lowercaseMessage.includes('sangramento')) {
      return '🚨 EMERGÊNCIA: Sangramento é uma situação grave! Por favor:\n' +
             '1. Mantenha a calma\n' +
             '2. Aplique pressão no local do sangramento com um pano limpo\n' +
             '3. Procure atendimento veterinário IMEDIATAMENTE\n' +
             '4. Evite movimentar o animal se houver suspeita de trauma interno\n\n' +
             'Você pode encontrar clínicas veterinárias 24h na seção "Clínicas" do menu.';
    }
    
    return '⚠️ EMERGÊNCIA DETECTADA: Por favor, procure atendimento veterinário imediatamente! ' +
           'Enquanto isso, mantenha a calma e evite movimentar o animal se houver suspeita de trauma. ' +
           'Você pode encontrar clínicas veterinárias próximas na seção "Clínicas" do menu.';
  }

  // Aqui você pode implementar a lógica de processamento da mensagem
  // Por enquanto, retornaremos uma resposta simples
  return 'Entendi sua mensagem. Como posso ajudar mais?';
};

// Gera perguntas de acompanhamento baseadas na resposta
export const generateFollowUp = (response) => {
  if (response.includes('EMERGÊNCIA')) {
    return 'Você precisa de ajuda para encontrar uma clínica veterinária próxima?';
  }
  
  // Aqui você pode implementar a lógica para gerar perguntas de acompanhamento
  // Por enquanto, retornaremos null para não gerar follow-up
  return null;
}; 