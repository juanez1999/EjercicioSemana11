
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

var carItems=[
    {
        name: 'Hyundai',
        wheels: '10',
        color: 'Blue'
    },
    {
        name: 'Hyundai',
        wheels: '12',
        color: 'Red'
    }
]

app.get('/api/carItems', (request, response) => {
    response.send(carItems);
});

app.post('/api/carItems',(request,response) => {
    console.log(request.body);
    carItems.push(request.body);
    response.send({
        message: 'ok'
    });
});

app.delete('/api/carItems',(request,response) =>{
    var index = request.body.indexToDelete;
    carItems.splice(parseInt(index),1);
    response.send({
        message: 'deleted',
    });
});

app.put('/api/carItems',(request,response) =>{
    var elementToEdit = carItems[0];
    elementToEdit.name= 'Nuevo nombre';
    elementToEdit.wheels= '100';
    elementToEdit.color= 'Green';
    response.send({
        message: 'edited',
    });

});







