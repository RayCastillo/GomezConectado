$(document).ready(function () {  
    
    $(document).on('click','.omitir', function(){
             
        imagenurl = 'img/sinfoto.jpg';
        mainView.loadPage('tipo-serv.html');
        
              
    });
    
    $(document).on('click','#cirlce-take-pic',function(){
        
               navigator.camera.getPicture(onSuccess, onFail, { quality: 40,destinationType: Camera.DestinationType.DATA_URI});
               function onSuccess(imageData) {
                   imagenurl = imageData;
                   mainView.loadPage('tipo-serv.html');
          
               }
               function onFail(message) {
                   
               }
           });
    $(document).on('click','#flatRedCircle', function(){
               navigator.camera.getPicture(onSuccess, onFail, {destinationType: Camera.DestinationType.DATA_URI, sourceType  : navigator.camera.PictureSourceType.SAVEDPHOTOALBUM});
               function onSuccess(imageData) {
                   imagenurl = imageData;
                   mainView.loadPage('tipo-serv.html');
                  
               }
               function onFail(message) {
               
               }
          });
    
  

    
    
});