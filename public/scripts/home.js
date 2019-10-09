window.addEventListener('load', function(){
    var form= document.querySelector('.form');
    var text = document.querySelector('.text');
    var tires = document.querySelector('.tires');
    var colorpicker = document.querySelector('.color')
    
    fetch('/api/carItems')
    .then(function(response) {
        return response.json();
    })
    .then(function(listItems) {
        var container = document.querySelector('.container');
        
        listItems.forEach(element => {
            var vehicle = document.createElement('ul');
            //var vehicleElements= document.createElement('li');
            //vehicleElements.innerHTML = element.name;
            //vehicle.appendChild(vehicleElements);
            vehicle.innerHTML = '<li>'+element.name+'</li><li>'+element.wheels+'</li><li>'+element.color+'</li>';
            container.appendChild(vehicle);
        });
    });
    
    form.addEventListener('submit',function(event){
        event.preventDefault();

        var formInfo= new FormData(form);
        var data= new URLSearchParams(formInfo);
        
        var promise = fetch('/api/receiveForm', {
            method : 'POST', 
            body : data
        });
        
        promise.then((raw) => {
            return raw.json();
        }).then((info) => {
            form.reset();
            console.log(info);
        });
        
    });
    
});