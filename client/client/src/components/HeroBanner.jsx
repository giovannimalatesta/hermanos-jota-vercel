import React from "react";
import { Link } from "react-router-dom";

export default function HeroBanner(){
  return (
    <section className="hero-banner">
      <div className="hero-overlay" />
      <div className="hero-center">
        <h1>Tradición y Diseño en Muebles de Madera</h1>
        <p>30 años de experiencia, calidad que se siente, diseño que perdura.</p>
        <Link className="button primary" to="/catalogo">Explorar Catálogo</Link>
      </div>
    </section>
  );
}
