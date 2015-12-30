/*Envía reportes guardados localmente*/
function loadReportesPend() {
    if(window.localStorage.getItem('ReportesPendientes') != null && window.localStorage.getItem('ReportesPendientes')>0) {
        $.ajax({
            url:"http://www.google.fr/blank.html",
             timeout:1000,
             type: "GET",
             cache: false,
             success: function() {
                myApp.confirm('¿Deseas enviar tus reportes pendientes?', function(){
                    var db = window.openDatabase("gomez_conectado", "1.0", "gomez_conectado", 10000);
                    db.transaction(consulta, function(tx, err) {/*alert('error en consulta db '+err);*/});

                    function consulta(tx) {
                        tx.executeSql('SELECT * FROM reportes_pendientes;', [], success, function(tx, err) {/*alert('error en consulta select '+err);*/});
                    }

                    function success(tx, results) {
                        if(navigator.network.connection.type == Connection.NONE){
                        } else {
                            window.localStorage.setItem('cadenaFolios', '');

                            asyncLoop(results.rows.length, function(loop) {
                                var idP = results.rows.item(loop.iteration()).id;
                                var nombreP = results.rows.item(loop.iteration()).nombre;
                                var apaternoP = results.rows.item(loop.iteration()).apaterno;
                                var amaternoP = results.rows.item(loop.iteration()).amaterno;
                                var mailP = results.rows.item(loop.iteration()).mail;
                                var descripcionP = results.rows.item(loop.iteration()).descripcion;
                                var tipoServP = results.rows.item(loop.iteration()).tipoServ;

                                if(results.rows.item(loop.iteration()).latitud == null || results.rows.item(loop.iteration()).latitud == "") {
                                    var latitudP = 0;
                                } else {
                                    var latitudP = results.rows.item(loop.iteration()).latitud;
                                }
                                if(results.rows.item(loop.iteration()).longitud == null || results.rows.item(loop.iteration()).longitud == "") {
                                    var longitudP = 0;
                                } else {
                                    var longitudP = results.rows.item(loop.iteration()).longitud;
                                }

                                var imagenUrlP = results.rows.item(loop.iteration()).imagenUrl;
                                if(imagenUrlP) {
                                    enviaReporteFoto(idP, nombreP, apaternoP, amaternoP, mailP, descripcionP, tipoServP, latitudP, longitudP, imagenUrlP, function(result) {
                                        loop.next();
                                    })
                                } else {
                                    enviaReporte(idP, nombreP, apaternoP, amaternoP, mailP, descripcionP, tipoServP, latitudP, longitudP, function(result) {
                                        loop.next();
                                    })
                                }

                                }, function(){
                                    console.log('Cadena '+window.localStorage.getItem('cadenaFolios'));

                                    if(window.localStorage.getItem('cadenaFolios').length > 8) {
                                        myApp.alert('Tus folios son los siguientes: '+window.localStorage.getItem('cadenaFolios'));
                                    } else {
                                        myApp.alert('Tu folio es el siguiente: '+window.localStorage.getItem('cadenaFolios'));
                                    }
                                    window.localStorage.setItem('cadenaFolios', '');

                                    window.localStorage.setItem('ReportesPendientes', '0');
                                    var db = window.openDatabase("gomez_conectado", "1.0", "gomez_conectado", 10000);
                                    db.transaction(eliminaTabla, function(tx, err) {/*alert('error borrando tabla'+err);*/});
                                    function eliminaTabla(tx) {
                                        tx.executeSql('DROP TABLE reportes_pendientes;');
                                    }
                                }
                            );
                        }
                    }
                }, function(){
                });
             },
             error: function() {
             }
        });
    }
}

function enviaReporte(idP, nombreP, apaternoP, amaternoP, mailP, descripcionP, tipoServP, latitudP, longitudP, callback) {
    var formURL = 'http://webapi.gomezpalacio.gob.mx/api/upload';
    var formData = new FormData();
    formData.append("tipo","1");
    formData.append("nombre",nombreP);
    formData.append("apPaterno",apaternoP);
    formData.append("apMaterno",amaternoP);
    formData.append("correo",mailP);
    formData.append("tipoServ",tipoServP);
    formData.append("latitud",latitudP);
    formData.append("longitud",longitudP);
    formData.append("descripcion",descripcionP);

    $.ajax({
        url: formURL,
        type: 'POST',
        data:formData,
        mimeType:"multipart/form-data",
        async: false,
        contentType:false,
        cache: false,
        processData: false,
        success: function(data, textStatus, jqXHR)
        {
            var position=0;
            position = data.indexOf("do :");
            var text = data.slice(position+5, position+10);
            var folio = text;
            var cadenaFolios = window.localStorage.getItem('cadenaFolios');
            var nuevaCadena = "";
            if(cadenaFolios != "") {
                nuevaCadena = cadenaFolios + ', ' + folio;
            } else {
                nuevaCadena = folio;
            }
            window.localStorage.setItem('cadenaFolios', nuevaCadena);
            callback();

            /*var currentUser = Parse.User.current();
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
            });*/



        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            //alert("Ocurrió un problema: Codigo = " + textStatus);
            callback();
        }
    });
}

function enviaReporteFoto(idP, nombreP, apaternoP, amaternoP, mailP, descripcionP, tipoServP, latitudP, longitudP, imagenUrlP, callback) {
    var rutaImagen = imagenUrlP.split('?');
    imagenUrlP = rutaImagen[0];

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imagenUrlP.substr(imagenUrlP.lastIndexOf("/")+ 1);
    options.mimeType= "application/json";
    options.chunkedMode = false;

    var params = new Object();
    params.tipo = "1";
    params.nombre = nombreP;
    params.apPaterno = apaternoP;
    params.apMaterno = amaternoP;
    params.correo = mailP;
    params.descripcion = descripcionP;
    params.tipoServ = tipoServP;
    params.latitud = latitudP;
    params.longitud = longitudP;


    options.params = params;
    //options.chunkedMode = false;
    if (imagenUrlP.substring(0,21)=="content://com.android") {
        photo_split=imagenUrlP.split("%3A");
        imagenUrlP="content://media/external/images/media/"+photo_split[1];
    }

    var urlimg= encodeURI("http://webapi.gomezpalacio.gob.mx/api/upload");
    var ft = new FileTransfer();

    ft.upload(imagenUrlP,urlimg,
        function(r){
            var position=0;
            var resto= r.response;
            position = resto.indexOf("do :");
            var text = resto.slice(position+5, position+10);

            var folio = text;
            var cadenaFolios = window.localStorage.getItem('cadenaFolios');
            var nuevaCadena = "";
            if(cadenaFolios != "") {
                nuevaCadena = cadenaFolios + ', ' + folio;
            } else {
                nuevaCadena = folio;
            }
            window.localStorage.setItem('cadenaFolios', nuevaCadena);
            callback();
        },
        function(error){
            //alert("Ocurrió un problema: Código = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
            callback();
        }, options,true);
}

function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}