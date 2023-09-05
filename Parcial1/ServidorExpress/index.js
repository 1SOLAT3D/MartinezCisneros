const express = require('express');
const app = express();

app.use(express.json());

app.get("/alumnos", (req, res) => {
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send("Servidor Express contestando a Peticion GET");
});

app.post("/alumnos", (req, res) => {
    res.send("Servidor Express contestando a Peticion POST");
 });

app.listen(8080, (req, res) => {
    console.log("Servidor Express Escuchando");
});