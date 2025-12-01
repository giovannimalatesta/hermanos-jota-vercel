import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; 

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth(); 
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <header className="topbar" role="banner">
        <Link 
          to="/" 
          className="logo-container"
          onClick={closeMenu}
          aria-label="Hermanos Jota - Ir al inicio"
        >
          <img src="/img/logo completo.png" alt="" className="logo-full" />
        </Link>

        <button
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-expanded={mobileMenuOpen}
          aria-label="Menú de navegación"
          aria-controls="main-nav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav 
          id="main-nav"
          className={`topnav ${mobileMenuOpen ? 'open' : ''}`}
          role="navigation"
          aria-label="Navegación principal"
        >
          <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>Inicio</Link>
          <Link to="/catalogo" className={isActive('/catalogo') ? 'active' : ''} onClick={closeMenu}>Catálogo</Link>
          <Link to="/contacto" className={isActive('/contacto') ? 'active' : ''} onClick={closeMenu}>Contacto</Link>

          {user ? (
            <>
              <Link to="/perfil" onClick={closeMenu}>Mi Perfil</Link>
              <Link to="/mis-pedidos" onClick={closeMenu}>Mis Pedidos</Link>
              <Link to="/" onClick={() => { logout(); closeMenu(); }} className="logout-link">Cerrar sesión </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Login</Link>
              <Link to="/registro" onClick={closeMenu}>Registrarse</Link>
            </>
          )}

          <Link to="/carrito" className="cart-button" aria-label={`Carrito con ${cartCount} productos`} onClick={closeMenu}>
            🛒
            {cartCount > 0 && (
              <span className="cart-counter">{cartCount > 9 ? '9+' : cartCount}</span>
            )}
          </Link>
        </nav>

        {mobileMenuOpen && (
          <div className="mobile-overlay" onClick={closeMenu} aria-hidden="true" />
        )}
      </header>
    </>
  );
}
