const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;


app.use(express.json()); 
app.use(cors());         


app.use('/uploads', express.static('uploads'));


const inmueblesRoutes = require('./routes/inmueblesRoutes');
app.use('/api/inmuebles', inmueblesRoutes); 

const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);



app.post("/api/mensajes", async (req, res) => {
  const { remitente_id, receptor_id, contenido } = req.body;
  await db.query(
    "INSERT INTO mensajes (remitente_id, receptor_id, contenido) VALUES (?, ?, ?)",
    [remitente_id, receptor_id, contenido]
  );
  res.json({ mensaje: "Mensaje enviado" });
});

app.get("/api/mensajes/:usuario1/:usuario2", async (req, res) => {
  const { usuario1, usuario2 } = req.params;
  const [mensajes] = await db.query(
    `SELECT * FROM mensajes
     WHERE (remitente_id = ? AND receptor_id = ?)
        OR (remitente_id = ? AND receptor_id = ?)
     ORDER BY fecha_envio ASC`,
    [usuario1, usuario2, usuario2, usuario1]
  );
  res.json(mensajes);
});


app.use((req, res, next) => {
    console.log(`404: Ruta no encontrada - ${req.originalUrl}`);
    res.status(404).json({ message: "Ruta de API no encontrada" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});


app.listen(port, () => {
    console.log(`Servidor activo en puerto ${port}`);
});