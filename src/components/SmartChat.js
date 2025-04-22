import React, { useState, useRef, useEffect } from 'react';
import './SmartChat.css';
import { 
  checkEmergency,
  findBestResponse,
  generateFollowUp
} from '../utils/chatUtils';

const SmartChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      content: inputValue.trim(),
      type: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const isEmergency = checkEmergency(inputValue);
      const response = await findBestResponse(inputValue);
      const followUp = generateFollowUp(response);

      const assistantMessage = {
        content: response,
        type: 'assistant',
        isEmergency,
        timestamp: new Date().toLocaleTimeString()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        if (followUp) {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              content: followUp,
              type: 'assistant',
              timestamp: new Date().toLocaleTimeString()
            }]);
          }, 1000);
        }
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.type} ${message.isEmergency ? 'emergency' : ''}`}
          >
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
        {isTyping && (
          <div className="message assistant">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={isTyping}
        />
        <button 
          type="submit" 
          disabled={!inputValue.trim() || isTyping}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default SmartChat; 