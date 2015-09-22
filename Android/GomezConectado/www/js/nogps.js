
function loadGPS(){
    
    $('.btnNext').on('click',function(){
         //gpsDetect.switchToLocationSettings(onGPSActiveSuccess,onGPSActiveFail);
         gpsDetect.switchToLocationSettings();
         mainView.loadPage('index.html');
         
    });
     $('.btnCancelar').on('click',function(){
         mainView.loadPage('index.html');
    });
     /*
    function onGPSActiveSuccess(on) {
            alert('yeeeei');
        }

        function onGPSActiveFail(e) {
            alert("Error : "+e);
        }
        */
}