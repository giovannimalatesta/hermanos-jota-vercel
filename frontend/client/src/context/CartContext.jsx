import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('hermanos-jota-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
        setCartCount(parsed.reduce((sum, item) => sum + item.quantity, 0));
      } catch (err) {
        console.error('Error al cargar el carrito:', err);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('hermanos-jota-cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('hermanos-jota-cart');
    }
  }, [cartItems]);

  const addToCart = (producto) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === producto.id);
      if (existing) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
    setCartCount((c) => c + 1);
  };

  const removeFromCart = (productoId) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productoId);
      if (existing && existing.quantity > 1) {
        setCartCount((c) => c - 1);
        return prev.map((item) =>
          item.id === productoId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      setCartCount((c) => Math.max(0, c - (existing?.quantity || 0)));
      return prev.filter((item) => item.id !== productoId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider
      value={{ cartCount, cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}

