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

//Carga RSS de Noticias
/*function loadFeeds() {
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
                    var entrydate = new Date(entry.publishedDate);
                           
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
                         
                    li.innerHTML = '<article><header><div class="cover-layer"></div><div class="noticia-coverimg"><img src="'+url+'"></div></header><div class="noticia-list-resume row" style="width:100%;"><h2 class="noticia-list-title col-100">'+titulo+'</h2></div><div class="desc" style="display:none;">'+contenido+'</div><div class="dia" style="display:none;">'+dia+'</div><div class="mes" style="display:none;">'+mes+'</div><div class="year" style="display:none;">'+year+'</div><div class="link" style="display:none;">'+link+'</div></article>';
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
}*/
//Carga RSS de Noticias
function loadFeeds() {
	var RSS = "http://www.gomezpalacio.gob.mx/?feed=rss2";
	
	$.get(RSS, function(data) {
		var $xml = $(data);
		var container = document.getElementById("ul-feed");
		var aux10 = 0;
		$xml.find("item").each(function() {
			var $this = $(this),
				item = {
					titulo: $this.find('title').text(),
					url: $this.find('media\\:content, content').attr('url'),
					contenido: $this.find("encoded").text(),
					link: $this.find("link").text(),
					fecha: $this.find('pubDate').text()
				}

			var li = document.createElement("li");
			var entrydate = new Date(item.fecha);
			fecha = entrydate.getDate() +'/'+ monthNames[entrydate.getMonth()]+'/'+entrydate.getFullYear();
			dia = entrydate.getDate();
			mes = monthNames[entrydate.getMonth()];
			year = entrydate.getFullYear();

			var style = "";
			if(item.url == 'undefined' || item.url == '' || item.url == null) {
				item.url = 'img/logoNoticia2.jpg';
				style = 'style="width:100%; margin-left:0; margin-top:0;"';
			}

			li.innerHTML = '<article><header><div class="cover-layer"></div><div class="noticia-coverimg" '+style+'><img src="'+item.url+'"></div></header><div class="noticia-list-resume row" style="width:100%;"><h2 class="noticia-list-title col-100">'+item.titulo+'</h2></div><div class="desc" style="display:none;">'+item.contenido+'</div><div class="dia" style="display:none;">'+dia+'</div><div class="mes" style="display:none;">'+mes+'</div><div class="year" style="display:none;">'+year+'</div><div class="link" style="display:none;">'+item.link+'</div></article>';
			container.appendChild(li);

			aux10++;
			if(aux10 >= 10) {
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
				callback();
			}
		});
	});
}

//Carga RSS de Trabaja en Gómez
/*function loadFeedsTrabaja(urlFeed) {
    google.setOnLoadCallback(initialize(20));
        function initialize(posts) {
        	var feed = new google.feeds.Feed(urlFeed);
            feed.setNumEntries(posts);
			feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
            feed.load(function(result) {
            	if (!result.error) {
					$('.teg-logo').transition({opacity:0},function(){
                         $('.teg-logo').css('display','none');
                    });
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
					
					$(document).on('click','#showTrabajo',function(){
						$('.teg-logo').transition({display:'block'},function(){
							 $('.teg-logo').css('opacity',1);
						});
						$('.white-block h3').transition({display:'block'},function(){
							 $('.white-block h3').css('opacity',1);
						});
						$('.white-block span').transition({display:'block'},function(){
							 $('.white-block span').css('opacity',1);
						});
						$('.white-block form').transition({display:'block'},function(){
							 $('.white-block form').css('opacity',1);
						});
						 $('#consultarTrabajo').transition({display:'block'},function(){
							 $('#consultarTrabajo').css('opacity',1);
						});
						//$('#msgNoFolio').remove();
						$(this).remove();
						$('#accordion').html('');
						$('#accordion').accordion("destroy");

					});
					
					var items = result.xmlDocument.getElementsByTagName('item');
					
					for (var i = 0; i < items.length; i++) {
      					var item = items[i];
						var titulo = item.getElementsByTagName('title')[0].firstChild.nodeValue;
						var contenido = item.getElementsByTagName('encoded')[0].firstChild.nodeValue;
						var ubicacion = item.getElementsByTagName('location')[0].firstChild.nodeValue;
						var tipo = item.getElementsByTagName('job_type')[0].firstChild.nodeValue;
						var compania = item.getElementsByTagName('company')[0].firstChild.nodeValue;
						var efecha = new Date(item.getElementsByTagName('pubDate')[0].firstChild.nodeValue);
						var fecha = efecha.getDate() +'/'+ monthNames[efecha.getMonth()]+'/'+efecha.getFullYear();
						
						var cadenaHTML = "";
						cadenaHTML = '<h3 style="font-weight:bold; border:0;">'+ titulo +'</h3>';
						cadenaHTML = cadenaHTML + '<div style="background:#FFFFFF;">';
						cadenaHTML = cadenaHTML + '<div class="col-100" style="text-align:center; font-weight:bold; font-size:0.85em; color:#555555; padding-bottom:10px;">';
						cadenaHTML = cadenaHTML + tipo +' | '+ compania +' | <img src="img/gps.png" height="12px" width="12px"/> '+ ubicacion +'<br>';
						cadenaHTML = cadenaHTML + '<img src="img/calendar.png" height="12px" width="12px" style="padding-top:10px; padding-bottom:0px;"/> Publicado: '+ fecha;
						cadenaHTML = cadenaHTML + '</div>';
						cadenaHTML = cadenaHTML + contenido +'<br>';
						cadenaHTML = cadenaHTML + '<div class="col-100" style="text-align:center;">Envía por correo electrónico tus datos</div>';
						cadenaHTML = cadenaHTML + '<a href="#" id="solicitaEmpleo" onclick="solicitaEmpleo(\''+titulo+'\');">';
						cadenaHTML = cadenaHTML + '<button class="col-60 action-red-btn">Solicitar Empleo</button>';
						cadenaHTML = cadenaHTML + '</a>';
						cadenaHTML = cadenaHTML + '</div>';
						
						$('#accordion').append(cadenaHTML);
					}
                    $("#accordion").accordion({
						heightStyle: "content"
					});
					
                }
            });
        }
}*/

