const express = require("express");
const mysql = require("mysql2/promise");

const router = express.Router();

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "lec2023",
};

async function getDatabaseConnection() {
  return await mysql.createConnection(dbConfig);
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

router.get("/", async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [results, fields] = await connection.execute("SELECT * FROM equipo");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/:idEquipo", validarIdEquipo, async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [results, fields] = await connection.execute(
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

router.post("/", async (req, res) => {
  try {
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

router.delete("/:idEquipo", validarIdEquipo, async (req, res) => {
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

router.put("/:idEquipo", validarIdEquipo, async (req, res) => {
  try {
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

router.patch("/:idEquipo", validarIdEquipo, async (req, res) => {
  try {
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

module.exports = { router, validarIdEquipo };
