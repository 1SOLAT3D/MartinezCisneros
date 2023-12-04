const chai = require('chai');
const expect = chai.expect;
const suma = require('./src/modulo');

describe('My module',function(){
    it('se debe sumar dos numeros', function(){
        const resultado = suma(5,6);
        expect(resultado).to.equal(11);
    })
    it('se debe sumar dos numeros de diferentes signos', function(){
        const resultado = suma(-5,6);
        expect(resultado).to.equal(1);
    })
    it('deberia sumar cero', function(){
        const resultado = suma(0,6);
        expect(resultado).to.equal(6);
    });
    it('deberia sumar dos numeros negativos', function(){
        const resultado = suma(-5,-6);
        expect(resultado).to.equal(-11);
    })
});