
function alistarEnvio(){
    $('.cover-preview img').attr('src',imagenurl);
    $('#tipoServ').attr('value',tiposerv);
    $('#latitud').attr('value',latitud);
    $('#longitud').attr('value',longitud);    
    $('#photo').attr('src',imagenurl);
    tipoenvio = $('#tipo').attr('value');
    
    
}

$(document).on('click','#enviarAC', function(){
    
    var formInstance = $('#enviarReporteForm').parsley();
    if(formInstance.isValid()){
        $('input').focusout();
        var auximg= $('.cover-preview img').attr('src');
        if (auximg == 'img/sinfoto.png'){
            subirFotoSinImg();
        }else{
            subirFoto(imagenurl);
        }
    }
       
});

function subirFotoSinImg(){
    
    var nombre_usuario = $('#nombreCompleto').attr('value');
    var apPaterno_usuario = $('#apaterno').attr('value');
    var apMaterno_usuario = $('#amaterno').attr('value');
    var correo_usuario = $('#mail').attr('value');
    var descripcion_usuario = $('#descripcion').attr('value');
    var tiposervicio = $('#tipoServ').attr('value');
    var latitud = $('#latitud').attr('value');
    var longitud = $('#longitud').attr('value');
    
    
 
      $('#enviarReporteForm').attr('action','http://webapi.gomezpalacio.gob.mx/api/upload');
      $('#enviarReporteForm').attr('method','POST');
      $('#enviarReporteForm').attr('enctype','multipart/form-data');
 
    var formObj = $('#enviarReporteForm');
    var formURL = 'http://webapi.gomezpalacio.gob.mx/api/upload';
    var formData = new FormData();
    formData.append("tipo",tipoenvio);
    formData.append("nombreCompleto",nombre_usuario);
    formData.append("apPaterno",apPaterno_usuario);
    formData.append("apMaterno",apMaterno_usuario);
    formData.append("correo",correo_usuario);
    formData.append("tipoServ",tiposervicio);
    formData.append("latitud",latitud);
    formData.append("longitud",longitud);
    formData.append("descripcion",descripcion_usuario);
      mainView.router.load('loading.html');
    
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
           var position=0;
           position = data.indexOf("do :");
           var text = data.slice(position+5, position+10);
         
         mainView.router.load({
                              url:'success.html',
                              context:{
                              folio: text,
                              msj:"Tu Folio es el siguiente:"
                              }
                              });
            
            
            
         
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
           alert("Ocurrió un problema: Codigo = " + textStatus);
        mainView.router.back();
        }
    });
}

function subirFoto(imagen){
    
    mainView.loadPage('loading.html');
    var nombre_usuario = $('#nombreCompleto').attr('value');
    var apPaterno_usuario = $('#apaterno').attr('value');
    var apMaterno_usuario = $('#amaterno').attr('value');
    var correo_usuario = $('#mail').attr('value');
    var descripcion_usuario = $('#descripcion').attr('value');
   
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imagen.substr(imagen.lastIndexOf("/")+ 1);
    options.mimeType= "image/jpeg";
    options.headers={Connection : "close"};
   
   var params = new Object();
   params.tipo = tipoenvio;
   params.nombre = nombre_usuario;
   params.apPaterno = apPaterno_usuario;
   params.apMaterno = apMaterno_usuario;
   params.correo = correo_usuario;
   params.descripcion = descripcion_usuario;
   params.tipoServ = tiposerv;
   params.latitud = latitud;
   params.longitud = longitud;
        
   
   options.params = params;
    options.chunkedMode = true;
 

        
        var urlimg= encodeURI("http://webapi.gomezpalacio.gob.mx/api/upload");
        //var urlimg="http://webapi.gomezpalacio.gob.mx/api/upload/";
        var ft = new FileTransfer();
        ft.upload(imagen,urlimg,win,fail,options,true);
    
    }
    
     var win = function (r) {
        //console.log("Code = " + r.responseCode);
        //console.log("Response = " + r.response);
         var position=0;
         var resto= r.response;
         position = resto.indexOf("do :");
         var text = resto.slice(position+5, position+10);
        //console.log("Sent = " + r.bytesSent);
    

         mainView.router.load({
                              url:'success.html',
                              context:{
                              folio: text,
                              msj:"Tu Folio es el siguiente:"
                              
                              }
                              });
       
         
        
    }
function animarFolio(){
      $('#folioResponse').addClass('rubberBand animated');
}

    var fail = function (error) {
        alert("Ocurrió un problema: Codigo = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
        
        mainView.router.back();
        
    }