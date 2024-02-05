jQuery.appendDebugErrors = function( xhrObjetoForFAILString, textoEstatus, elError ){
    losLis = '<br><hr>';
        
    losLis += '<li><span class="color01enfasis">El error:<br></span>' + elError + '</b><br><br></li>';		
    losLis += '<li><span class="color01enfasis">Texto Estatus:<br></span>' + textoEstatus + '<br><br></li>';
    losLis += '<li><span class="color01enfasis">xhr Objecto Stringificado:<br></span>'      + xhrObjetoForFAILString + '</li>';
        
    losLis += '<br><hr>';
    jQuery('#containerForErrors').append(losLis);
}