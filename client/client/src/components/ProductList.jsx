import React from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

export default function ProductList({ productos }) {
  if (!productos.length) return <p>No hay productos para mostrar.</p>

  return (
    <div className="product-grid">
      {productos.map((p)=> (
        <Link key={p._id} to = {`/catalogo/${p._id}`} style= {{textDecoration: 'none', color: 'inherit'}}>
        <ProductCard producto={p} />
        </Link>
      ))}
    </div>
  )
}

