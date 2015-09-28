// Initialize your app
var myApp = new Framework7({
    template7Pages: true,
    pushState: false,
    cache: false,
    uniqueHistory: true,
    imagesLazyLoadThreshold:50,
    imagesLazyLoadSequential:false,
    imagesLazyLoadPlaceholder:"img/lazyload.png"
});

// Export selectors engine
var $$ = Framework7.$;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false,
    template7Pages: true
});


// Event listener to run specific code for specific pages
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
   
    if (page.name === 'index') {
       loadTweets();
    }
   
    if (page.name === 'noticias') {
        loadFeeds();
      
    }
    if (page.name === 'tipo-serv') {
       loadtipoServ();
      
    }
     if (page.name === 'location') {
          initMap();
      
    }
   
    if (page.name === 'enviar') {
        alistarEnvio();
    }if (page.name === 'success') {
        mainView.loadPage('index.html');
    }
    if (page.name === 'gps-notify') {
       loadGPS();
    }
    if (page.name === 'consulta') {
      
        var pag=page.fromPage;
        
       if(pag.name = "success"){
          
           prepararConsulta();           

           
       }
    }
     if (page.name === 'obraspub') {
        titulo = "Conoce más sobre Obras Públicas";
            link = "http://www.gomezconganas.mx/?page_id=345";
    }
     if (page.name === 'alumbrado') {
        titulo = "Gómez Palacio: Obras - Alumbrado Público";
            link = "http://www.gomezconganas.mx/?page_id=337";
    }
     if (page.name === 'bacheo') {
         titulo = "Gómez Palacio: Obras - Bacheo";
            link = "http://www.gomezconganas.mx/?page_id=342";
         imagefb= "https://s3.amazonaws.com/gmz/img/covers-bacheo.jpg";
    }
     if (page.name === 'cerropila') {
        titulo = "Gómez Palacio: Obras - Cerro de la Pila";
            link = "http://www.gomezconganas.mx/?page_id=331";
      
    }
     if (page.name === 'corredor') {
         titulo = "Gómez Palacio: Obras - Corredor del Periférico";
            link = "http://www.gomezconganas.mx/?page_id=314";
    }
      if (page.name === 'guadalupev') {
         titulo = "Gómez Palacio: Obras - Deportiva Guadalupe Victoria";
            link = "http://www.gomezconganas.mx/?page_id=327";
    }
      if (page.name === 'esmeralda') {
         titulo = "Gómez Palacio: Obras - Deportiva la Esmeralda";
            link = "http://www.gomezconganas.mx/?page_id=322";
    }
      if (page.name === 'gcgpage') {
         titulo = "Gómez Palacio: Programas - Becas";
            link = "http://www.gomezconganas.mx/?page_id=616";
    }
      if (page.name === 'escuela') {
         titulo = "Gómez Palacio: Programas - Escuela Con Ganas";
            link = "http://www.gomezconganas.mx/?page_id=619";
    }
      if (page.name === 'gconganas') {
         titulo = "Gómez Palacio: Programas - Gómez Con Ganas";
            link = "http://www.gomezconganas.mx/?page_id=620";
    }
      if (page.name === 'espacio') {
         titulo = "Gómez Palacio: Programas - Mi Espacio con Ganas";
            link = "http://www.gomezconganas.mx/?page_id=618";
    }
      if (page.name === 'c-comuni') {
         titulo = "Gómez Palacio: Programas - Centros Comunitarios";
            link = "http://www.gomezconganas.mx/?page_id=617";
    }
      if (page.name === 'mercadito') {
         titulo = "Gómez Palacio: Programas - Mercadito Subsidiado";
            link = "http://www.gomezconganas.mx/?page_id=621";
    }
      if (page.name === 'feriaempleo') {
         titulo = "Gómez Palacio: Programas - Feria del Empleo";
            link = "http://www.gomezconganas.mx/?page_id=622";
    }
    
                });
$$(document).on('pageAfterAnimation', function (e) {
    var page = e.detail.page;
   
                if (page.name === 'success') {
                animarFolio();
                }

});




