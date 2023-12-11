const express = require("express");
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const mysql2 = require("mysql2/promise");

const app = express();
const port = 8080;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "lec2023",
};

app.use(cors());
app.use(express.json());

const validateEquipo = [
  check('nombre').notEmpty().withMessage('Nombre es obligatorio'),
  check('acronimo').notEmpty().withMessage('Acrónimo es obligatorio'),
  check('pais').notEmpty().withMessage('País es obligatorio'),
];

app.get("/lec2023", async (req, res) => {
  try {
    const connection = await mysql2.createConnection(dbConfig);
    const [results, fields] = await connection.query("SELECT * FROM equipo");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.get("/lec2023/:idEquipo", async (req, res) => {
  try {
    const connection = await mysql2.createConnection(dbConfig);
    const [results, fields] = await connection.query(
      "SELECT * FROM equipo WHERE id = ?",
      [req.params.idEquipo]
    );

    if (results.length === 0) {
      return res.status(404).json({ resultado: "El equipo no fue encontrado" });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.post("/lec2023", validateEquipo, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nombre, acronimo, pais } = req.body;

    const connection = await mysql2.createConnection(dbConfig);
    const sql = "INSERT INTO equipo (nombre, acronimo, pais) VALUES (?, ?, ?)";
    const [result] = await connection.execute(sql, [nombre, acronimo, pais]);

    if (result.affectedRows === 1) {
      res.status(201).json({ resultado: "Equipo creado exitosamente" });
    } else {
      res.status(500).json({ error: "Error al crear el equipo" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.delete("/lec2023/:idEquipo", async (req, res) => {
  try {
    const connection = await mysql2.createConnection(dbConfig);
    const [results, fields] = await connection.execute(
      "DELETE FROM equipo WHERE id = ?",
      [req.params.idEquipo]
    );

    if (results.affectedRows === 1) {
      res.json({ resultado: "Equipo eliminado exitosamente" });
    } else {
      res.status(404).json({ resultado: "El equipo no fue encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.put("/lec2023/:idEquipo", validateEquipo, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nombre, acronimo, pais } = req.body;

    const connection = await mysql2.createConnection(dbConfig);
    const sql =
      "UPDATE equipo SET nombre = ?, acronimo = ?, pais = ? WHERE id = ?";
    const [results] = await connection.execute(sql, [
      nombre,
      acronimo,
      pais,
      req.params.idEquipo,
    ]);

    if (results.affectedRows === 1) {
      res.json({ resultado: "Equipo actualizado exitosamente" });
    } else {
      res.status(404).json({ resultado: "El equipo no fue encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.patch("/lec2023/:idEquipo", validateEquipo, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nombre, acronimo, pais } = req.body;

    if (!nombre && !acronimo && !pais) {
      return res
        .status(400)
        .json({ mensaje: "Se requiere al menos un campo para actualizar" });
    }

    const connection = await mysql2.createConnection(dbConfig);
    const updates = [];
    const params = [];

    if (nombre) {
      updates.push("nombre = ?");
      params.push(nombre);
    }

    if (acronimo) {
      updates.push("acronimo = ?");
      params.push(acronimo);
    }

    if (pais) {
      updates.push("pais = ?");
      params.push(pais);
    }

    params.push(req.params.idEquipo);

    const sql = `UPDATE equipo SET ${updates.join(", ")} WHERE id = ?`;
    const [results] = await connection.execute(sql, params);

    if (results.affectedRows === 1) {
      res.json({ resultado: "Equipo actualizado parcialmente" });
    } else {
      res.status(404).json({ resultado: "El equipo no fue encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor express escuchando en el puerto ${port}`);
});
