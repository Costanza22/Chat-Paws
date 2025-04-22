import React from 'react';
import './SocialShare.css';

const SocialShare = ({ message = "Conheça o ChatPaws - Seu Assistente Veterinário Virtual!" }) => {
  const shareUrl = window.location.href;
  
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      'facebook-share-dialog',
      'width=626,height=436'
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(shareUrl)}`,
      'twitter-share-dialog',
      'width=626,height=436'
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message + ' ' + shareUrl)}`,
      'whatsapp-share-dialog',
      'width=626,height=436'
    );
  };

  const shareOnInstagram = () => {
    // Instagram não permite compartilhamento direto via URL
    // Vamos abrir o app ou site do Instagram
    window.open('https://www.instagram.com/', '_blank');
  };

  return (
    <div className="social-share-panel">
      <h3>Compartilhe o ChatPaws</h3>
      <div className="share-buttons">
        <button 
          className="share-button facebook"
          onClick={shareOnFacebook}
          title="Compartilhar no Facebook"
        >
          <span className="icon">📘</span>
        </button>
        
        <button 
          className="share-button instagram"
          onClick={shareOnInstagram}
          title="Compartilhar no Instagram"
        >
          <span className="icon">📸</span>
        </button>
        
        <button 
          className="share-button twitter"
          onClick={shareOnTwitter}
          title="Compartilhar no Twitter"
        >
          <span className="icon">🐦</span>
        </button>
        
        <button 
          className="share-button whatsapp"
          onClick={shareOnWhatsApp}
          title="Compartilhar no WhatsApp"
        >
          <span className="icon">💬</span>
        </button>
      </div>
    </div>
  );
};

export default SocialShare; 