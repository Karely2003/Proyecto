require('dotenv').config();
const express=require('express');
const mysql = require('mysql2');


const pool = mysql.createPool({
  host: process.env.DATA_BASE_HOST||'localhost', 
  user: process.env.DATA_BASE_USER||'root', 
  password: process.env.DATA_BASE_PASSWORD||'', 
  database: process.env.DATA_BASE_NAME||'RentaFacil' 
});

module.exports = pool.promise();