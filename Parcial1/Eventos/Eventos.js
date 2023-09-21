const events = require('events');
const emisor = new events.EventEmitter();

function saludar() {
  const emisor = new events.EventEmitter();
  setTimeout(() => {
    emisor.emit('saluda', 'Juan');
  }, 5000);
  setTimeout(() => {
    emisor.emit('saluda', 'Juan');
  }, 8000);
  setTimeout(() => {
    emisor.emit('saluda', 'Juan');
  }, 3000);
  return emisor;
}

let sal = saludar();

sal.on('saluda', (nombre) => {
  console.log('Hola ' + nombre);
});
