$(document).ready(function(){
	$(document).on('click','.omitir', function(){
    	imagenurl = 'img/sinfoto.png';
        mainView.loadPage('tipo-serv.html');     
    });     
    
    $(document).on('click','#cirlce-take-pic',function(){
    	navigator.camera.getPicture(onSuccess, onFail, { quality : 25,
        	destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 400,
            saveToPhotoAlbum: false });
        function onSuccess(imageData) {
        	imagenurl = imageData;
            mainView.loadPage('tipo-serv.html');
        }
        function onFail(message) { }
    });
                   
    $(document).on('click','#flatRedCircle', function(){
    	navigator.camera.getPicture(onSuccess, onFail, {quality:20,
    	    destinationType: Camera.DestinationType.FILE_URI,
    	    sourceType : navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
    	    targetWidth: 400,
    	    targetHeight: 400});
        function onSuccess(imageData) {
        	imagenurl = imageData;
            mainView.loadPage('tipo-serv.html');      
        }
        function onFail(message) { }
    });  
});