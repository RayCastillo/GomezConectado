$(document).ready(function () {  
    
    $(document).on('click','.omitir', function(){
             
        imagenurl = 'img/sinfoto.png';
        mainView.loadPage('tipo-serv.html');
        
              
    });
            
    
    $(document).on('click','#cirlce-take-pic',function(){
                   navigator.camera.getPicture(onSuccess, onFail, { quality : 100,
                                               destinationType : Camera.DestinationType.FILE_URL,
                                               sourceType : Camera.PictureSourceType.CAMERA,
                                               allowEdit : true,
                                               encodingType: Camera.EncodingType.JPEG,
                                               targetWidth: 400,
                                               targetHeight: 400,
                                               saveToPhotoAlbum: false });
               function onSuccess(imageData) {
                   imagenurl = imageData;
                   mainView.loadPage('tipo-serv.html');
          
               }
               function onFail(message) {
                 
               }
           });
                   
                
                        

    $(document).on('click','#flatRedCircle', function(){
                   navigator.camera.getPicture(onSuccess, onFail, {quality:20, destinationType: Camera.DestinationType.FILE_URI, sourceType  : navigator.camera.PictureSourceType.SAVEDPHOTOALBUM});
               function onSuccess(imageData) {
                   imagenurl = imageData;
                   mainView.loadPage('tipo-serv.html');
                  
               }
               function onFail(message) {
                   
               }
          });
    
  

    
    
});