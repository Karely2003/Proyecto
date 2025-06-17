
const db = require('../db/connection');

async function addUser(correo, nombre_usuario, contraseñaHasheada, Rol) {
  const datos = 'INSERT INTO Usuarios (correo, nombre_usuario, contraseña, Rol) VALUES (?, ?, ?, ?)';

  const [result] = await db.query(datos, [correo, nombre_usuario, contraseñaHasheada, Rol]);
  return result;
}

async function getUser(correo) {
  const datos = 'SELECT nombre_usuario, correo, contraseña, Rol FROM Usuarios WHERE correo = ?';

  const [rows] = await db.query(datos, [correo]);
  return rows;
}

async function getUsers() {
  const [rows] = await db.query('SELECT * FROM Usuarios');
  return rows;
}

module.exports = {
  addUser,
  getUser,
  getUsers
};
