const fs = require('fs');
const path = require('path');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const morgan = require('morgan');
const redoc = require('redoc-express');
const rte = require('./routes/lec2023');

const readmePath = path.join(__dirname, 'README.md');
const readmeContent = fs.readFileSync(readmePath, 'utf8');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API LEC 2023',
      version: '1.0.0',
      description: readmeContent,
    },
    servers: [
      { url: 'http://localhost:8080' }
    ],
  },
  apis: [`${path.join(__dirname, "./routes/lec2023.js")}`],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
const app = express();

app.use(express.json());
app.use(cors());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/redoc', redoc({
  title: 'API LEC 2023',
  specUrl: '/api-docs/swagger.json',
}));

app.get('/', function (req, res) {
  res.send('hello, world!');
});

app.use('/lec2023', rte.router);

const swaggerJsonPath = path.join(__dirname, 'swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf8'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, { explorer: true }));

app.listen(8080, () => {
  console.log('Servidor Express escuchando en el puerto 8080');
});
