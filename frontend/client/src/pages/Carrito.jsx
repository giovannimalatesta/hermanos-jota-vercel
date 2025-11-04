import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Carrito() {
  const { cartItems, cartCount, addToCart, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

  if (cartCount === 0) {
    return (
      <main className="main">
        <section className="catalog-section">
          <div className="catalog-header">
            <h1 className="page-title">Carrito de Compras</h1>
          </div>
          <div className="empty-cart">
            <p className="empty-cart-icon">🛒</p>
            <h2>Tu carrito está vacío</h2>
            <p className="empty-cart-text">
              Agregá productos desde nuestro catálogo
            </p>
            <Link to="/catalogo" className="button">
              Ver Catálogo
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="main">
      <section className="catalog-section">
        <div className="catalog-header">
          <h1 className="page-title">Carrito de Compras</h1>
          <p className="catalog-subtitle">
            {cartCount} producto{cartCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="cart-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.imagen} 
                alt={item.alt}
                className="cart-item-image"
              />
              
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.nombre}</h3>
                <p className="cart-item-details">{item.medidas}</p>
                <p className="cart-item-price">
                  ${item.precio.toLocaleString()}
                </p>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="quantity-btn"
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>
                  <span className="quantity-display">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="quantity-btn"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-subtotal">
                  ${(item.precio * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <div className="cart-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">
                ${total.toLocaleString()}
              </span>
            </div>

            <div className="cart-actions">
              <button
                onClick={clearCart}
                className="btn-clear-cart"
              >
                Vaciar Carrito
              </button>
              <Link
                to="/contacto"
                className="btn-checkout"
              >
                Consultar Compra
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}