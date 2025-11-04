import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/products';

export default function CrearProducto() {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagenUrl: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convertimos precio y stock a números
      const payload = {
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock)
      };

      console.log('Enviando al backend:', payload); // depuración

      await createProduct(payload);
      alert('Producto creado con éxito!');
      navigate('/catalogo');
    } catch (err) {
      alert('No se pudo crear el producto. Revisa la consola para más detalles.');
      console.error('error al crear el producto', err);
    }
  };

  return (
    <div className='modern-contact-form'>
      <h1>Crear Producto</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
          <div className='form-field'>
            <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
          
          </div>
          
          <input name="descripcion" placeholder="Descripción" onChange={handleChange} />
          <input name="precio" type="number" placeholder="Precio" onChange={handleChange} required />
          <input name="stock" type="number" placeholder="Stock" onChange={handleChange} />
          <input name="imagenUrl" placeholder="URL Imagen" onChange={handleChange} />
          <button type="submit">Crear</button>
     
      </form>
    </div>
  );
}
