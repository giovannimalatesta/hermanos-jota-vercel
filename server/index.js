// 1. Requerir modulos
import express from 'express';
import "dotenv/config"
import { connectToDatabase } from "./db.js";
import cors from 'cors'; // para permitir CORS
import { readFile } from 'fs/promises'; // Para la versión asíncrona
import productoRouter from './routes/productos.js';
import authRoutes from './routes/auth.routes.js';
import pedidoRoutes from './routes/pedidos.js';

import listEndpoints from "express-list-endpoints";

// 2. Crear una instancia de la aplicación
const app = express();
 
// 3. Definir el puerto. Es una buena práctica usar una variable de entorno para producción.
const PORT = process.env.PORT || 5000;
 

//Cors
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://hermanos-jota-vercel.vercel.app',
    'https://hermanos-jota-vercel-k4dx5ehmh-giovannimalatestas-projects.vercel.app', 
    'https://hermanos-jota-vercel-a8xpozvem-giovannimalatestas-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());

// Middleware global: para los log de cada request

app.use((req, res, next) =>{
  console.log(`[${new Date().toDateString()}] ${req.method} ${req.url}`);
  next();
});


 

app.get('/', (req, res) => {
  res.send('¡Bienvenido al API de Mueblería Jota!');
});

app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRouter);
app.use('/api/pedidos', pedidoRoutes);


//mddleware 404 (si no se encuentra la ruta)
app.use((req, res)=>{
 res.status(404).json({mensaje: "Ruta no encontrada"}); 
});


//Middleware para centralizar errores
app.use((err, req, res, next) =>{
  console.log('Error interno:', err);
  res.status(500).json({mensaje: 'Error interno del servidor'});
});

async function importarDatosIniciales() {
  try {
    const count = await Product.countDocuments();
    
    if (count === 0) {
      console.log(' Importando datos desde muebles.json...');
      
      const data = await readFile('/mubles.json', { encoding: 'utf-8' });
      const productos = JSON.parse(data);
      
      await Product.insertMany(productos);
      console.log(` ${productos.length} productos importados a MongoDB`);
    } else {
      console.log(` Ya existen ${count} productos en la base de datos`);
    }
  } catch (error) {
    console.error(' Error al importar datos:', error);
    
  }
}


// 5. Poner el servidor a escuchar peticiones despues de conectar con la db

connectToDatabase()
.then(()=>{
  console.log("Base de datos conectada correctamente");

  
  app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}(desde indexserver)`);
});
})
.catch((error)=>{
  console.error("Error al coenectar a la base de datos:", error.message);
  process.exit(1);
})



