
function alistarEnvio(){
    $('.cover-preview img').attr('src',imagenurl);
    $('#tipoServ').attr('value',tiposerv);
    $('#latitud').attr('value',latitud);
    $('#longitud').attr('value',longitud);    
    $('#photo').attr('src',imagenurl);
    tipoenvio = $('#tipo').attr('value');    
    
}
$(document).on('click','#cancelarEnvio', function(){
    myApp.load('index.html');
});
$(document).on('click','#enviarAC', function(){
    
    var formInstance = $('#enviarReporteForm').parsley();
    if(formInstance.isValid()){
        $('input').focusout();
        var auximg= $('.cover-preview img').attr('src');
        if (auximg == 'img/sinfoto.jpg'){
            subirFotoSinImg();
        }else{
            subirFoto(imagenurl);
        }
    }
       
});

function subirFotoSinImg(){
     mainView.loadPage('loading.html');
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
    options.fileNmae = imagen.substr(imagen.lastIndexOf("/")+ 1);
    options.mimeType= "application/json";
    options.headers = { Connection : "close" };
    options.chunkedMode = false;
        
    var params = {};
    params.tipo = tipoenvio;
    params.nombre = nombre_usuario;
    params.apPaterno = apPaterno_usuario;
    params.apMaterno = apMaterno_usuario;
    params.correo = correo_usuario;
    params.descripcion = descripcion_usuario;
    params.tipoServ = tiposerv;
    params.latitud = latitud;
    params.longitud = longitud;
        
    var headers = {
     "Content-Type":"application/json; charset=utf-8"
     }
        
    options.params = params;
  
 
        if (imagen.substring(0,21)=="content://com.android") {
            photo_split=imagen.split("%3A");
            imagen="content://media/external/images/media/"+photo_split[1];
        }
        
        var urlimg= encodeURI("http://webapi.gomezpalacio.gob.mx/api/upload");
         var ft = new FileTransfer();
        ft.upload(imagen,urlimg,win,fail,options);        
    }
    
     var win = function (r) {
        //console.log("Code = " + r.responseCode);
        //console.log("Response = " + r.response);
        //console.log("Sent = " + r.bytesSent);        
        //mostrarAgrdecimiento();
         mainView.loadPage('success.html');
          setTimeout(function(){
            mainView.loadPage('index.html');
         },2500);
       
         
        
    }

    var fail = function (error) {
        alert("Ocurrió un problema: Codigo = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
        //window.open('index.html');
    }