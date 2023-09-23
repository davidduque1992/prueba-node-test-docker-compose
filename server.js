const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const corsOptions = { origin: "*" };

var app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(fileUpload());

const { router } = require("./app/routes");

app.use("/api", router);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Api corriendo por el puerto ${PORT}`)
);

module.exports = server;
