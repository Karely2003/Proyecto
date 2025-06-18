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