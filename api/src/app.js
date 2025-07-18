const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
require("./db.js");

const server = express();
//API
server.name = "API";

// Usa el middleware cors para manejar CORS correctamente
server.use(cors({
  origin: "https://deploy-pi-dogs-eta.vercel.app", // Tu frontend en Vercel
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
}));

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// Agregar una ruta simple para probar si el servidor está en línea
server.get('/ping', (req, res) => {
  res.send('pong! API funcionando correctamente');
});

server.use("/", routes);

// Manejo de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;