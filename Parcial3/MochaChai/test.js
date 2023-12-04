const chai = require('chai');
const expect = chai.expect;

const modulo = require('./src/modulo.js');

describe('Operaciones Matemáticas', function () {
  describe('sumar', function () {
    it('Debería sumar dos números positivos correctamente', function () {
      const resultado = modulo.sumar(2, 3);
      expect(resultado).to.equal(5);
    });

    it('Debería sumar un número negativo y uno positivo correctamente', function () {
      const resultado = modulo.sumar(-2, 3);
      expect(resultado).to.equal(1);
    });

    it('Debería sumar dos números negativos correctamente', function () {
      const resultado = modulo.sumar(-2, -3);
      expect(resultado).to.equal(-5);
    });
  });
});
