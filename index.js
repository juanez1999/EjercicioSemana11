
// importar módulo
const express = require('express');
// importar body parser
var bodyParser = require('body-parser');

// instanciar app
const app = express();

// configuración body parser para poder usar variables post en el body
app.use(bodyParser.urlencoded({ extended: true }));

// definir puerto
const port = 3000;

// definir una carpeta como pública
app.use(express.static('public'));

app.get('/', (request, response) => {
    console.log('alguien entró a la ruta inicial');
    response.sendFile(__dirname + '/public/main.html');
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});






