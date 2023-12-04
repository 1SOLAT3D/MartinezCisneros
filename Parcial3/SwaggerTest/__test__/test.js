const request = require('supertest');
const app = require('../index.js');

describe('Pruebas al método GET de la ruta de usuario', () => {
  it('Si hago un GET a la ruta /lec2023, debería devolver un status 200', async () => {
    const response = await request(app).get('/lec2023');
    expect(response.status).toBe(200);
  });
});
