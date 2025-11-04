import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import ProductDetail from '../components/ProductDetail';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import Toast from '../components/Toast';
import { ProductListSkeleton } from '../components/SkeletonLoader';
import { fetchProducts } from '../api/products';
import { useCart } from '../context/CartContext';

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchProducts();
        if (mounted) {
          setProductos(data);
          setFilteredProducts(data);
        }
      } catch (err) {
        console.error('Error al cargar productos:', err);
        if (mounted) {
          setError('No se pudo cargar el catálogo');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(productos);
    } else {
      const filtered = productos.filter((p) =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, productos]);

  const handleSelect = (producto) => {
    setSelectedProduct(producto);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      setToast({
        message: `${selectedProduct.nombre} agregado al carrito`,
        type: 'success',
      });
    }
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main id="main-content" className="main">
      <section className="catalog-section" aria-label="Catálogo de productos">
        <div className="catalog-header">
          <h1 className="page-title">
            {selectedProduct ? 'Detalle del Producto' : 'Nuestro Catálogo'}
          </h1>
          {!selectedProduct && productos.length > 0 && (
            <p className="catalog-subtitle">
              Descubrí nuestros {productos.length} productos únicos
            </p>
          )}
        </div>

        {!selectedProduct && !loading && productos.length > 0 && (
          <SearchBar onSearch={handleSearch} />
        )}

        {loading && <ProductListSkeleton count={6} />}

        {error && !loading && (
          <EmptyState
            icon="⚠️"
            title="Error al cargar productos"
            message={error}
            actionText="Volver al inicio"
            actionLink="/"
          />
        )}

        {!loading && !error && (
          selectedProduct ? (
            <ProductDetail
              producto={selectedProduct}
              onAddToCart={handleAddToCart}
              onBack={handleBackToList}
            />
          ) : filteredProducts.length > 0 ? (
            <ProductList productos={filteredProducts} onSelect={handleSelect} />
          ) : (
            <EmptyState
              icon="🔍"
              title="No se encontraron productos"
              message={`No hay productos que coincidan con "${searchQuery}"`}
              actionText="Ver todos los productos"
              actionLink="/catalogo"
            />
          )
        )}
      </section>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}

