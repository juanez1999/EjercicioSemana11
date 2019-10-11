window.addEventListener('load', function(){
    var form= document.querySelector('.form');
    var text = document.querySelector('.text');
    var tires = document.querySelector('.tires');
    var colorpicker = document.querySelector('.color');
    
    
    function displayList() {
        fetch('/api/carItems')
        .then(function(response) {
            return response.json();
        })
        .then(function(listItems) {
            var container = document.querySelector('.container');
            
            container.innerHTML = "";

            listItems.forEach(element => {
                var vehicle = document.createElement('ul');
                //var vehicleElements= document.createElement('li');
                //vehicleElements.innerHTML = element.name;
                //vehicle.appendChild(vehicleElements);
                vehicle.innerHTML = '<li>'+element.name+'</li><li>'+element.wheels+'</li><li>'+element.color+'</li><button>X</button>';
                container.appendChild(vehicle);
            });

            var btns = document.querySelectorAll('ul button');

            btns.forEach(function(elem,index) {
                elem.addEventListener('click',function () {
        
                    var data= new URLSearchParams();
                    data.append('indexToDelete',index);
        
                    var promise = fetch('/api/carItems', {
                        method: 'DELETE',
                        body: data
                    });
        
                    promise.then(function(response) {
                        return response.json();
                    }).then(function(info) {
                        console.log(info);
                        displayList();
                    });
                });
            });
        });
    }
    
    displayList();
    
    form.addEventListener('submit',function(event){
        event.preventDefault();

        var formInfo= new FormData(form);
        var data= new URLSearchParams(formInfo);
        
        var promise = fetch('/api/carItems', {
            method : 'POST', 
            body : data
        });
        
        promise.then((raw) => {
            return raw.json();
        }).then((info) => {
            displayList();
            form.reset();
            console.log(info);
        });
        
    });

    
    
});