import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import CrearProducto from './pages/CrearProducto';
import DetalleProducto from './pages/DetalleProducto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import ProtectedRoute from './components/ProtectedRoute';
import Perfil from './pages/Perfil';
import MisPedidos from './pages/MisPedidos';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
    <CartProvider>

          <Routes>
              <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="admin/crear-producto" element={<CrearProducto/>}/>
              <Route path="catalogo/:id" element={<DetalleProducto/>}/>

              <Route path="login" element={<Login />} />
            <Route path="registro" element={<Registro />} />

             <Route
              path="perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="mis-pedidos"
              element={
                <ProtectedRoute>
                  <MisPedidos />
                </ProtectedRoute>
              }
            />
          </Route>
          </Routes>

    </CartProvider>
    </AuthProvider>
  );
}
