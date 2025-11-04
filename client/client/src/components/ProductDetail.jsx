import React, { useState } from "react";

export default function ProductDetail({ producto, onAddToCart, onBack }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!producto) return null;

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, Math.min(10, quantity + delta)));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart();
    }
  };

  return (
    <div className="product-detail">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <button onClick={onBack} className="back-button">
          <span aria-hidden="true">←</span> Volver al catálogo
        </button>
      </nav>

      <div className="detail-content">
        <div className="detail-image-container">
          {!imageLoaded && (
            <div className="skeleton skeleton-detail-image"></div>
          )}
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className={`detail-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="image-badge">Calidad Premium</div>
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{producto.nombre}</h1>
          
          <div className="detail-rating" aria-label="Calificación: 5 de 5 estrellas">
            <span className="stars">★★★★★</span>
            <span className="rating-text">(48 reseñas)</span>
          </div>

          <p className="detail-price">
            ${producto.precio.toLocaleString()}
            <span className="price-note">Envío gratis en CABA</span>
          </p>

          <p className="detail-description">{producto.descripcion}</p>

          <div className="product-meta">
            {producto.materiales && (
              <div className="meta-item">
                <strong>Materiales:</strong> {producto.materiales}
              </div>
            )}
            {producto.medidas && (
              <div className="meta-item">
                <strong>Medidas:</strong> {producto.medidas}
              </div>
            )}
            {producto.acabado && (
              <div className="meta-item">
                <strong>Acabado:</strong> {producto.acabado}
              </div>
            )}
          </div>

          <div className="detail-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity" className="sr-only">Cantidad</label>
              <button
                onClick={() => handleQuantityChange(-1)}
                aria-label="Disminuir cantidad"
                disabled={quantity <= 1}
                className="qty-btn"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                value={quantity}
                readOnly
                className="qty-input"
                aria-label={`Cantidad: ${quantity}`}
              />
              <button
                onClick={() => handleQuantityChange(1)}
                aria-label="Aumentar cantidad"
                disabled={quantity >= 10}
                className="qty-btn"
              >
                +
              </button>
            </div>

            <button 
              className="add-to-cart-button" 
              onClick={handleAddToCart}
              aria-label={`Añadir ${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} al carrito`}
            >
              <span className="cart-icon">🛒</span>
              Añadir al carrito
            </button>
          </div>

          <div className="product-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Envío gratis en CABA</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Garantía de 2 años</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Devolución gratis 30 días</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