//Carga RSS de Trabaja en Gómez
function loadFeedsTrabaja(urlFeed) {
	$.ajax({
		type: "GET",
		url: urlFeed,
		dataType: "xml",
		success: function(xml) {
			generaFeedTrabajo(xml, 'xml');
		},
		error: function(xhr, status, error) {
			generaFeedTrabajo(xhr.responseText, 'xhr');
        }
    });
}
//Limpian CDATA del xml
function CDATA(str) {
	var res = str.substr(11,str.length-16);
	return res;
}
function CDATACONT(str) {
	var res = str.substr(11,str.length-17);
	return res;
}
function CDATAxml(str) {
	var res = str.substr(9,str.length-12);
	return res;
}
function CDATACONTxml(str) {
	var res = str.substr(9,str.length-12);
	return res;
}
//Maneja información obtenida del xml
function generaFeedTrabajo(xml, band) {
	$('.teg-logo').transition({opacity:0},function(){
		 $('.teg-logo').css('display','none');
	});
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
	$('#loaderTrabaja').css("display","none");

	$(document).on('click','#showTrabajo',function(){
		$('.teg-logo').transition({display:'block'},function(){
			 $('.teg-logo').css('opacity',1);
		});
		$('.white-block h3').transition({display:'block'},function(){
			 $('.white-block h3').css('opacity',1);
		});
		$('.white-block span').transition({display:'block'},function(){
			 $('.white-block span').css('opacity',1);
		});
		$('.white-block form').transition({display:'block'},function(){
			 $('.white-block form').css('opacity',1);
		});
		 $('#consultarTrabajo').transition({display:'block'},function(){
			 $('#consultarTrabajo').css('opacity',1);
		});
		$('#clave').val('');
		$('#ubicacion').val('');
		//$('#msgNoFolio').remove();
		$(this).remove();
		$('#accordion').html('');
		$('#accordion').accordion("destroy");

	});

	var contTotal = 0;
	$(xml).find('item').each(function(){
		var titulo = $(this).find('title').text();
		if(band == 'xhr')
			var contenido = CDATACONT($(this).find('content\\:encoded').html())+'</ul>';
		else
			var contenido = CDATACONTxml($(this).find('encoded').html());
		if(band == 'xhr')
			var ubicacion = CDATA($(this).find('job_listing\\:location').html());
		else
			var ubicacion = CDATAxml($(this).find('location').html());
		if(band == 'xhr')
			var tipo = CDATA($(this).find('job_listing\\:job_type').html());
		else
			var tipo = CDATAxml($(this).find('job_type').html());
		if(band == 'xhr')
			var compania = CDATA($(this).find('job_listing\\:company').html());
		else
			var compania = CDATAxml($(this).find('company').html());
		var efecha = new Date($(this).find('pubDate').text());
		var fecha = efecha.getDate() +'/'+ monthNames[efecha.getMonth()]+'/'+efecha.getFullYear();

		var cadenaHTML = "";
		cadenaHTML = '<h3 style="font-weight:bold; border:0;">'+ titulo +'</h3>';
		cadenaHTML = cadenaHTML + '<div style="background:#FFFFFF;">';
		cadenaHTML = cadenaHTML + '<div class="col-100" style="text-align:center; font-weight:bold; font-size:0.85em; color:#555555; padding-bottom:10px;">';
		cadenaHTML = cadenaHTML + tipo +' | '+ compania +' | <img src="img/gps.png" height="12px" width="12px"/> '+ ubicacion +'<br>';
		cadenaHTML = cadenaHTML + '<img src="img/calendar.png" height="12px" width="12px" style="padding-top:10px; padding-bottom:0px;"/> Publicado: '+ fecha;
		cadenaHTML = cadenaHTML + '</div>';
		cadenaHTML = cadenaHTML + '<div style="padding-top:5px;">'+ contenido +'</div><br>';
		cadenaHTML = cadenaHTML + '<div class="col-100" style="text-align:center;">Envía por correo electrónico tus datos</div>';
		cadenaHTML = cadenaHTML + '<a href="#" id="solicitaEmpleo" onclick="solicitaEmpleo(\''+titulo+' '+compania+'\');">';
		cadenaHTML = cadenaHTML + '<button class="col-60 action-red-btn">Solicitar Empleo</button>';
		cadenaHTML = cadenaHTML + '</a>';
		cadenaHTML = cadenaHTML + '</div>';

		$('#accordion').append(cadenaHTML);
		contTotal++;
	});
	if(contTotal == 0){
		$('#accordion').append('<div class="col-100" style="text-align:center; font-size:1.4em; padding-left:0; margin-left:0; height:100px; line-height:100px; color:#666666;">Sin Resultados</div>');
	}
	$("#accordion").accordion({
		heightStyle: "content"
	});
}

