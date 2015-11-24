 var monthNames = [
                "Ene", "Feb", "Mar",
                "Abr", "May", "Jun", "Jul",
                "Ago", "Sep", "Oct",
                "Nov", "Dic"
            ];

$(document).on('click','#showFolioInput',function(){
       console.log('clicked boton');
            $('#action-buttons-consulta').transition({opacity:0},200,function(){
                $('#action-buttons-consulta').css('display','none');
            
            });
            
        
    });


    var Folios=[];
    $(document).on('click','#consultarReporte',function(){
        consultar();
    });

function prepararConsulta(){
    $('.preloader-holder').css('display','block');  
         $('.preloader-holder').html('<div class="col-25">Consultando<br><span style="width:42px; height:42px; text-align:center;" class="preloader preloader-white"></span> </div>');
    setTimeout(function(){
         $('.preloader-holder').html('');  
         $('.preloader-holder').css('display','none');  
               consultar();
               },2000);
}
        function consultar(){
        var formInstance = $('#formConsultaFolio').parsley();

        if(formInstance.isValid('folio',true) || formInstance.isValid('mail',true)){
        
        $('#ulFolios').html('');
         $('#msgNoFolio').remove();
        var mail = $('#mail').attr('value');
        var folio = $('#folio').attr('value');
        $('#folio').attr('value','');
        $('#folio').blur();
        $('#mail').attr('value','');
        $('#mail').blur();   
        $('.white-block h3').transition({opacity:0},function(){
             $('.white-block h3').css('display','none');
        });
        $('.white-block span').transition({opacity:0},function(){
             $('.white-block span').css('display','none');
        });
        $('.white-block form').transition({opacity:0},function(){
             $('.white-block form').css('display','none');
        });
         $('#consultarReporte').transition({opacity:0},function(){
             $('#consultarReporte').css('display','none');
        });
         $('.white-block').append('<div class="row"><button id="showForm" class="action-red-btn col-100">Hacer Nueva Consulta</button></div>');     
        
            
        
        var xhr = new XMLHttpRequest();
        var url= 'http://webapi.gomezpalacio.gob.mx/api/upload/?id='+folio+'&correo='+mail+'';
        xhr.open('GET', encodeURI(url));
        xhr.onload = function() {
            if (xhr.status == 200) {
                resjson= JSON.parse(xhr.responseText);
                
                Folio = resjson['Folios'];
                if(Folio.length == 0){
                   $('#ListadoReportes').append('<p id="msgNoFolio">No se encontraron resultados</p>');
                }else{
                
                for( var asunto in Folio){
                   
                    var estatus= Folio[asunto]['Estatus'].toLowerCase();
                    estatus = estatus.replace(/\s/g, "");  
                    //var fecha = new Date(Folios[asunto]['Fecha']);
                    var fecha = new Date(Folio[asunto]['Fecha'].slice(0,10));
                    
                    var comentarioRAW= Folio[asunto]['Comentario'];
                    var salida=[];
                    var FolioAndAnswers=[];
                    var position=0;
                    //var resto= ' '+comentarioRAW;
                    var resto= ' '+comentarioRAW;

                   
                     for(var i=0; i<20 ; i++){
                         if(position == -1){
                             break;
                         }
                         resto = resto.slice(position +1, resto.length);
                         position = resto.indexOf("|");
                         var text = resto.slice(0, position+1);         
                         salida.push(text);
                        
                     }
                    
                    
                 $('#ulFolios').append('<li><article class="reporte '+estatus+'"><div class="row reporte-tap"> <div class="consulta-folio col-30"> <span>Folio</span> <span class="Folio">'+Folio[asunto]['Folio']+'</span> </div><div class="col-70"> <span class="nombreAsunto">'+Folio[asunto]['Asunto']+'</span> <span class="FechaInicio">10/DIC/2015</span> </div></div></div></article><div class="answer-holder"></div> </li>');
                    
                    
                FolioAndAnswers[0]=Folio[asunto];
                FolioAndAnswers[1]=salida;
                Folios[asunto]=FolioAndAnswers;
                    
                };
                }
               
               
            }
            else{
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();
            
    }
};

    $(document).on('click','#showForm',function(){
        $('.white-block h3').transition({display:'block'},function(){
             $('.white-block h3').css('opacity',1);
        });
        $('.white-block span').transition({display:'block'},function(){
             $('.white-block span').css('opacity',1);
        });
        $('.white-block form').transition({display:'block'},function(){
             $('.white-block form').css('opacity',1);
        });
         $('#consultarReporte').transition({display:'block'},function(){
             $('#consultarReporte').css('opacity',1);
        });
        $('#msgNoFolio').remove();
            $(this).remove();
        $('#ulFolios').html('');
     
    });
    
    
    
    
    $(document).on('click','.reporte-tap',function(){
      
        $('#ulFolios .respuesta-row').remove();
       
        var article= this.parentElement;
        article= article.parentElement;
        
        var ChoosenFolio = Folios[$(article).index()];
        var salida = ChoosenFolio[1];
        if(salida !=""){
       
        var isthereaHolder=article.getElementsByClassName('answer-holder')[0];
        if(isthereaHolder.innerHTML != "" ){
            $(isthereaHolder).html("");
        }else{
        for(s in salida){
            var lastIndex=salida.length;
             var dataComent=[];
            if(--lastIndex != s){
                
                    var comentarioRAW= salida[s];
                   
                    var position=0;
            
                    var resto= ' '+comentarioRAW;


                     for(var i=0; i<20 ; i++){
                         if(position == -1){
                             dataComent.push(resto);
                             break;
                         }
                         resto = resto.slice(position, resto.length);
                         resto= resto.slice(1,resto.length);
                         position = resto.indexOf("><");
                         var text = resto.slice(0, position+1);
                         if(text !=''){
                            dataComent.push(text);
                         }
                         
                     }
            
            var holder = article.getElementsByClassName('answer-holder');
            $(holder).append('<div class="respuesta-row content-block bounceIn animated"> <div class="row"> <div class="col-100"> <span class="usuario">'+dataComent[1]+'</span> <span class="fecha-respuesta"> '+dataComent[0]+' </span> </div></div><div class="row"> <div class="col-100"> <div class="row"> <div class="col-100"> <span class="comentario">'+dataComent[2]+'</span> </div></div></div></div>');
            if(dataComent[1] == "<USUARIO>Visitante</USUARIO>"){
               $('.respuesta-row').addClass('fromuser');
               
                
            }else{
                $('.respuesta-row').addClass('fromatc');
              
            }
                
                
            }
        }
        }
        }else{
                   
                   var isthereaHolder=article.getElementsByClassName('answer-holder')[0];
                   if(isthereaHolder.innerHTML != "" ){
                   $(isthereaHolder).html("");
                   }else{
            var holder = article.getElementsByClassName('answer-holder');
            $(holder).append('<div class="respuesta-row content-block bounceIn animated"> <div class="row"> <div class="col-100"> <span class="usuario">Gómez Conectado</span></div></div><div class="row"> <div class="col-100"> <div class="row"> <div class="col-100"> <span class="comentario">Tu reporte esta siendo atendido.</span> </div></div></div></div>');
                   }
            
        }
    });

