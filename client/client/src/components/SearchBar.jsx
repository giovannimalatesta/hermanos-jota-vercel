import React, { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = "Buscar productos..." }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="search-input" className="sr-only">
        Buscar productos
      </label>
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </span>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          aria-label="Campo de búsqueda"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="search-button">
        Buscar
      </button>
    </form>
  );
}

