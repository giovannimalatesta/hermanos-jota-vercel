import React, { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className={`toast toast-${type}`} role="alert" aria-live="polite">
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-message">{message}</span>
      <button 
        className="toast-close" 
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ✕
      </button>
    </div>
  );
}

