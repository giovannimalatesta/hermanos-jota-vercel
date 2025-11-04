/*const API_URL = import.meta.env.DEVELOPMENT
  ? 'http://localhost:3000/api/productos' //Desarrollo
  : '/api/productos'
*/ // para la futura conexión con el backend 

const Base_PATH = '/Hermanos-Jota'  // para GitHub Pages


export async function fetchProducts() {
  try {
    const res = await fetch(`${Base_PATH}/muebles.json`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('Error en fetchProducts:', err);
    throw new Error('No se pudo cargar el catálogo')
  }
}

/*export async function fetchProductById(id) {
  try{
    const res = await fetch('/Hermanos-Jota/muebles.json' +id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }catch(err){
    console.error('Error en el fetchProductById:', err);
    throw new Error('No se pudo cargar el producto');
  }
}*/ // para la futura conexión con el backend

export async function fetchProductById(id) {
  try {
    const productos = await fetchProducts();
    const producto = productos.find(p => p.id === id);
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
  } catch (err) {
    console.error('Error en fetchProductById:', err);
    throw err; // Re-lanzar el error para que pueda ser manejado por el llamador
  }
} // función para obtener un producto por su ID desde el JSON local