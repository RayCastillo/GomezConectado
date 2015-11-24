google.load("feeds", "1");

var monthNames = [
	"Ene", "Feb", "Mar",
    "Abr", "May", "Jun", "Jul",
    "Ago", "Sep", "Oct",
    "Nov", "Dic"
];

var link= null;
var titulo= null;
var contenido= null;
var url= null;
var fecha= null;
var dia= null;
var mes= null;
var year= null;

function loadFeeds() {
	google.setOnLoadCallback(initialize(10));
    function initialize(posts) {
    	var feed = new google.feeds.Feed("http://www.gomezpalacio.gob.mx/?feed=rss2");
        feed.setNumEntries(posts);
        feed.load(function(result) {
        	if (!result.error) {
            	var container = document.getElementById("ul-feed");
                for (var i = 0; i < result.feed.entries.length; i++) {
                	var entry = result.feed.entries[i];
                    var li = document.createElement("li");
                    var entrydate = new Date( entry.publishedDate);
                           
                    link = entry.link;
                    titulo = entry.title;
                    contenido = entry.content;
					if(entry.mediaGroups)
						url = entry.mediaGroups[0].contents[0].url;
					else
						url = 'img/logoNoticia.jpg';
					fecha = entrydate.getDate() +'/'+ monthNames[entrydate.getMonth()]+'/'+entrydate.getFullYear();
					dia = entrydate.getDate();
                    mes = monthNames[entrydate.getMonth()];
                    year = entrydate.getFullYear();   
                         
                    li.innerHTML = '<article><header><div class="cover-layer"></div><div class="noticia-coverimg"><img src="'+url+'"></div></header><div class="noticia-list-resume row"><h2 class="noticia-list-title col-100">'+titulo+'</h2></div><div class="desc" style="display:none;">'+contenido+'</div><div class="dia" style="display:none;">'+dia+'</div><div class="mes" style="display:none;">'+mes+'</div><div class="year" style="display:none;">'+year+'</div><div class="link" style="display:none;">'+link+'</div></article>';
                    container.appendChild(li);
                }
            }
        });
    }
    
    $(document).on('click','#ul-feed li',function(){
    	var er = this;
        contenido = er.getElementsByClassName('desc')[0].innerHTML;
        titulo = er.getElementsByClassName('noticia-list-title')[0].innerHTML;
        var imagen = er.getElementsByClassName('noticia-coverimg')[0];
        url = imagen.getElementsByTagName('img')[0];
        url = url.src;
        dia = er.getElementsByClassName('dia')[0].innerHTML;
        mes= er.getElementsByClassName('mes')[0].innerHTML;
        year = er.getElementsByClassName('year')[0].innerHTML;
        link = er.getElementsByClassName('link')[0].innerHTML;
       
        var salida ='';
        /*var position=0;
        var resto= ' '+contenido;
        
         for(var i=0; i<20 ; i++){
             if(position == -1){
                 break;
             }
             resto = resto.slice(position +1, resto.length);
             position = resto.indexOf(".");
             var text = resto.slice(0, position+1);         
             salida = salida + '<p>' + text + '</p>';
         }*/
        salida = contenido.replace(/<br>/gi, "<br><br>");
     
        mainView.router.load({
        	url:'noticia.html',
            context:{
            	titulo: titulo,
                contenido: salida,
                link: link,
                url:url,
                imagen: '<img class="col-100" src="'+url+'">',
                fecha: {
                    dia: dia,
                    mes:mes,
                    año: year
                }
            }
        });     
    });
}

