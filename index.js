
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

// importar mongo
const MongoClient = require('mongodb').MongoClient;
//si dice requiere no es algo que se daba pasar, dice igual a algo si se debe pasar porque es una instancia
const assert = require('assert');

//importar createRoutes
const createRoutes = require('./routes.js');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'store';

// Create a new MongoClient
const client = new MongoClient(url);

//conectarse al cliente
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    
    //le dice que se conecte a la base de datos que ya creamos
    const db = client.db(dbName);
    
    
    //products es el nombre de la colección en la base de datos, debe llamarse igual 
    const products = db.collection('products');
    
    /*const obj = {
        name: 'Control',
        //si el valor es numerico se debe pasar como numero, no como string
        price: 120000,
        colors: ['white','blue'],
        description: 'lorem impsun',
        stock: 10,
        
    }
    
    products.insertOne(obj);*/
    
    
    
    
    //client.close();
    
    createRoutes(app,db);
    
});


// definir una carpeta como pública
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});














