import React from 'react';
import './HelpPanel.css';

const HelpPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqItems = [
    {
      question: "Como usar o chat?",
      answer: "Digite sua mensagem na caixa de texto e clique em enviar. Você pode descrever sintomas, fazer perguntas ou enviar imagens de ultrassom."
    },
    {
      question: "Como adicionar um pet?",
      answer: "Clique no botão 'Perfil' e preencha o formulário com as informações do seu pet. Você pode adicionar fotos e documentos importantes."
    },
    {
      question: "Como agendar uma consulta?",
      answer: "Clique no botão 'Agendar' e selecione a data e horário desejados. Preencha os detalhes da consulta e confirme o agendamento."
    },
    {
      question: "O que fazer em caso de emergência?",
      answer: "Clique no botão 'Emergência' para ver os contatos de emergência e clínicas 24h próximas a você."
    }
  ];

  const quickTips = [
    "Mantenha o histórico de vacinas atualizado",
    "Registre todas as consultas e tratamentos",
    "Adicione fotos recentes do seu pet",
    "Mantenha os documentos importantes digitalizados"
  ];

  return (
    <div className="help-panel">
      <div className="help-header">
        <h2>Central de Ajuda</h2>
        <button className="close-button" onClick={onClose}>✕</button>
      </div>
      
      <div className="help-content">
        <section className="faq-section">
          <h3>Perguntas Frequentes</h3>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tips-section">
          <h3>Dicas Rápidas</h3>
          <ul className="tips-list">
            {quickTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className="contact-section">
          <h3>Contato</h3>
          <p>Precisa de mais ajuda? Entre em contato conosco:</p>
          <div className="contact-info">
            <p>📧 suporte@vetai.com</p>
            <p>📞 (11) 9999-9999</p>
            <p>🕒 Segunda a Sexta, 9h às 18h</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPanel; 