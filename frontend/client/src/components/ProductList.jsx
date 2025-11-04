import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ productos, onSelect }) {
  if (!productos.length) return <p>No hay productos para mostrar.</p>

  return (
    <div className="product-grid">
      {productos.map((p)=> (
        <ProductCard key={p.id} producto={p} onClick={onSelect} />
      ))}
    </div>
  )
}

