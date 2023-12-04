const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
chai.use(chaiHttp);

let app = 'http://localhost:8080';

describe("Pruebas al método GET de la ruta de usuario", () => {
  it("Debería obtener todos los equipos (status 200)", (done) => {
    chai.request(app)
      .get("/lec2023")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it("Debería obtener un equipo por su ID (status 200)", (done) => {
    chai.request(app)
      .get("/lec2023/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it("Debería devolver un error 404 al intentar obtener un equipo inexistente por su ID", (done) => {
    chai.request(app)
      .get("/lec2023/999")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe("Pruebas al método POST de la ruta de usuario", () => {
  it("Debería crear un nuevo equipo (status 200)", (done) => {
    const nuevoEquipo = {
      nombre: "Nuevo Equipo",
      acronimo: "NE",
      pais: "Nuevo País"
    };

    chai.request(app)
      .post("/lec2023")
      .send(nuevoEquipo)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Debería devolver un error 400 al intentar crear un equipo sin proporcionar campos obligatorios", (done) => {
    const equipoInvalido = {
      nombre: "Nuevo Equipo Inválido"
    };

    chai.request(app)
      .post("/lec2023")
      .send(equipoInvalido)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe("Pruebas al método DELETE de la ruta de usuario", () => {
    it("Debería eliminar un equipo por su ID (status 200)", (done) => {
      chai.request(app)
        .delete("/lec2023/1")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.resultado).to.equal("Equipo eliminado");
          done();
        });
    });
  
    it("Debería devolver un error 404 al intentar eliminar un equipo inexistente por su ID", (done) => {
      chai.request(app)
        .delete("/lec2023/999")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  
  describe("Pruebas al método PUT de la ruta de usuario", () => {
    it("Debería actualizar un equipo por su ID (status 200)", (done) => {
      const equipoActualizado = {
        nombre: "Equipo Actualizado",
        acronimo: "EA",
        pais: "País Actualizado"
      };
  
      chai.request(app)
        .put("/lec2023/1")
        .send(equipoActualizado)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.resultado).to.equal("Equipo actualizado");
          done();
        });
    });
  
    it("Debería devolver un error 404 al intentar actualizar un equipo inexistente por su ID", (done) => {
      const equipoActualizado = {
        nombre: "Equipo Actualizado"
      };
  
      chai.request(app)
        .put("/lec2023/999")
        .send(equipoActualizado)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it("Debería devolver un error 400 al intentar actualizar un equipo sin proporcionar campos obligatorios", (done) => {
      const equipoInvalido = {
        acronimo: "EA"
      };
  
      chai.request(app)
        .put("/lec2023/1")
        .send(equipoInvalido)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  
  describe("Pruebas al método PATCH de la ruta de usuario", () => {
    it("Debería actualizar parcialmente un equipo por su ID (status 200)", (done) => {
      const equipoParcialmenteActualizado = {
        nombre: "Equipo Parcialmente Actualizado"
      };
  
      chai.request(app)
        .patch("/lec2023/1")
        .send(equipoParcialmenteActualizado)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.resultado).to.equal("Equipo actualizado parcialmente");
          done();
        });
    });
  
    it("Debería devolver un error 404 al intentar actualizar parcialmente un equipo inexistente por su ID", (done) => {
      const equipoParcialmenteActualizado = {
        nombre: "Equipo Parcialmente Actualizado"
      };
  
      chai.request(app)
        .patch("/lec2023/999")
        .send(equipoParcialmenteActualizado)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it("Debería devolver un error 400 al intentar actualizar parcialmente un equipo sin proporcionar campos válidos", (done) => {
      const equipoInvalido = {};
  
      chai.request(app)
        .patch("/lec2023/1")
        .send(equipoInvalido)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  