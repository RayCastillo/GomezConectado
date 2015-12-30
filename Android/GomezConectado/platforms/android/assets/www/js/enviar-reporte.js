function alistarEnvio(){
	$('.cover-preview img').attr('src',imagenurl);
    $('#tipoServ').attr('value',tiposerv);
    $('#latitud').attr('value',latitud);
    $('#longitud').attr('value',longitud);    
    $('#photo').attr('src',imagenurl);
    tipoenvio = $('#tipo').attr('value');

    //Obtiene datos de usuario
    $('#nombreCompleto').val(window.localStorage.getItem('nombreUsuario'));
    $('#apaterno').val(window.localStorage.getItem('aPaterno'));
    $('#amaterno').val(window.localStorage.getItem('aMaterno'));
    $('#mail').val(window.localStorage.getItem('emailUsuario'));

    ReverseGeocode(latitud, longitud, function(direccion){
        $('#direccion').attr('value', direccion);
    });
}

var db = window.openDatabase("gomez_conectado", "1.0", "gomez_conectado", 10000);
$(document).on('click','#enviarAC', function(){
    $("#enviarAC").prop("disabled", true);
    var formInstance = $('#enviarReporteForm').parsley();
    if(formInstance.isValid()){
        //Guarda datos de usuario
        window.localStorage.setItem('nombreUsuario', $('#nombreCompleto').attr('value'));
        window.localStorage.setItem('aPaterno', $('#apaterno').attr('value'));
        window.localStorage.setItem('aMaterno', $('#amaterno').attr('value'));
        window.localStorage.setItem('emailUsuario', $('#mail').attr('value'));
        //
        $('input').focusout();
        var auximg= $('.cover-preview img').attr('src');
        if (auximg == 'img/sinfoto.png'){
            /*if(navigator.network.connection.type == Connection.NONE){
                db.transaction(guardarReportePendiente, errorBD, successBD);
            } else {
                subirFotoSinImg();
            }*/

            $.ajax({
                url:"http://www.google.fr/blank.html",
                 timeout:1000,
                 type: "GET",
                 cache: false,
                 success: function() { subirFotoSinImg(); },
                 error: function() {
                    db.transaction(guardarReportePendiente, errorBD, successBD);
                 }
            });

        }else{
            /*if(navigator.network.connection.type == Connection.NONE){
                db.transaction(guardarReportePendiente, errorBD, successBD);
            } else {
                subirFoto(imagenurl);
            }*/

            $.ajax({
                url:"http://www.google.fr/blank.html",
                 timeout:1000,
                 type: "GET",
                 cache: false,
                 success: function() { subirFoto(imagenurl); },
                 error: function() {
                    db.transaction(guardarReportePendiente, errorBD, successBD);
                 }
            });
        }
    } else {
        myApp.alert('Completa el formulario del Reporte');
        $("#enviarAC").prop("disabled", false);
    }
});

function subirFotoSinImg(){  
    var nombre_usuario = $('#nombreCompleto').attr('value');
    var apPaterno_usuario = $('#apaterno').attr('value');
    var apMaterno_usuario = $('#amaterno').attr('value');
    var correo_usuario = $('#mail').attr('value');
    var descripcion_usuario = $('#descripcion').attr('value')+'. '+$('#direccion').attr('value');
    var tiposervicio = $('#tipoServ').attr('value');

    if($('#latitud').attr('value') == null || $('#latitud').attr('value') == "") {
        var latitud = 0;
    } else {
        var latitud = $('#latitud').attr('value');
    }
    if($('#longitud').attr('value') == null || $('#longitud').attr('value') == "") {
        var longitud = 0;
    } else {
        var longitud = $('#longitud').attr('value');
    }

    $('#enviarReporteForm').attr('action','http://webapi.gomezpalacio.gob.mx/api/upload');
    $('#enviarReporteForm').attr('method','POST');
    $('#enviarReporteForm').attr('enctype','multipart/form-data');
 
    var formObj = $('#enviarReporteForm');
    var formURL = 'http://webapi.gomezpalacio.gob.mx/api/upload';
    var formData = new FormData();
    formData.append("tipo",tipoenvio);
    formData.append("nombre",nombre_usuario);
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
            
            var currentUser = Parse.User.current();
            var Reporte = Parse.Object.extend("Reporte");
            var reporte = new Reporte(); 
            reporte.set("usuario", currentUser.id);
            reporte.set("folio",parseInt(text));
            reporte.save(null,{
            	success: function(reporte){
                    //Todo bien
                },error: function(reporte,error){
                    myApp.alert("Ocurrió un problema al guardar el reporte bajo tu Usuario","Gómez Conectado");
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            //alert("Ocurrió un problema: Codigo = " + textStatus);
        	//mainView.router.back();
        	$("#enviarAC").prop("disabled", false);
        	db.transaction(guardarReportePendiente, errorBD, successBD);
        }
    });
}

