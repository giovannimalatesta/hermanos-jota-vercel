import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

 useEffect(() => {
  const savedToken = localStorage.getItem("token");

  if (savedToken) {
    setToken(savedToken);
    setIsAuthenticated(true);

    // reconstruir usuario desde el token
    try {
      const payload = JSON.parse(atob(savedToken.split('.')[1]));
      setUser({ email: payload.email, rol: payload.rol });
    } catch (err) {
      console.error("Error al decodificar el token:", err);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  } else {
    setIsAuthenticated(false);
  }
}, []);

  const login = async (email, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
   
    const data = await res.json();
   
    if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        setUser({ email: payload.email, rol: payload.rol });

        setIsAuthenticated(true);
    } 
    else {
         alert(data.message || "Error de login");
    }
  };

  const register = async (nombre, email, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      setUser({ email: payload.email, rol: payload.rol });
      setIsAuthenticated(true);
      alert("Usuarioro registrado con éxito");
    } else {
      alert(data.message || "Ya existe un usuario con ese email. Intenta con otro");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
