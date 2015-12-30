// Initialize your app
var myApp = new Framework7({
    template7Pages: true,
    pushState: false,
    cache: false,
    uniqueHistory: false,
    imagesLazyLoadThreshold:50,
    imagesLazyLoadSequential:false,
    imagesLazyLoadPlaceholder:"img/lazyload.png",
    modalButtonCancel: "Cancelar",
    modalButtonOk: "Aceptar",
    modalTitle: "Gómez Conectado"
});

// Export selectors engine
var $$ = Framework7.$;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false,
    template7Pages: true
});

// Event listener to run specific code for specific pages
var linkHome;
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    sendAnalytics(page.name);

    //alert($('.page').attr('data-page') +' '+page.name);
    /*document.addEventListener("backbutton", function(e){
        e.preventDefault();
        //navigator.app.exitApp();
        mainView.back();
    }, false);*/

    if (page.name === 'index') {
       // myApp.swiper('swiper-container',{speed:400, spaceBetween:100});
       loadReportesPend();
    }
    
    if (page.name === 'login') {
      iniciarFB();
    }
   
    if (page.name === 'noticias') {
        loadFeeds();
    }
    if (page.name === 'tipo-serv') {
       loadtipoServ();
    }
    if (page.name === 'enviar') {
        //checkLoggedUser();
        alistarEnvio();

    }
	if (page.name === 'success') {
        mainView.loadPage('index.html');
    }
    if (page.name === 'gps-notify') {
        loadGPS();        
    }
    if (page.name === 'mis-reportes') {
        getMisReportes();      
    }
    if (page.name === 'consulta') {
        var pag=page.fromPage;
        if(pag.name === "success") {
        	prepararConsulta();           
        }
    }
    if (page.name === 'obraspub') {
    	titulo = "Conoce más sobre Obras Públicas";
        link = "http://www.gomezconganas.mx/?page_id=345";
    }
    if (page.name === 'alumbrado') {
        titulo = "Gómez Palacio: Obras - Alumbrado Público";
        link = "http://www.gomezconganas.mx/?page_id=337";
    }
    if (page.name === 'bacheo') {
    	titulo = "Gómez Palacio: Obras - Bacheo";
    	link = "http://www.gomezconganas.mx/?page_id=342";
    	imagefb= "https://s3.amazonaws.com/gmz/img/covers-bacheo.jpg";
    }
    if (page.name === 'cerropila') {
    	titulo = "Gómez Palacio: Obras - Cerro de la Pila";
        link = "http://www.gomezconganas.mx/?page_id=331";
    }
    if (page.name === 'corredor') {
        titulo = "Gómez Palacio: Obras - Corredor del Periférico";
        link = "http://www.gomezconganas.mx/?page_id=314";
    }
    if (page.name === 'guadalupev') {
    	titulo = "Gómez Palacio: Obras - Deportiva Guadalupe Victoria";
        link = "http://www.gomezconganas.mx/?page_id=327";
    }
    if (page.name === 'esmeralda') {
        titulo = "Gómez Palacio: Obras - Deportiva la Esmeralda";
        link = "http://www.gomezconganas.mx/?page_id=322";
    }
    if (page.name === 'gcgpage') {
    	titulo = "Gómez Palacio: Programas - Becas";
        link = "http://www.gomezconganas.mx/?page_id=616";
    }
    if (page.name === 'escuela') {
    	titulo = "Gómez Palacio: Programas - Escuela Con Ganas";
        link = "http://www.gomezconganas.mx/?page_id=619";
    }
    if (page.name === 'gconganas') {
    	titulo = "Gómez Palacio: Programas - Gómez Con Ganas";
        link = "http://www.gomezconganas.mx/?page_id=620";
    }
    if (page.name === 'espacio') {
    	titulo = "Gómez Palacio: Programas - Mi Espacio con Ganas";
        link = "http://www.gomezconganas.mx/?page_id=618";
    }
    if (page.name === 'c-comuni') {
    	titulo = "Gómez Palacio: Programas - Centros Comunitarios";
        link = "http://www.gomezconganas.mx/?page_id=617";
    }
    if (page.name === 'mercadito') {
    	titulo = "Gómez Palacio: Programas - Mercadito Subsidiado";
        link = "http://www.gomezconganas.mx/?page_id=621";
    }
    if (page.name === 'feriaempleo') {
    	titulo = "Gómez Palacio: Programas - Feria del Empleo";
        link = "http://www.gomezconganas.mx/?page_id=622";
    }

    //Genera enlace a Inicio.
    if(!linkHome) {
        $('#enlaceHome').attr('href','index.html');
        linkHome = true;
    }

    /*if (page.name === 'trabaja') {
        //loadFeedsTrabaja();
    }
	if (page.name === 'programas') {
		cicloGomezConGanas(5);
	}
	if (page.name === 'obras') {
		cicloGomezConGanas(4);
	}*/
});

$$(document).on('pageAfterAnimation', function (e) {
    var page = e.detail.page;
    if (page.name === 'success') {
    	animarFolio();
    }
    if (page.name === 'location') {
        gpsDetect = cordova.require('cordova/plugin/gpsDetectionPlugin');
        gpsDetect.checkGPS(onGPSSuccess, onGPSError);
        function onGPSSuccess(on) {
            if (on == false) { mainView.loadPage('gps-notify.html'); }
            else {
                $.ajax({
                     url:"http://www.google.fr/blank.html",
                      timeout:500,
                      type: "GET",
                      cache: false,
                      success: function() { initMap(); },
                      error: function() {
                          myApp.alert("No cuentas con conexión a Internet para cargar el mapa de localización. Inténtalo más tarde.", function(){
                              mainView.loadPage('index.html');
                          });
                          return;
                      }
                });
            }
        }
        function onGPSError(e) {
            alert("Error : "+e);
        }
    }
});

var auxConexion = 1;
$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;
    if(page.name === 'index') {
        loadTweets();
    }

    //Verifica conexión a Internet durante la navegación
    //alert(navigator.network.connection.type);
    /*if(navigator.network.connection.type == Connection.NONE && auxConexion == 1){
        auxConexion = 0;
        mainView.loadPage('no-internet.html');
        return;
    } else {
        auxConexion = 1;
    }*/

    $.ajax({
        url:"http://www.google.fr/blank.html",
         timeout:1000,
         type: "GET",
         cache: false,
         success: function() { auxConexion = 1; },
         error: function() {
            if(auxConexion == 1) {
                auxConexion = 0;
                mainView.loadPage('no-internet.html');
                return;
            }
         }
    });
});

function sendAnalytics(pagina) {
    var analytics = navigator.analytics;

    analytics.setTrackingId('UA-68960213-1');

    var Fields    = analytics.Fields,
        HitTypes  = analytics.HitTypes,
        LogLevel  = analytics.LogLevel,
        params    = {};

    params[Fields.HIT_TYPE]     = HitTypes.APP_VIEW;
    params[Fields.SCREEN_NAME]  = pagina;

    analytics.setLogLevel(LogLevel.INFO);
    analytics.send(params, function(){}, function(){});
}

//Obtiene dirección a partir de latitud y longitud
function ReverseGeocode(latitude, longitude, callback){
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                callback(results[0].formatted_address);
            } else {
                callback('Dirección no encontrada.');
            }
        } else {
            callback('Dirección no encontrada.');
        }
    });
}