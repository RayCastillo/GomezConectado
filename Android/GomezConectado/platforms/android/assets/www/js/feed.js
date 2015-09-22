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

function loadFeeds(){  
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
                            url = entry.mediaGroups[0].contents[0].url;                            
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
        var position=0;
        var resto= ' '+contenido;
        
        
         for(var i=0; i<20 ; i++){
             if(position == -1){
                 break;
             }
             resto = resto.slice(position +1, resto.length);
             position = resto.indexOf(".");
             var text = resto.slice(0, position+1);         
             salida = salida + '<p>' + text + '</p>';
         }
        
     
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