const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const rte = require('./lec2023.js')



app.use(express.json())
app.use(cors());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
    app.use(morgan('combined', { stream: accessLogStream }))
    
    app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.use('/lec2023',rte.router);

const dataDeBase = {
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'lec2023'
}
app.listen(8080,(req,resp)=>{
    console.log("Servidor express escuchando Puerto " + 8080);
});