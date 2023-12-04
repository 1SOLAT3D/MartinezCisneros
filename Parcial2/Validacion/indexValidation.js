const express = require("express");
const { validationResult, check, query } = require("express-validator");
const mysql2 = require("mysql2/promise");

const app = express();

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "lec2023",
};

async function getDatabaseConnection() {
  return await mysql2.createConnection(dbConfig);
}

function validarIdEquipo(req, res, next) {
  const idEquipo = req.params.idEquipo;
  if (!idEquipo || isNaN(idEquipo)) {
    return res
      .status(400)
      .json({ mensaje: "El parámetro idEquipo es inválido" });
  }
  next();
}

// Ruta GET - '/Alumnos'
app.get("/Alumnos", query('person').notEmpty(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
});

// Ruta POST - '/Alumnos'
app.post("/Alumnos", [
  check('edad').isNumeric(),
  check('correo').isEmail()
], (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    console.log(req.body);
    return res.send(`Hello, ${JSON.stringify(req.body)}!`);
  } else {
    res.json(result);
  }
});

// Ruta GET - '/lec2023'
app.get("/lec2023", async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [results, fields] = await connection.query("SELECT * FROM equipo");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta GET - '/lec2023/:idEquipo'
app.get("/lec2023/:idEquipo", validarIdEquipo, async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [results, fields] = await connection.query(
      "SELECT * FROM equipo WHERE id = ?",
      [req.params.idEquipo]
    );

    if (results.length === 0) {
      return res.status(404).json({
        resultado: "El equipo no fue encontrado",
      });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta POST - '/lec2023'
app.post("/lec2023", [
  check('nombre').isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  check('acronimo').isLength({ min: 2, max: 10 }).withMessage('El acrónimo debe tener entre 2 y 10 caracteres'),
  check('pais').isLength({ min: 2, max: 30 }).withMessage('El país debe tener entre 2 y 30 caracteres'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, acronimo, pais } = req.body;
    if (!nombre || !acronimo || !pais) {
      return res
        .status(400)
        .json({ mensaje: "Faltan campos obligatorios en la solicitud" });
    }

    const connection = await getDatabaseConnection();
    const sentenciaSQL = `INSERT INTO equipo (nombre, acronimo, pais) VALUES (?, ?, ?)`;
    const [results, fields] = await connection.execute(sentenciaSQL, [
      nombre,
      acronimo,
      pais,
    ]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta DELETE - '/lec2023/:idEquipo'
app.delete("/lec2023/:idEquipo", validarIdEquipo, async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [results, fields] = await connection.execute(
      `DELETE FROM equipo WHERE id = ?`,
      [req.params.idEquipo]
    );

    if (results.affectedRows === 1) {
      res.json({
        resultado: "Equipo eliminado",
      });
    } else {
      res.status(404).json({
        resultado: "El equipo no fue encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta PUT - '/lec2023/:idEquipo'
app.put("/lec2023/:idEquipo", [
  check('nombre').isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  check('acronimo').isLength({ min: 2, max: 10 }).withMessage('El acrónimo debe tener entre 2 y 10 caracteres'),
  check('pais').isLength({ min: 2, max: 30 }).withMessage('El país debe tener entre 2 y 30 caracteres'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, acronimo, pais } = req.body;
    if (!nombre || !acronimo || !pais) {
      return res
        .status(400)
        .json({ mensaje: "Faltan campos obligatorios en la solicitud" });
    }

    const connection = await getDatabaseConnection();
    const sentenciaSQL = `UPDATE equipo SET nombre = ?, acronimo = ?, pais = ? WHERE id = ?`;
    const [results, fields] = await connection.execute(sentenciaSQL, [
      nombre,
      acronimo,
      pais,
      req.params.idEquipo,
    ]);

    if (results.affectedRows === 1) {
      res.json({
        resultado: "Equipo actualizado",
      });
    } else {
      res.status(404).json({
        resultado: "El equipo no fue encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta PATCH - '/lec2023/:idEquipo'
app.patch("/lec2023/:idEquipo", [
  check('nombre').optional().isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  check('acronimo').optional().isLength({ min: 2, max: 10 }).withMessage('El acrónimo debe tener entre 2 y 10 caracteres'),
  check('pais').optional().isLength({ min: 2, max: 30 }).withMessage('El país debe tener entre 2 y 30 caracteres'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, acronimo, pais } = req.body;

    if (!nombre && !acronimo && !pais) {
      return res
        .status(400)
        .json({ mensaje: "Se requiere al menos un campo para actualizar" });
    }

    const connection = await getDatabaseConnection();
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

    const sentenciaSQL = `UPDATE equipo SET ${updates.join(", ")} WHERE id = ?`;
    const [results, fields] = await connection.execute(sentenciaSQL, params);

    if (results.affectedRows === 1) {
      res.json({
        resultado: "Equipo actualizado parcialmente",
      });
    } else {
      res.status(404).json({
        resultado: "El equipo no fue encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(8080, () => {
  console.log("Servidor express escuchando 8080");
});
