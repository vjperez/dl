jQuery.appendDebugErrors = function( xhrObjetoForFAILTexto, textoEstatus, elError ){
    losLis = '<br><hr>';
        
    losLis += '<li><span class="color01enfasis">El error:<br></span>' + elError + '<br><br></li>';		
    losLis += '<li><span class="color01enfasis">Texto Estatus:<br></span>' + textoEstatus + '<br><br></li>';
    losLis += '<li><span class="color01enfasis">xhr Objecto Texto:<br></span>'      + xhrObjetoForFAILTexto + '</li>';
        
    losLis += '<br><hr>';
    jQuery('#containerForErrors').append(losLis);
}