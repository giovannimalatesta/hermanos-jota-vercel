import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    // Nombre del producto (String, obligatorio)
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio.'],
        trim: true
    },
    // Descripción del producto (String)
    descripcion: {
        type: String,
        trim: true
    },
    // Precio del producto (Number, obligatorio)
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio.'],
        min: [0, 'El precio no puede ser negativo.']
    },
    // Stock disponible (Number)
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock no puede ser negativo.']
    },
    // URL de la imagen (String)
    imagenUrl: {
        type: String,
        trim: true
    }
}, {
    // Configuración para añadir automáticamente los campos 'createdAt' y 'updatedAt'
    timestamps: true 
});

// Creación y exportación del Modelo 'Product'
const Product = mongoose.model('Product', ProductSchema, "productos");

export default Product; // Usar 'export default' en lugar de 'module.exports'
