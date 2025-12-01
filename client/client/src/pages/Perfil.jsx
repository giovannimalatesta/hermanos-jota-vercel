import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const { token, user } = useAuth();
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPerfil(data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };

    fetchPerfil();
  }, [token]);

  if (!perfil)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando perfil...</p>;

  return (
    <main className="main">
      <section className="section-perfil">
        <div className="perfil-card">

          <h2>Mi Perfil</h2>

          <div className="info-perfil">
            <p>
              <strong>Nombre:</strong> {perfil.nombre || "—"}
            </p>
            <p>
              <strong>Email:</strong> {perfil.email || user?.email}
            </p>
            
          </div>

          <p>
            ¡Bienvenido a tu cuenta, {perfil.nombre || perfil.email}!
          </p>
        </div>
      </section>
    </main>
  );
}
