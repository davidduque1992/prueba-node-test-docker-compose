const express = require("express");
const router = express.Router();
const { getPrueba, postPrueba } = require("../controllers/prueba");

router.get("/", getPrueba);
router.post("/", postPrueba);

module.exports = router;
