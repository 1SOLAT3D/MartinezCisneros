const request = require('supertest');
const assert = require('assert');
const app = require('../index.js');

describe('Pruebas de API', () => {
  it('Debería obtener todos los equipos', (done) => {
    request(app)
      .get('/lec2023')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.ok(Array.isArray(res.body), 'La respuesta debería ser un array');
        done();
      });
  });
  it('Debería obtener un equipo por su ID', (done) => {
    const idEquipoExistente = 1;

    request(app)
      .get(`/lec2023/${idEquipoExistente}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 1, 'Debería devolver un equipo');
        done();
      });
  });

  it('Debería devolver 404 al intentar obtener un equipo con un ID inexistente', (done) => {
    const idEquipoInexistente = 999;

    request(app)
      .get(`/lec2023/${idEquipoInexistente}`)
      .expect(404)
      .end(done);
  });

  it('Debería crear un nuevo equipo', (done) => {
    const nuevoEquipo = {
      nombre: 'Nuevo Equipo',
      acronimo: 'NE',
      pais: 'Nuevo País',
    };

    request(app)
      .post('/lec2023')
      .send(nuevoEquipo)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.affectedRows, 1, 'Debería haber afectado una fila en la base de datos');
        done();
      });
  });

  it('Debería devolver un error 400 al intentar crear un equipo sin campos obligatorios', (done) => {
    const equipoSinCamposObligatorios = {};

    request(app)
      .post('/lec2023')
      .send(equipoSinCamposObligatorios)
      .expect(400)
      .end(done);
  });

  it('Debería actualizar un equipo existente', (done) => {
    const idEquipoExistente = 1;
    const datosActualizados = {
      nombre: 'Equipo Actualizado',
      acronimo: 'EA',
      pais: 'País Actualizado',
    };

    request(app)
      .put(`/lec2023/${idEquipoExistente}`)
      .send(datosActualizados)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.affectedRows, 1, 'Debería haber afectado una fila en la base de datos');
        done();
      });
  });

  it('Debería devolver un error 404 al intentar actualizar un equipo con un ID inexistente', (done) => {
    const idEquipoInexistente = 999;
    const datosActualizados = {
      nombre: 'Equipo Actualizado',
      acronimo: 'EA',
      pais: 'País Actualizado',
    };

    request(app)
      .put(`/lec2023/${idEquipoInexistente}`)
      .send(datosActualizados)
      .expect(404)
      .end(done);
  });

});
