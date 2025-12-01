import {Router} from 'express';
import {register, login } from '../controllers/auth.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";
import User from '../models/User.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

//usuario autenticado - protegida
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("nombre email");
    if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ mensaje: "Error al obtener perfil" });
  }
});


export default router;