
$(document).on('click','#submit',function(){
    var formInstance = $('#enviarReporteForm').parsley({
        
    });
    
   var validFlag= formInstance.isValid();
    if(validFlag){
        enviarContacto();
    }
   
});
 

function enviarContacto(){
        
    mainView.loadPage('loading.html');
    var nombre_usuario = $('#nombreCompleto').attr('value');
    var correo_usuario = $('#correo').attr('value');
    var comentario_usuario = $('#comentario').attr('value');
    $('#enviarReporteForm').attr('action','http://webapi.gomezpalacio.gob.mx/api/upload');
   
  
    $('#enviarReporteForm').attr('method','POST');
    $('#enviarReporteForm').attr('enctype','multipart/form-data');
 
    var formObj = $('#enviarReporteForm');
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
           
          mainView.loadPage('success.html');
           
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            alert('fallo');
        }
    });
   
}
