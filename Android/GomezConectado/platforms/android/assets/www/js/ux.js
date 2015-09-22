$(document).ready(function () {  

       $(document).on('click',".servicio", function(){
         
          $('.cirlce-btn').css('background','#bebebe');
          $('.nombreReporte').css('color','#939393');
          $('.nombreReporte').css('font-weight','normal');
           var report = this.getElementsByClassName('cirlce-btn')[0];
           
           $(report).css('background','#31ba6b');
           var span = this.getElementsByTagName('span')[0];
           
           $(span).css('color','#31ba6b');
           $(span).css('font-weight','700');
           
           $('#problemas-box').transition({scale:0.95},100,function(){
               $('.btn-next').remove();
               $('.page-content').append('<div class="btn-next pulse animated row"> <div class="col-100"> <div class="row"> <a class="col-40 btnCancelar back" href="reportar.html">Regresar</a> <a class="col-60 btnNext" href="location.html">Siguiente</a> </div></div></div>');
           });
           $(document).on('click','.btnCancelar', function(){
                $('.btn-next').remove();
           });
           
           var spanEl = this.getElementsByTagName('numero-servicio')[0];
           servicio = spanEl.innerHTML;
       
        });
    
});