import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="product-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-image"></div>
      <div className="product-info">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  );
}

export function ProductListSkeleton({ count = 6 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

