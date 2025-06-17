const express = require('express')
const cors = require('cors')
const app= express()
app.use(express.json());

app.use(cors());
const port = process.env.PORT||3001;

app.use('/uploads', express.static('uploads'));


const inmueblesRoutes = require('./routes/inmueblesRoutes');
app.use('/api/inmuebles', inmueblesRoutes);


const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);




app.listen(port, () => {
  console.log(`Servidor activo en puerto ${port}`)
})