function loadFeedsTrabaja(urlFeed) {
    google.setOnLoadCallback(initialize(10));
        function initialize(posts) {
			//alert(urlFeed);
        	var feed = new google.feeds.Feed(urlFeed);
            feed.setNumEntries(posts);
            feed.load(function(result) {
            	if (!result.error) {
                	//var container = document.getElementById("ul-feed-trabaja");

                	$('#ul-feed-trabaja').html('');

                    $('.white-block h3').transition({opacity:0},function(){
                         $('.white-block h3').css('display','none');
                    });
                    $('.white-block span').transition({opacity:0},function(){
                         $('.white-block span').css('display','none');
                    });
                    $('.white-block form').transition({opacity:0},function(){
                         $('.white-block form').css('display','none');
                    });
                     $('#consultarTrabajo').transition({opacity:0},function(){
                         $('#consultarTrabajo').css('display','none');
                    });
                     $('.white-block').append('<div class="row"><button id="showTrabajo" class="action-red-btn col-100">Hacer Nueva Consulta</button></div>');


                    //$('#ul-feed-trabaja').append('<div class="list-block accordion-list"><ul>');
                    for (var i = 0; i < result.feed.entries.length; i++) {
                    	var entry = result.feed.entries[i];
                        var li = document.createElement("li");
                        var entrydate = new Date(entry.publishedDate);

                        link = entry.link;
                        titulo = entry.title;
                        contenido = entry.content;

    					fecha = entrydate.getDate() +'/'+ monthNames[entrydate.getMonth()]+'/'+entrydate.getFullYear();
    					dia = entrydate.getDate();
                        mes = monthNames[entrydate.getMonth()];
                        year = entrydate.getFullYear();

                        //var entry2 = result.xmlDocument.getElementsByTagNameNS('item')[i];
                        //job = entry2.getElementsByTagNameNS("link")[0].textContent;

                        //alert(titulo);

                        //li.innerHTML = '<article><header><div class="cover-layer"></div></header><div class="noticia-list-resume row"><h2 class="noticia-list-title col-100">'+titulo+'</h2></div><div class="desc" style="display:none;">'+contenido+'</div><div class="dia" style="display:none;">'+dia+'</div><div class="mes" style="display:none;">'+mes+'</div><div class="year" style="display:none;">'+year+'</div><div class="link" style="display:none;">'+link+'</div></article>';
                        //container.appendChild(li);

                        $('#ul-feed-trabaja').append('<li class="accordion-item" style="background: #FFFFFF;"><a href="" class="item-content item-link"><div class="item-inner"><div class="item-title ">'+titulo+'</div></div></a> <div class="accordion-item-content"><div class="content-block">'+contenido+'</div></div></li>');
                    }
                    //$('#ul-feed-trabaja').append('</ul></div>');
                }
            });
        }
}

//Genera Parámetros para Feed de Trabaja en Gómez
$(document).on('click','#consultarTrabajo',function(){
	var cadenaFeed = "http://www.trabajaengomez.gob.mx/?feed=job_feed&job_types";
	var auxCadena = 0;
	
	if($('#freelance').is(':checked')) {
		if(auxCadena == 0) {
			cadenaFeed = cadenaFeed + "=freelance";
			auxCadena = 1;
		}
		else
			cadenaFeed = cadenaFeed + "%2Cfreelance";
	}
	
	if($('#medio').is(':checked')) {
		if(auxCadena == 0) {
			cadenaFeed = cadenaFeed + "=part-time";
			auxCadena = 1;
		}
		else
			cadenaFeed = cadenaFeed + "%2Cpart-time";
	}
	
	if($('#practicante').is(':checked')) {
		if(auxCadena == 0) {
			cadenaFeed = cadenaFeed + "=internship";
			auxCadena = 1;
		}
		else
			cadenaFeed = cadenaFeed + "%2Cinternship";
	}
	
	if($('#temporal').is(':checked')) {
		if(auxCadena == 0) {
			cadenaFeed = cadenaFeed + "=temporary";
			auxCadena = 1;
		}
		else
			cadenaFeed = cadenaFeed + "%2Ctemporary";
	}
	
	if($('#completo').is(':checked')) {
		if(auxCadena == 0) {
			cadenaFeed = cadenaFeed + "=full-time";
			auxCadena = 1;
		}
		else
			cadenaFeed = cadenaFeed + "%2Cfull-time";
	}
	
	cadenaFeed = cadenaFeed + "&search_location";
	
	if($('#ubicacion').val()) {
		cadenaFeed = cadenaFeed + "=" +$('#ubicacion').val();
	}
	
	cadenaFeed = cadenaFeed + "&job_categories&search_keywords";
	
	if($('#clave').val()) {
		cadenaFeed = cadenaFeed + "=" +$('#clave').val();
	}
	
	loadFeedsTrabaja(cadenaFeed);
});