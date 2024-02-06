jQuery.appendDebugErrors = function( xhrObjetoForFAILString, textoEstatus, elError ){
    losLis = '<br><hr>';
        
    losLis += '<li><span class="color01enfasis">El error:<br></span>' + elError + '<br><br></li>';		
    losLis += '<li><span class="color01enfasis">Texto Estatus:<br></span>' + textoEstatus + '</b><br><br></li>';
    losLis += '<li><span class="color01enfasis">xhr Objecto Stringificado o Texto devuelto:<br></span>'      + xhrObjetoForFAILString + '</li>';
        
    losLis += '<br><hr>';
    jQuery('#containerForErrors').append(losLis);
}