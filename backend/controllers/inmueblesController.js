const db = require("../db/connection");

async function publicarPropiedad(req, res) {
  const {
    nombre_publicacion,
    descripcion,
    direccion,
    barrio_colonia,
    tipo,
    precio,
    acepta_mascotas,
    servicios_incluidos,
    normas_convivencia
  } = req.body;

  if (
    !nombre_publicacion || !descripcion || !direccion ||
    !barrio_colonia || !tipo || !precio
  ) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const [resultado] = await db.query(`
      INSERT INTO Inmuebles 
      (nombre_publicacion, descripcion, direccion, barrio_colonia, tipo, precio, acepta_mascotas, servicios_incluidos, normas_convivencia)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre_publicacion,
        descripcion,
        direccion,
        barrio_colonia,
        tipo,
        precio,
        acepta_mascotas === "true" || acepta_mascotas === true, // para asegurar booleano
        servicios_incluidos,
        normas_convivencia
      ]
    );

    const id_inmueble = resultado.insertId;

    // Si hay imagen, guardarla en FotosInmueble
    if (req.file) {
      const url_foto = `http://localhost:3001/uploads/${req.file.filename}`;
      await db.query(
        "INSERT INTO FotosInmueble (id_inmueble, url_foto) VALUES (?, ?)",
        [id_inmueble, url_foto]
      );
    }

    res.status(201).json({
      mensaje: "Propiedad publicada con éxito",
      id: id_inmueble
    });
  } catch (error) {
    console.error("Error al publicar propiedad:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
}

module.exports = { publicarPropiedad };
