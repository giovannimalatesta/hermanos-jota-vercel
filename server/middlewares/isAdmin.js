export const isAdmin = (req, res, next) => {
  if (req.user && req.user.rol === "admin") {
    next();
  } else {
    res.status(403).json({ mensaje: "Acceso denegado: solo administradores" });
  }
};
