
$(document).on('click','#submit',function(){
    var formInstance = $('#enviarContactoForm').parsley({
        
    });
    
   var validFlag= formInstance.isValid();
    if(validFlag){
         $('.preloader-holder').css('display','block');  
         $('.preloader-holder').html('<div class="col-25">Enviando<br><span style="width:42px; height:42px; text-align:center;" class="preloader preloader-white"></span> </div>');
        setTimeout(function(){
            enviarContacto();
        },2500);
       
     
    }
   
});
 

function enviarContacto(){
        
    var nombre_usuario = $('#nombreCompleto').attr('value');
    var correo_usuario = $('#correo').attr('value');
    var comentario_usuario = $('#comentario').attr('value');
    $('#enviarContactoForm').attr('action','http://webapi.gomezpalacio.gob.mx/api/upload');
   
  
    $('#enviarContactoForm').attr('method','POST');
    $('#enviarContactoForm').attr('enctype','multipart/form-data');
 
    var formObj = $('#enviarContactoForm');
    var formURL = 'http://webapi.gomezpalacio.gob.mx/api/upload';
    var formData = new FormData();
    formData.append("tipo",'2');
    formData.append("nombreCompleto",nombre_usuario);
    formData.append("correo",correo_usuario);
    formData.append("comentario",comentario_usuario);

    $.ajax({
        url: formURL,
        type: 'POST',
        data:formData,
        mimeType:"multipart/form-data",
        contentType:false,
        cache: false,
        processData: false,
        success: function(data, textStatus, jqXHR) 
        {
              $('.preloader-holder').css('display','none');  
             $('.preloader-holder').html('');
            myApp.alert('Tu mensaje ha sido enviado', 'Gómez Conectado', function () {
       mainView.loadPage('index.html');
    });
           
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            
        }
    });
   
}
