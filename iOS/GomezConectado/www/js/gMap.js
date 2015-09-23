var map;
var urlmarker='';
var Marker;
var browserSupportFlag =  new Boolean();
 
 function initMap() {
     // Create an array of styles.
  var styles = [
    {
      stylers: [
        { hue: "#e6f6ff" },
        { luminosity: 80}
      ]
    },{
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "simplified" }
      ]
    }
  ];
     
          if(tiposerv == "395")
              urlmarker ='img/markAnimales.png';
          if(tiposerv == "9")
              urlmarker ='img/markerluz2.png';
          if(tiposerv == "61")
              urlmarker ='img/markLuminaria.png';
          if(tiposerv == "271")
              urlmarker ='img/markbache.png';
          if(tiposerv == "3")
              urlmarker ='img/markLimpieza.png';
          if(tiposerv == "38")
              urlmarker ='img/markSideapa.png';
          if(tiposerv == "38")
              urlmarker ='img/markSideapa.png';
          if(tiposerv == "359")
              urlmarker ='img/markSem.png';
          if(tiposerv == "001")
              urlmarker ='img/markOtro.png';
          
    var imagen = urlmarker;
      
     var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
     
     map = new google.maps.Map(document.getElementById('map'), {     
         zoom: 16,
         disableDefaultUI: true,
         mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
         }
     });
     
     
      var GomezPalacioCentro = new google.maps.LatLng(60, 105);
      var LuisDonaldoColosio = new google.maps.LatLng(25.586986, -103.539025);
      var FcoVilla = new google.maps.LatLng(25.618201,  -103.502795);
      var SanAntonio = new google.maps.LatLng(25.598305,-103.484160);
      var Chapala = new google.maps.LatLng(25.579630,-103.521849); 
      var LosAlamos = new google.maps.LatLng(25.598103,-103.509511);
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');
      browserSupportFlag = true;
     
      navigator.geolocation.getCurrentPosition(function(position) {
          Marker = new google.maps.Marker({
              position: {lat: position.coords.latitude, lng: position.coords.longitude},
              map: map,
              draggable: true,
              animation: google.maps.Animation.DROP,
              icon: imagen
          });
          initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          map.setCenter(initialLocation);  
          longitud= position.coords.longitude;
          latitud = position.coords.latitude;
        }, function() {
          handleNoGeolocation(browserSupportFlag);
        });
      
      var geocoder = new google.maps.Geocoder();
      document.getElementById('submitDir').addEventListener('click', function() {
          //Marker.setMap(null);
          geocodeAddress(geocoder, map);
      });
     
     function geocodeAddress(geocoder, resultsMap) {
         var address = document.getElementById('address').value;
         geocoder.geocode({'address': address}, function(results, status) {
             if (status === google.maps.GeocoderStatus.OK) {
                 Marker.setMap(null);
                 resultsMap.setCenter(results[0].geometry.location);
                 Marker = new google.maps.Marker({
                     map: resultsMap,
                     position: results[0].geometry.location,
                     draggable: true,
                     animation: google.maps.Animation.DROP,
                     icon: imagen
                 });
                    longitud= Marker.get.longitude;
                    latitud = Marker.get.latitude;
             } else {
                 alert('Geocode was not successful for the following reason: ' + status);
             }
         });
     }       
       
     document.getElementById('btnMiUbicacion').addEventListener('click', function(){
         Marker.setMap(null);
         navigator.geolocation.getCurrentPosition(function(position) {
             Marker = new google.maps.Marker({
                 position: {lat: position.coords.latitude, lng: position.coords.longitude},
                 map: map,
                 draggable: true,
                 animation: google.maps.Animation.DROP,
                 icon: imagen
          });
          
          initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          map.setCenter(initialLocation);
                longitud= position.coords.longitude;
                latitud = position.coords.latitude;
         }, function() {
             handleNoGeolocation(browserSupportFlag);
         });
    });
     
     function handleNoGeolocation(errorFlag) {
         if (errorFlag == true) {
             alert("Falló el servicio de localización.");
             initialLocation = GomezPalacioCentro;
         } else {
             alert("Ocurrió un problema al obtener tu ubicación, Te hemos posicionado en Gómez Palacio.");
             initialLocation = GomezPalacioCentro;
         }
         map.setCenter(initialLocation);
    }
    
    
}
 