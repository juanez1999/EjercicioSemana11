window.addEventListener('load', function(){
    var form= document.querySelector('.form');
    var text = document.querySelector('.text');
    var tires = document.querySelector('.tires');
    


    form.addEventListener('submit',function(event){
        event.preventDefault();
        console.log(text.value);
        console.log(tires.value);

    });


});