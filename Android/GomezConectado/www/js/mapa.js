
        var map = null;
        var d = null;
        var lat = null;
        var long = null;

       

        function GetMap()
{
    
      
       Microsoft.Maps.Globals.defaultTileSize = 128;
       map = new Microsoft.Maps.Map(document.getElementById("map"), {credentials:"Ag_Bk_XsqB3DuVPFNqtjDxH8GC-v7z1PmogmSxqUL8zRliu086_9wshHMjWoW9Ie",showDashboard:false,enableSearchLogo:false,showScalebar:false});
      
       var geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(map);  
       map.setView({mapTypeId:Microsoft.Maps.MapTypeId.road});
       map.entities.clear();
        
        //geoLocationProvider.getCurrentPosition({errorCallback: function(error){displayAlert('Error: '+error.errorCode);}}); 
        geoLocationProvider.getCurrentPosition({showAccuracyCircle: false}); 
        window.navigator.geolocation.getCurrentPosition(displayCenter,onError);
        //attachPushpinDragEndEvent();       
   }
     
     function displayCenter(position){
        lat = position.coords.latitude;
        long = position.coords.longitude;
         longitud= long;
         latitud = lat;
        attachPushpinDragEndEvent();
     }
          
          function onError(error){
              alert('codigo: '+error.code+ '\n'+ 'message: '+ error.message + '\n');
          }
          
      function attachPushpinDragEndEvent()
      {
          var urlmarker="";
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
          
          
          
        //var pushpinOptions = {icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',draggable:true}; 
        var pushpinOptions = {icon: urlmarker, width: 80, height: 80, draggable:true}; 
        var pushpin= new Microsoft.Maps.Pushpin(map.getCenter(), pushpinOptions); 
        var pushpindragend= Microsoft.Maps.Events.addHandler(pushpin, 'dragend', endDragDetails);  
        pushpin.setLocation(new Microsoft.Maps.Location(lat, long)); 
        map.entities.push(pushpin); 
        d = document.getElementsByClassName('MapPushpinBase');  
      }
      
      endDragDetails = function (e) 
      {
          d[0].className =   d[0].className + ' bounce animated';
          var locacion = e.entity.getLocation();
          lat = locacion.latitude;
          long = locacion.longitude;
          longitud = long;
          latitud = long;      
     
      }
      
          