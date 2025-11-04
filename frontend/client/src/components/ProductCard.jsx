import React, { useState } from 'react';

export default function ProductCard({ producto, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => onClick?.(producto);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(producto);
    }
  };

  return (
    <article 
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Ver detalles de ${producto.nombre}, $${producto.precio}`}
    >
      <div className="product-image-wrapper">
        {!imageLoaded && !imageError && (
          <div className="skeleton skeleton-image"></div>
        )}
        {imageError ? (
          <div className="image-error">
            <span>🖼️</span>
            <p>Imagen no disponible</p>
          </div>
        ) : (
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            className={imageLoaded ? 'loaded' : ''}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        <div className="product-badge">Nuevo</div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{producto.nombre}</h3>
        {producto.precio != null && (
          <div className="price" aria-label={`Precio: ${producto.precio} dólares`}>
            ${producto.precio.toLocaleString()}
          </div>
        )}
        <span className="details-link" aria-hidden="true">
          Ver detalle
          <span> →</span>
        </span>
      </div>
    </article>
  );
}

