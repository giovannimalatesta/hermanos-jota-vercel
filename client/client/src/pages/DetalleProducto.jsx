import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, deleteProduct } from '../api/products';
import ProductDetail from '../components/ProductDetail';
import { ProductListSkeleton } from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import {useCart} from '../context/CartContext';


export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {addToCart} = useCart();
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProductById(id);
        setProducto(data);
      } catch (err) {
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('¿Estas seguro de eliminar este producto?')) {
      await deleteProduct(id);
      navigate('/catalogo');
    }
  };

  if (loading) return <ProductListSkeleton count={1}/>;
  if (error) return(
    <EmptyState
        icon="⚠️"
        title="Error al cargar producto"
        message={error}
        actionText="Volver al catalogo"
        actionLink="/catalogo"
      />
  );
/*
  return (
    <div>
      <h1>{producto.nombre}</h1>
      <img src={producto.imagenUrl} alt={producto.nombre} />
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Stock: {producto.stock}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );*/

 return (
    <main className="main">
      <div>
      <ProductDetail
        producto={producto}
        onAddToCart={()=> addToCart(producto)}
        onBack={() => navigate('/catalogo')}
      />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1.5rem',
      }}>
        <button onClick={handleDelete} className="submit-button">Eliminar producto</button>
      </div>      

    </main>
  );

}
