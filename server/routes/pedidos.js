import express from "express";
import Pedido from "../models/Pedido.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * ✅ Crear un nuevo pedido (solo usuario autenticado)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ mensaje: "El carrito está vacío." });
    }

    const nuevoPedido = new Pedido({
      usuario: userId,
      items,
      total,
      estado: "PENDIENTE",
    });

    await nuevoPedido.save();
    res.status(201).json({
      mensaje: "Pedido creado correctamente",
      pedido: nuevoPedido,
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ mensaje: "Error al crear pedido" });
  }
});

/**
 * ✅ Obtener pedidos del usuario autenticado
 */
router.get("/mis-pedidos", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const pedidos = await Pedido.find({ usuario: userId })
      .populate("items.producto", "nombre precio")
      .sort({ fecha: -1 });
    res.json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ mensaje: "Error al obtener pedidos" });
  }
});

export default router;
