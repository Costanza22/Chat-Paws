import React, { useState } from 'react';
import './FoodGuide.css';

const FoodGuide = () => {
  const [activeTab, setActiveTab] = useState('nutritional');

  const nutritionalTable = {
    cachorro: [
      { nutriente: 'Proteínas', quantidade: '18-25%', fonte: 'Carnes, ovos, peixes' },
      { nutriente: 'Gorduras', quantidade: '10-15%', fonte: 'Óleos vegetais, peixes' },
      { nutriente: 'Carboidratos', quantidade: '30-50%', fonte: 'Arroz, batata, vegetais' },
      { nutriente: 'Fibras', quantidade: '2-4%', fonte: 'Vegetais, frutas' },
      { nutriente: 'Cálcio', quantidade: '0.5-1%', fonte: 'Ossos, laticínios' },
      { nutriente: 'Fósforo', quantidade: '0.4-0.8%', fonte: 'Carnes, peixes' }
    ],
    gato: [
      { nutriente: 'Proteínas', quantidade: '26-30%', fonte: 'Carnes, peixes' },
      { nutriente: 'Gorduras', quantidade: '15-20%', fonte: 'Óleos, peixes' },
      { nutriente: 'Carboidratos', quantidade: '20-30%', fonte: 'Arroz, vegetais' },
      { nutriente: 'Fibras', quantidade: '1-3%', fonte: 'Vegetais' },
      { nutriente: 'Taurina', quantidade: '0.1%', fonte: 'Carnes, peixes' },
      { nutriente: 'Ácido Araquidônico', quantidade: '0.02%', fonte: 'Gorduras animais' }
    ]
  };

  const forbiddenFoods = [
    { alimento: 'Chocolate', motivo: 'Contém teobromina, tóxica para pets' },
    { alimento: 'Cebola e Alho', motivo: 'Causam anemia hemolítica' },
    { alimento: 'Uvas e Passas', motivo: 'Podem causar insuficiência renal' },
    { alimento: 'Abacate', motivo: 'Contém persina, tóxica para pets' },
    { alimento: 'Café e Chá', motivo: 'Contêm cafeína, prejudicial ao sistema nervoso' },
    { alimento: 'Álcool', motivo: 'Altamente tóxico para pets' },
    { alimento: 'Nozes', motivo: 'Podem causar problemas digestivos' },
    { alimento: 'Leite e Derivados', motivo: 'Muitos pets são intolerantes à lactose' }
  ];

  const recipes = [
    {
      nome: 'Ração Caseira Básica',
      ingredientes: [
        '500g de carne moída',
        '1 xícara de arroz integral cozido',
        '1/2 xícara de cenoura ralada',
        '1/2 xícara de abóbora cozida',
        '1 colher de sopa de óleo de coco'
      ],
      preparo: 'Cozinhe a carne, misture com os outros ingredientes e sirva em temperatura ambiente.',
      porcao: 'Para 2-3 dias'
    },
    {
      nome: 'Biscoitos Naturais',
      ingredientes: [
        '2 xícaras de farinha integral',
        '1/2 xícara de fígado cozido e moído',
        '1 ovo',
        '1/4 xícara de água'
      ],
      preparo: 'Misture todos os ingredientes, forme biscoitos e asse por 20 minutos a 180°C.',
      porcao: '15-20 biscoitos'
    }
  ];

  const feedingSchedule = {
    filhote: [
      { horario: '07:00', quantidade: '1/4 xícara' },
      { horario: '11:00', quantidade: '1/4 xícara' },
      { horario: '15:00', quantidade: '1/4 xícara' },
      { horario: '19:00', quantidade: '1/4 xícara' }
    ],
    adulto: [
      { horario: '07:00', quantidade: '1/2 xícara' },
      { horario: '19:00', quantidade: '1/2 xícara' }
    ],
    idoso: [
      { horario: '07:00', quantidade: '1/3 xícara' },
      { horario: '13:00', quantidade: '1/3 xícara' },
      { horario: '19:00', quantidade: '1/3 xícara' }
    ]
  };

  return (
    <div className="food-guide">
      <div className="guide-header">
        <h2>Guia de Alimentação</h2>
        <div className="guide-tabs">
          <button 
            className={`tab-button ${activeTab === 'nutritional' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutritional')}
          >
            Tabela Nutricional
          </button>
          <button 
            className={`tab-button ${activeTab === 'recipes' ? 'active' : ''}`}
            onClick={() => setActiveTab('recipes')}
          >
            Receitas Caseiras
          </button>
          <button 
            className={`tab-button ${activeTab === 'forbidden' ? 'active' : ''}`}
            onClick={() => setActiveTab('forbidden')}
          >
            Alimentos Proibidos
          </button>
          <button 
            className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            Cronograma
          </button>
        </div>
      </div>

      <div className="guide-content">
        {activeTab === 'nutritional' && (
          <div className="nutritional-table">
            <h3>Tabela Nutricional</h3>
            <table>
              <thead>
                <tr>
                  <th>Nutriente</th>
                  <th>Quantidade</th>
                  <th>Fonte</th>
                </tr>
              </thead>
              <tbody>
                {nutritionalTable.cachorro.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nutriente}</td>
                    <td>{item.quantidade}</td>
                    <td>{item.fonte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'recipes' && (
          <div className="recipes-list">
            <h3>Receitas Caseiras</h3>
            {recipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <h4>{recipe.nome}</h4>
                <div className="recipe-ingredients">
                  <h5>Ingredientes:</h5>
                  <ul>
                    {recipe.ingredientes.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="recipe-preparation">
                  <h5>Modo de Preparo:</h5>
                  <p>{recipe.preparo}</p>
                </div>
                <div className="recipe-portion">
                  <h5>Rendimento:</h5>
                  <p>{recipe.porcao}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'forbidden' && (
          <div className="forbidden-foods">
            <h3>Alimentos Proibidos</h3>
            <div className="forbidden-list">
              {forbiddenFoods.map((food, index) => (
                <div key={index} className="forbidden-item">
                  <h4>{food.alimento}</h4>
                  <p>{food.motivo}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="feeding-schedule">
            <h3>Cronograma de Alimentação</h3>
            <div className="schedule-tabs">
              <button className="schedule-tab active">Filhote</button>
              <button className="schedule-tab">Adulto</button>
              <button className="schedule-tab">Idoso</button>
            </div>
            <div className="schedule-content">
              <table>
                <thead>
                  <tr>
                    <th>Horário</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {feedingSchedule.filhote.map((item, index) => (
                    <tr key={index}>
                      <td>{item.horario}</td>
                      <td>{item.quantidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodGuide; 