//Genera Parámetros para RSS de Trabaja en Gómez
$(document).on('click','#consultarTrabajo',function(){
	$('#loaderTrabaja').show();
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

//Genera Email para Solicitud de Empleo
function solicitaEmpleo(asunto){
    window.plugins.socialsharing.shareViaEmail(
          '',
          asunto,
          'bolsadetrabajo@gomezpalacio.gob.mx',
          null,
          null,
          null,
          onSuccessMail,
          onErrorMail
        );
    
    function onSuccessMail(){}
    function onErrorMail(){}
}

//Carga RSS de Gómez con Ganas con Google Feed
/*function loadFeedsGomezCG(aux, tipo, callback) {
    google.setOnLoadCallback(initialize(10));
        function initialize(posts) {
        	var feed = new google.feeds.Feed('http://www.gomezconganas.mx/?feed=rss2&paged='+aux);
            feed.setNumEntries(posts);
			feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
            feed.load(function(result) {
            	if (!result.error) {
					var items = result.xmlDocument.getElementsByTagName('item');
					
					for (var i = 0; i < items.length; i++) {
      					var item = items[i];
						
						if(item.getElementsByTagName('category')[0])
							var categoria = item.getElementsByTagName('category')[0].firstChild.nodeValue;
						else
							var categoria = "";
							
						if(categoria == tipo) {
							titulo = item.getElementsByTagName('title')[0].firstChild.nodeValue;
							contenido = item.getElementsByTagName('encoded')[0].firstChild.nodeValue;
							descripcion = item.getElementsByTagName('description')[0].firstChild.nodeValue;
							
							li = '<li class="gcg"><article><header><div class="gcg-coverimg"><img src="img/gcg/covers-becas.png"></div><h2 class="gcg-list-title col-xs-12">'+titulo+'</h2></header><div class="desc" style="display:none;">'+descripcion+'</div><div class="cont" style="display:none;">'+contenido+'</div></article></li>';
							//alert(li);
							$('#noticias-wrapper').append(li);
						}
					}
					
					callback();
                } else {
					callback();
				}
            });
        }
}*/

//Devuelve valor de parámetro get en una url
/*$.urlParam = function(name, url) {
    if (!url) {
     url = window.location.href;
    }
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    if (!results) {
        return undefined;
    }
    return results[1] || undefined;
}

var nombreImg5 = [['146','domingomez'],['141','deporte'],['39','covers-zumbra1'],['32','covers-escuela'],['28','covers-gomez'],['752','covers-mercado1'],['751','covers-feria1'],['750','centrocomunitario1'],['5','covers-becas']];
var nombreImg4 = [['198','san-antonio01-2000x1500'],['161','pozo'],['84','cover-periferico1'],['78','covers-esmeralda1'],['72','covers-guadalupe'],['66','covers-cerro1'],['58','covers-alumbrado'],['51','covers-bacheo'],['48','covers-obra']];
//Carga RSS de Gómez con Ganas
function loadFeedsGomezCG(aux, cat, callback) {
	$.ajax({
		type: "GET",
		url: 'http://www.gomezconganas.mx/?feed=rss2&cat='+cat+'&paged='+aux,
		//url: 'descarga_obras.xml',
		dataType: "xml",
		success: function(xml) {
			$(xml).find('item').each(function(){
				var categoria = CDATAxml($(this).find('category').html());
				var titulo = $(this).find('title').text();
				var contenido = CDATACONTxml($(this).find('encoded').html());
				var descripcion = CDATAxml($(this).find('description').html());
				var link = $(this).find('link').html();

				var idGCG = $.urlParam('p', link);

				var entrydate = new Date($(this).find('pubDate').text());
				dia = entrydate.getDate();
				mes = entrydate.getMonth()+1;
				year = entrydate.getFullYear();

				for(var i=0; i<9; i++) {
					if(eval('nombreImg'+cat)[i][0] == idGCG) {
						var vnombreImg = eval('nombreImg'+cat)[i][1];
						i = 9;
					}
				}

				if(mes < 10)
					var rutaImg = 'http://www.gomezconganas.mx/wp-content/uploads/'+year+'/0'+mes+'/'+vnombreImg+'.jpg';
				else
					var rutaImg = 'http://www.gomezconganas.mx/wp-content/uploads/'+year+'/'+mes+'/'+vnombreImg+'.jpg';

				//if(vnombreImg == 'undefined')

				li = '<li class="gcg"><article><header><div class="gcg-coverimg"><img src="'+rutaImg+'"></div><h2 class="gcg-list-title col-xs-12">'+titulo+'</h2></header><div class="desc" style="display:none;">'+descripcion+'</div><div class="cont" style="display:none;">'+contenido+'</div><div class="rutaImg" style="display:none;">'+rutaImg+'</div></article></li>';
				$('#noticias-wrapper').append(li);
			});
			callback();
		},
		error: function(xhr, status, error) {
			$(xhr.responseText).find('item').each(function(){
				var categoria = CDATA($(this).find('category').html());
				var titulo = $(this).find('title').text();
				var contenido = CDATACONT($(this).find('content\\:encoded').html());
				var descripcion = CDATA($(this).find('description').html());
				var link = $(this).find('comments').html();

				var idGCG = $.urlParam('p', link);

				var entrydate = new Date($(this).find('pubDate').text());
				dia = entrydate.getDate();
				mes = entrydate.getMonth()+1;
				year = entrydate.getFullYear();

				for(var i=0; i<9; i++) {
					if(eval('nombreImg'+cat)[i][0] == idGCG) {
						var vnombreImg = eval('nombreImg'+cat)[i][1];
						i = 9;
					}
				}

				if(mes < 10)
					var rutaImg = 'http://www.gomezconganas.mx/wp-content/uploads/'+year+'/0'+mes+'/'+vnombreImg+'.jpg';
				else
					var rutaImg = 'http://www.gomezconganas.mx/wp-content/uploads/'+year+'/'+mes+'/'+vnombreImg+'.jpg';

				if(vnombreImg == 'undefined' || vnombreImg == null || vnombreImg == '') {
					rutaImg = 'http://www.gomezconganas.mx/wp-content/uploads/2015/09/san-antonio01-2000x1500.jpg';
				}

				li = '<li class="gcg"><article><header><div class="gcg-coverimg"><img src="'+rutaImg+'"></div><h2 class="gcg-list-title col-xs-12">'+titulo+'</h2></header><div class="desc" style="display:none;">'+descripcion+'</div><div class="cont" style="display:none;">'+contenido+'</div><div class="rutaImg" style="display:none;">'+rutaImg+'</div></article></li>';
				$('#noticias-wrapper').append(li);
			});
			callback();
		}
	});
}

function cicloGomezConGanas(cat) {
	var aux = 1;
	asyncLoop(2, function(loop) {
		loadFeedsGomezCG(aux, cat, function(result) {
			aux = aux + 1;
            loop.next();
        })
	}, function(){
		$('.gcg').last().css("margin-bottom", "65px");
		$(document).on('click','.gcg',function() {
			var er = this;
			titulo = er.getElementsByClassName('gcg-list-title')[0].innerHTML;
			contenido = er.getElementsByClassName('cont')[0].innerHTML;
			descripcion = er.getElementsByClassName('desc')[0].innerHTML;
			url = er.getElementsByClassName('rutaImg')[0].innerHTML;

			mainView.router.load({
				url:'gcgcontenido.html',
				context:{
					titulo: titulo,
					contenido: contenido,
					descripcion: descripcion,
					imagen: '<img class="col-100" src="'+url+'">'
				}
			});     
		});
	});
}*/