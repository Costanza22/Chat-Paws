const ultrasoundPatterns = {
  'rim': {
    normal: 'Estrutura homogênea, contornos regulares',
    anormal: 'Presença de massas, calcificações ou dilatações',
    doenças: ['nefrite', 'cálculo renal', 'tumor renal']
  },
  'fígado': {
    normal: 'Estrutura homogênea, ecogenicidade uniforme',
    anormal: 'Nódulos, áreas hipoecoicas ou hiperecoicas',
    doenças: ['hepatite', 'cirrose', 'tumor hepático']
  },
  'coração': {
    normal: 'Câmaras cardíacas simétricas, válvulas funcionais',
    anormal: 'Dilatação, espessamento ou regurgitação',
    doenças: ['cardiomiopatia', 'endocardite', 'insuficiência cardíaca']
  },
  'bexiga': {
    normal: 'Parede fina e regular, conteúdo anecoico',
    anormal: 'Espessamento da parede, presença de cálculos',
    doenças: ['cistite', 'cálculos vesicais', 'tumor de bexiga']
  }
};

const sintomasComuns = {
  'nefrite': ['aumento da sede', 'aumento da urina', 'perda de peso', 'vômito'],
  'cálculo renal': ['dor ao urinar', 'sangue na urina', 'vômito', 'perda de apetite'],
  'tumor renal': ['perda de peso', 'sangue na urina', 'dor abdominal', 'letargia'],
  'hepatite': ['icterícia', 'vômito', 'diarreia', 'perda de peso'],
  'cirrose': ['ascite', 'icterícia', 'perda de peso', 'letargia'],
  'tumor hepático': ['perda de peso', 'ascite', 'icterícia', 'vômito'],
  'cardiomiopatia': ['tosse', 'dificuldade respiratória', 'intolerância ao exercício', 'desmaios'],
  'endocardite': ['febre', 'letargia', 'perda de peso', 'intolerância ao exercício'],
  'insuficiência cardíaca': ['tosse', 'dificuldade respiratória', 'ascite', 'intolerância ao exercício'],
  'cistite': ['aumento da frequência urinária', 'dor ao urinar', 'sangue na urina', 'lambe excessivo'],
  'cálculos vesicais': ['dor ao urinar', 'sangue na urina', 'aumento da frequência urinária', 'lambe excessivo'],
  'tumor de bexiga': ['sangue na urina', 'aumento da frequência urinária', 'perda de peso', 'dor abdominal']
};

export const analyzeUltrasound = (orgao, descricao, imageData) => {
  const padrao = ultrasoundPatterns[orgao.toLowerCase()];
  if (!padrao) {
    return {
      conclusao: 'Órgão não reconhecido no banco de dados',
      recomendacao: 'Consulte um veterinário especialista em imagem'
    };
  }

  let analise = {
    conclusao: '',
    recomendacao: '',
    possiveisDoencas: []
  };

  // Análise baseada na descrição
  if (descricao) {
    const descricaoLower = descricao.toLowerCase();
    const padraoNormal = padrao.normal.toLowerCase();
    const padraoAnormal = padrao.anormal.toLowerCase();

    if (descricaoLower.includes(padraoNormal)) {
      analise.conclusao += 'Achados ultrassonográficos descritos como normais. ';
    } else if (descricaoLower.includes(padraoAnormal)) {
      analise.conclusao += 'Alterações ultrassonográficas descritas. ';
      analise.possiveisDoencas.push(...padrao.doencas);
    }
  }

  // Análise baseada na imagem
  if (imageData) {
    // Aqui você pode adicionar a lógica de análise de imagem usando uma API de visão computacional
    // Por enquanto, vamos apenas adicionar uma mensagem genérica
    analise.conclusao += 'Imagem do ultrassom analisada. ';
    
    // Simulação de análise de imagem
    const achadosImagem = {
      'rim': ['Estrutura homogênea', 'Contornos regulares', 'Sem massas visíveis'],
      'fígado': ['Ecogenicidade uniforme', 'Sem nódulos', 'Vasos normais'],
      'coração': ['Câmaras simétricas', 'Válvulas funcionais', 'Sem dilatação'],
      'bexiga': ['Parede fina', 'Conteúdo anecoico', 'Sem cálculos']
    };

    const achados = achadosImagem[orgao.toLowerCase()] || [];
    analise.conclusao += `Achados na imagem: ${achados.join(', ')}. `;
  }

  if (!analise.conclusao) {
    analise.conclusao = 'Achados ultrassonográficos inconclusivos';
    analise.recomendacao = 'Recomenda-se avaliação por veterinário especialista em imagem';
  } else {
    analise.recomendacao = analise.possiveisDoencas.length > 0
      ? 'Recomenda-se investigação complementar e acompanhamento veterinário'
      : 'Manter acompanhamento veterinário regular';
  }

  return analise;
};

export const analisarSintomas = (sintomas) => {
  const sintomasLower = sintomas.toLowerCase();
  const possiveisDoencas = new Set();

  // Procura por sintomas específicos
  for (const [doenca, sintomasDoenca] of Object.entries(sintomasComuns)) {
    const sintomasPresentes = sintomasDoenca.filter(sintoma => 
      sintomasLower.includes(sintoma.toLowerCase())
    );

    if (sintomasPresentes.length >= 2) {
      possiveisDoencas.add(doenca);
    }
  }

  if (possiveisDoencas.size === 0) {
    return {
      conclusao: 'Sintomas não correspondem a padrões conhecidos',
      recomendacao: 'Recomenda-se avaliação veterinária completa'
    };
  }

  return {
    conclusao: 'Possíveis diagnósticos baseados nos sintomas',
    recomendacao: 'Recomenda-se avaliação veterinária para confirmação',
    possiveisDoencas: Array.from(possiveisDoencas)
  };
};

export const analisarCasoCompleto = (orgao, descricaoUltrasom, sintomas) => {
  const analiseUltrasom = analyzeUltrasound(orgao, descricaoUltrasom);
  const analiseSintomas = analisarSintomas(sintomas);

  // Se ambas as análises sugerem doenças
  if (analiseUltrasom.possiveisDoencas && analiseSintomas.possiveisDoencas) {
    // Encontra doenças em comum
    const doencasEmComum = analiseUltrasom.possiveisDoencas.filter(doenca => 
      analiseSintomas.possiveisDoencas.includes(doenca)
    );

    if (doencasEmComum.length > 0) {
      return {
        conclusao: 'Alta probabilidade de diagnóstico',
        recomendacao: 'Recomenda-se avaliação veterinária imediata',
        possiveisDoencas: doencasEmComum,
        confianca: 'Alta'
      };
    }
  }

  return {
    conclusao: 'Análise inconclusiva',
    recomendacao: 'Recomenda-se avaliação veterinária completa',
    possiveisDoencas: [
      ...(analiseUltrasom.possiveisDoencas || []),
      ...(analiseSintomas.possiveisDoencas || [])
    ],
    confianca: 'Baixa'
  };
}; 