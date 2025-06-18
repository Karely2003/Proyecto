const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { publicarPropiedad, buscarInmuebles } = require("../controllers/inmueblesController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });


router.post("/publicar", upload.single("foto"), publicarPropiedad);


router.get("/", async (req, res) => {
  const db = require("../db/connection"); 

  try {
    const [inmuebles] = await db.query(`
      SELECT i.*, GROUP_CONCAT(f.url_foto SEPARATOR ',') AS fotos_urls
      FROM Inmuebles i
      LEFT JOIN FotosInmueble f ON i.id = f.id_inmueble
      GROUP BY i.id
    `);

  
    const inmueblesConFotos = inmuebles.map(inmueble => ({
      ...inmueble,
      fotos: inmueble.fotos_urls ? inmueble.fotos_urls.split(',') : []
    }));

    res.json(inmueblesConFotos);
  } catch (error) {
    console.error("Error al listar inmuebles:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});



router.get("/buscar", buscarInmuebles); 

module.exports = router;