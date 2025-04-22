import React from 'react';
import './EmergencyPanel.css';

const EmergencyPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const emergencyContacts = [
    {
      name: "Hospital Veterinário 24h",
      phone: "(11) 9999-9999",
      address: "Rua das Flores, 123 - Centro"
    },
    {
      name: "Clínica de Emergência",
      phone: "(11) 8888-8888",
      address: "Av. Principal, 456 - Vila Nova"
    },
    {
      name: "Veterinário de Plantão",
      phone: "(11) 7777-7777",
      address: "Rua das Árvores, 789 - Jardim"
    }
  ];

  const emergencyProcedures = [
    "Verifique os sinais vitais do animal",
    "Se necessário, aplique primeiros socorros",
    "Entre em contato com um dos veterinários de emergência",
    "Prepare os documentos do animal para a consulta",
    "Transporte o animal com segurança até o local de atendimento"
  ];

  return (
    <div className="emergency-panel">
      <div className="emergency-header">
        <h2>Emergência Veterinária</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="emergency-content">
        <section className="emergency-contacts">
          <h3>Contatos de Emergência</h3>
          <div className="contacts-list">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="contact-card">
                <h4>{contact.name}</h4>
                <p>Telefone: {contact.phone}</p>
                <p>Endereço: {contact.address}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="emergency-procedures">
          <h3>Procedimentos de Emergência</h3>
          <ul className="procedures-list">
            {emergencyProcedures.map((procedure, index) => (
              <li key={index}>{procedure}</li>
            ))}
          </ul>
        </section>

        <section className="emergency-warning">
          <h3>Importante</h3>
          <p>
            Em caso de emergência, entre em contato imediatamente com um veterinário. 
            Este painel serve apenas como guia inicial. Em situações críticas, 
            é essencial buscar atendimento presencial o mais rápido possível.
          </p>
        </section>
      </div>
    </div>
  );
};

export default EmergencyPanel; 