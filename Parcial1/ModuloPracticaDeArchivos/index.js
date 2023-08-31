const fsc = require('fs');
const { default: jsPDF } = require('jspdf');
var xl = require('excel4node');
const path = require('path');

console.log(__dirname);
console.log(__filename);


// Generacion de un archivo de texto con el modulo fs usando Callbacks

fsc.writeFile(path.join(__dirname, 'archivoc.txt'), "archivo creado API Callback",(err) =>{
    if (err)
    {
        console.log(err)
    }
    else
    {
        console.log("ARchivo creado con el API fs Callback")
    }
})


// Instalacion de paquete JsPDF para agregarle a la aplcacion la habilidad de generar PDF

const doc = new jsPDF();
doc.text("Hello World! :3", 10, 10);
doc.save(path.join(__dirname, "a4.pdf"));


// Generacion de Excel

var wb = new xl.Workbook();
var ws = wb.addWorksheet('Sheet 1');
var ws2 = wb.addWorksheet('Sheet 2');

var style = wb.createStyle({
  font: {
    color: '#FF0800',
    size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});

ws.cell(1, 1)
  .number(100)
  .style(style);

wb.write(path.join(__dirname, 'Excel.xlsx'));