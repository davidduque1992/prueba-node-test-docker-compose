const express = require("express");
const router = express.Router();
const fs = require("fs");

const PATH_ROUTER = __dirname;
const cleanFilename = (fileName) => {
  const clean = fileName.split(".").shift();
  return clean;
};

// Cargar las rutas existentes
fs.readdirSync(PATH_ROUTER).filter((fileName) => {
  const prefixRoute = cleanFilename(fileName);
  if (prefixRoute !== "index") {
    console.log(`Cargando la ruta... ${prefixRoute}`);
    router.use(`/${prefixRoute}`, require(`./${prefixRoute}.js`));
  }
});

// Middleware para manejar rutas no encontradas (404)
router.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = { router };