function subirFoto(imagen){
    var rutaImagen = imagen.split('?');
    imagen = rutaImagen[0];

    mainView.loadPage('loading.html');
    var nombre_usuario = $('#nombreCompleto').attr('value');
    var apPaterno_usuario = $('#apaterno').attr('value');
    var apMaterno_usuario = $('#amaterno').attr('value');
    var correo_usuario = $('#mail').attr('value');
    var descripcion_usuario = $('#descripcion').attr('value')+'. '+$('#direccion').attr('value');
   
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imagen.substr(imagen.lastIndexOf("/")+ 1);
	options.mimeType= "application/json";
    options.chunkedMode = false;

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

    if(latitud == null || latitud == "") {
        params.latitud = 0;
    } else {
        params.latitud = latitud;
    }
    if(longitud == null || longitud == "") {
        params.longitud = 0;
    } else {
        params.longitud = longitud;
    }

    options.params = params;
    //options.chunkedMode = false;

    if (imagen.substring(0,21)=="content://com.android") {
    	photo_split=imagen.split("%3A");
        imagen="content://media/external/images/media/"+photo_split[1];
    }

    var urlimg= encodeURI("http://webapi.gomezpalacio.gob.mx/api/upload");

    var ft = new FileTransfer();
    ft.upload(imagen,urlimg,win,fail,options,true);
}
    
var win = function (r) {
    var position=0;
    var resto= r.response;

    position = resto.indexOf("do :");
    var text = resto.slice(position+5, position+10);

    setTimeout(function(){
        mainView.router.load({
            url:'success.html',
            context:{
                folio: text,
                msj:"Tu Folio es el siguiente:"
            }
        });
    }, 1000);
}

function animarFolio(){
	$('#folioResponse').addClass('rubberBand animated');
}

var fail = function (error) {
 	 //console.log("Ocurrió un problema: Codigo = " + error.code);
     console.log("upload error source " + error.source);
     console.log("upload error target " + error.target);
     //mainView.router.back();
     $("#enviarAC").prop("disabled", false);
     db.transaction(guardarReportePendiente, errorBD, successBD);
 }

function guardarReportePendiente(tx) {
    var nombre_usuario = $('#nombreCompleto').attr('value');
    var apPaterno_usuario = $('#apaterno').attr('value');
    var apMaterno_usuario = $('#amaterno').attr('value');
    var correo_usuario = $('#mail').attr('value');
    var descripcion_usuario = $('#descripcion').attr('value');
    var tiposervicio = $('#tipoServ').attr('value');
    var latitud = $('#latitud').attr('value');
    var longitud = $('#longitud').attr('value');
    if(imagenurl == "img/sinfoto.png") {
        var imagen_usuario = "";
    } else {
        var imagen_usuario = imagenurl;
    }

    tx.executeSql('CREATE TABLE IF NOT EXISTS reportes_pendientes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre, apaterno, amaterno, mail, descripcion, tipoServ, latitud, longitud, imagenUrl);');
    tx.executeSql('INSERT INTO reportes_pendientes (nombre, apaterno, amaterno, mail, descripcion, tipoServ, latitud, longitud, imagenUrl) VALUES("'+nombre_usuario+'", "'+apPaterno_usuario+'", "'+apMaterno_usuario+'", "'+correo_usuario+'", "'+descripcion_usuario+'", "'+tiposervicio+'", "'+latitud+'", "'+longitud+'", "'+imagen_usuario+'");');
}

function errorBD(tx, err) {
    alert('Ha ocurrido un error: '+err);
    //mainView.router.back();
    mainView.loadPage('index.html');
}

function successBD() {
    if(isNaN(window.localStorage.getItem('ReportesPendientes')) || !window.localStorage.getItem('ReportesPendientes')) {
        window.localStorage.setItem('ReportesPendientes', parseInt('0'));
    }
    var reportesPendientes = parseInt(window.localStorage.getItem('ReportesPendientes')) + 1;
    window.localStorage.setItem('ReportesPendientes', reportesPendientes);
    myApp.alert('Ha ocurrido un problema con la conexión. Posteriormente podrás enviar tu reporte.', function(){
        mainView.loadPage('index.html');
    });
}