// Siempre apuntamos al backend en desarrollo
const API_URL = import.meta.env.VITE_API_URL;


export async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/productos`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetchProducts:', err);
    throw new Error('No se pudo cargar el catálogo');
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_URL}/productos/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetchProductById:', err);
    throw err;
  }
}

export async function createProduct(product) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product),
    });


    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error createProduct backend:', errorText);
      throw new Error(`HTTP ${res.status} - ${errorText}`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error createProduct:', err);
    throw err;
  }
}


export async function deleteProduct(id) {
   const token = localStorage.getItem("token");
  try {
     const res = await fetch(`${API_URL}/productos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    });
   
   
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error deleteProduct:', err);
    throw err;
  }
}
