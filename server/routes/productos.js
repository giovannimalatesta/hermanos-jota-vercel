// routes de productos
import { Router } from "express";
import Product from "../models/Product.js";




const router = Router();

router.use((req, res, next) =>{
    res.setHeader('Content-Type', 'application/json');
    next();
});


/*
// Agregamos la función para cargar los datos de JSON
async function cargarDatos(){
    const data = await readFile('muebles.json', {encoding: 'utf-8'});
    return JSON.parse(data);
}
*/

//GET para todos los productos
router.get('/', async(req, res, next) =>{
    try{
        const producto = await Product.find();
        res.json(producto);
    }catch(error){
        next(error); // para anticipar los errores
    }
});

// GET producto por ID ejemplo /api/productos/:id
router.get('/:id', async(req, res, next)=> {
    try{
        const producto = await Product.findById(req.params.id);
        if (!producto){
            return res.status(404).json({mensaje:"Producto no encontrado"});
        }
        res.json(producto);
    }catch(error){
        next(error);
    }
});

// Post /api/productos para crear un nuevo producto
router.post('/', async(req, res, next) => {
  console.log('POST body:', req.body); // <-    
    try{
        const nuevoProducto = new Product(req.body);
        const guardado = await nuevoProducto.save();
        res.status(201).json(guardado);
    }catch(error){
        next(error);
    }
});
// PUT /api/productos/:id para actualizar un producto existente
router.put('/:id', async(req, res, next) => {
    try{
        const actualizado = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        if (!actualizado){
            return res.status(404).json({mensaje: "Producto no encontrado"});
        } 
        res.json(actualizado);
    }catch(error){
        next(error);
    }
});

// agrego el DELETE /api/productos/:id
router.delete('/:id', async(req, res, next) => {
    try{
        const eliminado = await Product.findByIdAndDelete(req.params.id);
        if (!eliminado){
            return res.status(404).json({mensaje: "Producto no encontrado"});
        }
        res.json({mensaje: "El Producto fue eliminado correctamente"});
    }catch(error){
        next (error);
    }
});
export default router;