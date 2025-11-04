import React from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <div className="band" />
      
      <main id="main-content" className="home-content">
        <section className="intro-section">
          <h2>Bienvenidos a Hermanos Jota</h2>
          <p>
            Con más de 30 años de experiencia en la fabricación de muebles de madera,
            combinamos tradición artesanal con diseño contemporáneo. Cada pieza es
            única y está hecha con materiales sostenibles de la más alta calidad.
          </p>
          <div className="cta-buttons">
            <Link to="/catalogo" className="button secondary">
              Ver Catálogo
            </Link>
            <Link to="/contacto" className="button secondary">
              Contactanos
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

