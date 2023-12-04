const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const https = require("https");
const path = require("path");
const crypto = require("crypto");

app.use(express.json());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.get("/lec2023", (req, resp) => {
  try {
    resp.json({ mensaje: "Hola Mundo" });
  } catch (err) {
    resp.status(500).json({ mensaje: "Error de conexión", tipo: err.message });
  }
});

app.get("/seguro", (req, resp) => {
  resp.json({ mensaje: "Respuesta segura" });
});

const puertoHttp = 8080;
const puertoHttps = 8081;

const keyPath = path.join(__dirname, "SSL", "key.pem");
const certPath = path.join(__dirname, "SSL", "cert.pem");
console.log("Ruta completa de la clave privada:", keyPath);
console.log("Ruta completa del certificado:", certPath);

const opciones = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
  secureOptions:
    crypto.constants.SSL_OP_NO_TLSv1 | crypto.constants.SSL_OP_NO_TLSv1_1,
  minVersion: "TLSv1.2",
};

try {
  app.listen(puertoHttp, () => {
    console.log(`Servidor express escuchando en el puerto ${puertoHttp}`);
  });

  https.createServer(opciones, app).listen(puertoHttps, () => {
    console.log(
      `Servidor express seguro HTTPS escuchando en el puerto ${puertoHttps}`
    );
  });
} catch (err) {
  console.error(`Error al iniciar los servidores: ${err}`);
}
