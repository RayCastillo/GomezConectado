

$(document).on('click','#shareTwitter', function(){
    window.plugins.socialsharing.shareViaTwitter(titulo, url /* img */,link +' vía @gp_dgo');
});
$(document).on('click','#shareWhats', function(){
  window.plugins.socialsharing.shareViaWhatsApp(titulo, url /* img */, link /* url */, function() {console.log('share ok')}, function(errormsg){
     // alert(errormsg)
  })
});

$(document).on('click','#shareFB', function(){
    window.plugins.socialsharing.shareViaFacebook(titulo, null , link /* url */, function() {
        console.log('share ok')}, function(errormsg){
        //alert(errormsg)
    })
});

$(document).on('click','#shareMail', function(){
    var linkshared ='<a href="'+link+'">'+titulo+'</a>';
    window.plugins.socialsharing.shareViaEmail(
          'Hola, te comparto este artículo...'+linkshared+'', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
          titulo,
          null, // TO: must be null or an array
          null, // CC: must be null or an array
          null, // BCC: must be null or an array
          null, // FILES: can be null, a string, or an array
          onSuccessMail, // called when sharing worked, but also when the user cancelled sharing via email (I've found no way to detect the difference)
          onErrorMail // called when sh*t hits the fan
        );
    
    function onSuccessMail(){}
    function onErrorMail(){}
});
