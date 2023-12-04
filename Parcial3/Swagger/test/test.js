const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

let app = 'http://localhost:8080';

const expect = chai.expect;

describe("Prueba la ruta de Equipos de LEC 2023", ()=>{
    it("Test Peticion GET",(done)=>{
        chai.request(app)
            .get("/lec2023")
            .end((err,res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    })
})