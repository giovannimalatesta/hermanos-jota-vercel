import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyState({ 
  icon = '📦', 
  title = 'No hay resultados', 
  message = 'No encontramos lo que buscas',
  actionText,
  actionLink 
}) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="button primary">
          {actionText}
        </Link>
      )}
    </div>
  );
}

