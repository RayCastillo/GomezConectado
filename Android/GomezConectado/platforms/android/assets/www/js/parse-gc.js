function checkLoggedUser(){
    var currentUser = Parse.User.current();
    if(currentUser){
        $("#nombreCompleto").val(currentUser.attributes.nombreCompleto[0]);
        $("#apaterno").val(currentUser.attributes.nombreCompleto[1]);
        $("#amaterno").val(currentUser.attributes.nombreCompleto[2]);
        $("#mail").val(currentUser.attributes.email);
    }else{
        myApp.confirm("Tu reporte esta listo! Pero antes de mandarlo, es necesario que inicies sesión en tu cuenta.","Oh, espera!", function () {
       mainView.loadPage("login.html");
      },
      function () {
        myApp.alert('You clicked Cancel button');
      }
        );
    }
}

$(document).on('click','#fbLoginbtn',function(){
  
    checkLoginState();
});

$(document).on('click',"#login",function(){
    var user= $("#username").val();
    var pass= $("#pass").val();
    Parse.User.logIn(user,pass,{
        success: function( user){
            mainView.loadPage("enviar.html");
        },error: function( user, error){
            myApp.alert("Ocurrió un error"+ error.message)
        }
    });
});
$(document).on('click',"#cerrarses",function(){
    Parse.User.logOut();
});


function getMisReportes(){

    var query = new Parse.Query("Reporte");
    query.equalTo("usuario","PzXgNogKBp");
      query.descending("createdAt");
    query.find({
        success: function(folios){
            var html="";
            for(var i=0; i< folios.length; i++){
                html = html +  '<li><article class="reporte captura"><div class="row reporte-tap"> <div class="consulta-folio col-30"> <span>Folio</span> <span class="Folio">'+folios[i].attributes.folio+'</span> </div><span class="FechaInicio">Fecha: '+folios[i].createdAt.getDate()+'-'+folios[i].createdAt.getMonth()+'-'+folios[i].createdAt.getFullYear()+'</span> </div></div></div></article><div class="answer-holder"></div> </li>';
            }
            $("#ulMisFolios").append(html);
        },error(folios, error){
            alert("Ocurrio error:" + error.message);
        }
    });
    
}