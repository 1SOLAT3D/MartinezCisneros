const express = require("express");
const mysql = require("mysql2/promise");

const router = express.Router();

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lec2023'
};

async function getDatabaseConnection() {
  return await mysql.createConnection(dbConfig);
}

/**
 * @swagger
 * tags:
 *   name: Equipos
 *   description: Operaciones relacionadas con equipos.
 */

function validarIdEquipo(req, res, next) {
  const idEquipo = req.params.idEquipo;
  if (!idEquipo || isNaN(idEquipo)) {
    return res.status(400).json({ mensaje: "El parámetro idEquipo es inválido" });
  }
  next();
}

/**
 * @swagger
 * /lec2023:
 *   get:
 *     summary: Obtiene todos los equipos.
 *     tags: [Equipos]
 *     responses:
 *       200:
 *         description: Retorna la lista de equipos.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/', async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [results, fields] = await connection.execute('SELECT * FROM equipo');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/**
 * @swagger
 * /lec2023/{idEquipo}:
 *   get:
 *     summary: Obtiene un equipo por su ID.
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: idEquipo
 *         required: true
 *         description: ID del equipo a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna el equipo solicitado.
 *       404:
 *         description: El equipo no fue encontrado.
 */
router.get('/:idEquipo', validarIdEquipo, async (req, res) => {
  try {
    const connection = await getDatabaseConnection();
    const [results, fields] = await connection.execute('SELECT * FROM equipo WHERE id = ?', [req.params.idEquipo]);

    if (results.length === 0) {
      return res.status(404).json({
        resultado: "El equipo no fue encontrado"
      });
    }

    res.json(results);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { router, validarIdEquipo };
