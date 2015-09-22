
function loadGPS(){
    
    $('.btnActivateGPS').on('click',function(){
         //gpsDetect.switchToLocationSettings(onGPSActiveSuccess,onGPSActiveFail);
         gpsDetect.switchToLocationSettings();
         mainView.loadPage('index.html');
        
         
    });
     $('.btnCancelar').on('click',function(){
         mainView.loadPage('index.html');
    });
}