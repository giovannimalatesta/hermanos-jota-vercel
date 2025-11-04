import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';

export default function App() {
  return (
    <CartProvider>
      
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="carrito" element={<Carrito />} />
          </Route>
        </Routes>
      
    </CartProvider>
  );
}
