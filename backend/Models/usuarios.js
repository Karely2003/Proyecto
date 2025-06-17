const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Usuarios = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nombre_usuario: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Rol: {
    type: DataTypes.ENUM('Arrendador', 'Arrendatario'),
    allowNull: false
  },
  
}, {
  tableName: 'Usuarios',
  timestamps: false
});

module.exports = Usuarios;
