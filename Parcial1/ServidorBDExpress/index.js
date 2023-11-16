const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

function validarIdEquipo(req, res, next) {
  const idEquipo = req.params.idEquipo;
  if (!idEquipo || isNaN(idEquipo)) {
    return res
      .status(400)
      .json({ mensaje: "El parámetro idEquipo es invalido" });
  }
  next();
}

app.get("/lec2023", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "lec2023",
    });

    const [results, fields] = await connection.execute("SELECT * FROM equipo");
    res.json(results);
  } catch (error) {
    res.json(error);
  }
});

app.get("/lec2023/:idEquipo", validarIdEquipo, async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "lec2023",
    });

    const [results, fields] = await connection.execute(
      `SELECT * FROM equipo WHERE id=${req.params.idEquipo}`
    );

    if (results.length === 0) {
      return res.status(404).json({
        resultado: "El equipo no fue encontrado",
      });
    }

    res.json(results);
  } catch (error) {
    res.json(error);
  }
});

app.delete("/lec2023/equipo/:idEquipo", validarIdEquipo, async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "lec2023",
    });

    const [results, fields] = await connection.execute(
      `DELETE FROM equipo WHERE id=${req.params.idEquipo}`
    );

    if (results.affectedRows == 1) {
      res.json({
        resultado: "Equipo borrado",
      });
    } else {
      res.status(404).json({
        resultado: "El equipo no fue encontrado",
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.post("/lec2023", async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.acronimo || !req.body.pais) {
      return res
        .status(400)
        .json({ mensaje: "Faltan campos obligatorios en la solicitud" });
    }

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "lec2023",
    });

    const sentenciaSQL = `INSERT INTO equipo (nombre, acronimo, pais) VALUES (?, ?, ?)`;
    const [results, fields] = await connection.execute(sentenciaSQL, [
      req.body.nombre,
      req.body.acronimo,
      req.body.pais,
    ]);
    res.json(results);
  } catch (error) {
    res.json(error);
  }
});

app.put("/lec2023/:idEquipo", validarIdEquipo, async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.acronimo || !req.body.pais) {
      return res
        .status(400)
        .json({ mensaje: "Faltan campos obligatorios en la solicitud" });
    }

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "lec2023",
    });

    const sentenciaSQL = `UPDATE equipo SET nombre=?, acronimo=?, pais=? WHERE id=?`;
    const [results, fields] = await connection.execute(sentenciaSQL, [
      req.body.nombre,
      req.body.acronimo,
      req.body.pais,
      req.params.idEquipo,
    ]);

    if (results.affectedRows == 1) {
      res.json({
        resultado: "Equipo actualizado",
      });
    } else {
      res.status(404).json({
        resultado: "El equipo no fue encontrado",
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(8080, () => {
  console.log("Servidor Express escuchando en el puerto 8080");
});
