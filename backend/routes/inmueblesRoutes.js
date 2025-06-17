const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { publicarPropiedad } = require("../controllers/inmueblesController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Ruta que pasa todo el control al controlador
router.post("/publicar", upload.single("foto"), publicarPropiedad);

router.get("/", async (req, res) => {
  const db = require("../db/connection");

  try {
    const [inmuebles] = await db.query(`
      SELECT i.*, f.url_foto AS imagen
      FROM Inmuebles i
      LEFT JOIN FotosInmueble f ON i.id = f.id_inmueble
      GROUP BY i.id
    `);
    res.json(inmuebles);
  } catch (error) {
    console.error("Error al listar inmuebles:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});


module.exports = router;
