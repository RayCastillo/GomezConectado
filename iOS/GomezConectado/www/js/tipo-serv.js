
function loadtipoServ(){
    
    $('.page[data-page="tipo-serv"] .page-content').css('opacity',1);
    $('.cover-preview img').attr('src',imagenurl);
    $('.cover-preview').addClass('fadeInDown animated');
    $('.tarjeta').addClass('fadeInUp animated');
    $('.servicio').on('click', function(){
        var num = this.getElementsByTagName('numero-servicio')[0];
        tiposerv =num.innerHTML;
    });
   
    $('.popover-takepic').on('click',function(){
         navigator.camera.getPicture(onSuccess, onFail, { quality: 50,destinationType: Camera.DestinationType.FILE_URI});
               function onSuccess(imageData) {
                   imagenurl = imageData;
                   $('.cover-preview img').attr('src',imagenurl);
                   $('.cover-preview').addClass('fadeInDown animated');
                
          
               }
               function onFail(message) {
                   
               }
    });
    
    $('.popover-selectbiblioteca').on('click', function(){
         navigator.camera.getPicture(onSuccess, onFail, {destinationType: Camera.DestinationType.FILE_URI, sourceType  : navigator.camera.PictureSourceType.SAVEDPHOTOALBUM});
               function onSuccess(imageData) {
                   imagenurl = imageData;
                   $('.cover-preview img').attr('src',imagenurl);
                   $('.cover-preview').addClass('fadeInDown animated');
                 
                  
               }
               function onFail(message) {
               
               }
    });

}