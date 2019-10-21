const assert = require('assert');
const ObjectID = require ('mongodb').ObjectID;

function createRoutes (app, db) {

    app.get('/', (request, response) => {
        console.log('alguien entró a la ruta inicial');
        response.sendFile(__dirname + '/public/main.html');
        
    });
    


    app.get('/api/carItems', (request, response) => {
        const products = db.collection('products');
        
        //buscamos todos los productos
        products.find({})
        //transformamos el cursor a una arreglo
        .toArray((err,result) => {
            //aseguramos de que no hay error
            assert.equal(null,err);
            
            response.send(result);
        });
    });

    
    app.post('/api/carItems',(request,response) => {
        console.log(request.body);

        const products = db.collection('products');
        products.insert(request.body);

        response.send({
            message: 'ok'
        });
    });

    app.delete('/api/carItems',(request,response) =>{
        var index = request.body.indexToDelete;
        console.log(index);
        const products = db.collection('products');
        products.deleteOne({
            _id: new ObjectID(index),
        },function(err,result){
            console.log(err,result);
        });
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
    
    
}

module.exports = createRoutes;
