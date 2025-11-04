import React from "react";

export default function Footer(){
  const currentYear = new Date().getFullYear();
  
  return (
    <footer role="contentinfo">
      <div className="footer-content">
        <p className="footer-copyright">
          © {currentYear} Hermanos Jota. Todos los derechos reservados.
        </p>
        <p className="footer-tagline">
          Redescubriendo el arte de vivir con muebles de calidad
        </p>
        <p className="footer-contact">
          Contacto: <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a>
        </p>
      </div>
    </footer>
  );
}

