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
  
    const [resultado] = await db.execute(`
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
        acepta_mascotas === "true" || acepta_mascotas === true,
        servicios_incluidos,
        normas_convivencia
      ]
    );

    const id_inmueble = resultado.insertId;

    if (req.file) {
      const url_foto = `http://localhost:3001/uploads/${req.file.filename}`;
      
      await db.execute(
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
    res.status(500).json({ error: "Error del servidor al publicar propiedad" });
  }
}

async function buscarInmuebles(req, res) {
  try {
    const { ubicacion, precioMin, precioMax, tipo } = req.query;

    let query = `
      SELECT
          i.id,
          i.nombre_publicacion,
          i.descripcion,
          i.direccion,
          i.barrio_colonia,
          i.tipo,
          i.precio,
          i.acepta_mascotas,
          i.servicios_incluidos,
          i.normas_convivencia,
          GROUP_CONCAT(fi.url_foto SEPARATOR ',') AS fotos_urls
      FROM
          Inmuebles i
      LEFT JOIN
          FotosInmueble fi ON i.id = fi.id_inmueble
      WHERE 1=1
    `;
    const params = [];

    if (ubicacion) {
      query += ` AND (i.direccion LIKE ? OR i.barrio_colonia LIKE ?)`;
      params.push(`%${ubicacion}%`, `%${ubicacion}%`);
    }
    if (precioMin) {
      const parsedPrecioMin = parseFloat(precioMin);
      if (!isNaN(parsedPrecioMin)) {
          query += ` AND i.precio >= ?`;
          params.push(parsedPrecioMin);
      }
    }
    if (precioMax) {
      const parsedPrecioMax = parseFloat(precioMax);
      if (!isNaN(parsedPrecioMax)) {
          query += ` AND i.precio <= ?`;
          params.push(parsedPrecioMax);
      }
    }
    if (tipo) {
      let dbTipo = '';
      switch (tipo.toLowerCase()) {
          case 'apartamento':
              dbTipo = 'Apartamento';
              break;
          case 'casa':
              dbTipo = 'Casa';
              break;
          case 'estudio':
              dbTipo = 'Cuarto';
              break;
          default:
              dbTipo = tipo;
      }
      query += ` AND i.tipo = ?`;
      params.push(dbTipo);
    }

    query += ` GROUP BY i.id`;


    const [rows] = await db.execute(query, params);

    const inmueblesConFotos = rows.map(row => ({
      ...row,
      fotos: row.fotos_urls ? row.fotos_urls.split(',') : []
    }));

    res.json(inmueblesConFotos);

  } catch (error) {
    console.error('Error al buscar inmuebles:', error); 
    res.status(500).json({ message: 'Error interno del servidor al buscar inmuebles' });
  }
}

module.exports = {
  publicarPropiedad,
  buscarInmuebles
};