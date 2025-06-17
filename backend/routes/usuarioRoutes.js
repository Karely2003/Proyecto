const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { addUser } = require("../controllers/usuarioController");

router.post("/registro", async (req, res) => {
  const { correo, nombre_usuario, contraseña, Rol } = req.body;

  if (!correo || !nombre_usuario || !contraseña || !Rol) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const hash = await bcrypt.hash(contraseña, 10);
    const result = await addUser(correo, nombre_usuario, hash, Rol);

    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error en /registro:", error);
    res.status(500).json({ error: "No se pudo registrar el usuario" });
  }
});




module.exports = router;