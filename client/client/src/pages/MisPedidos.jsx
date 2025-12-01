import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function MisPedidos() {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/pedidos/mis-pedidos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      }
    };

    fetchPedidos();
  }, [token]);

  if (pedidos.length === 0) {
    return <p>No tenés pedidos aún.</p>;
  }

  return (
    <div>
      <h2>Mis Pedidos</h2>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido._id}>
            <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ${pedido.total}</p>
            <p><strong>Estado:</strong> {pedido.estado}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
