import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ mensaje: "El usuario ya está registrado" });
    }

    // //hash clave
    const hashedPassword = await bcrypt.hash(password, 10);

      //crear usuario
    const user = new User({
      nombre,
      email,
      password: hashedPassword,
    });

    console.log("📩 Datos recibidos en backend:", { nombre, email, password });

    await user.save();

    // generar token jwt
    const token = jwt.sign(
      { userId: user._id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // devolver token al front
res.status(201).json({ mensaje: "Usuario registrado correctamente", token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }


    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }


    const token = jwt.sign(
      { userId: user._id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );


    res.status(200).json({
      mensaje: "Login exitoso",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
