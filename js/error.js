jQuery.appendDebugErrors = function( xhrObjetoForFAILString, textoEstatus, elError ){
    // <br />\n  changed to  <br>
    xhrObjetoForFAILString = xhrObjetoForFAILString.replace(/<br \/>\\n/g, '<br>');  
    // \n   changed to  <br>
    xhrObjetoForFAILString = xhrObjetoForFAILString.replace(/\\n/g, '<br>');  
    
    losLis = '<br><hr>';
    losLis += '        <li>xhr Objecto Stringificado o Texto devuelto:<br>' + xhrObjetoForFAILString + '</li>';
    losLis += '<br><br><li>Texto Estatus:<br>' + textoEstatus + '</li>';
    losLis += '<br><br><li>El error:<br>' + elError + '</li>';
    losLis += '<hr>';
    jQuery('#containerForErrors').append(losLis);
}


if(DEBUGUEO){
    var xhrObjetoForFAILString = decodeURIComponent (jQuery.urlParametro('xhrObjetoForFAILString'));
    var textoEstatus           = decodeURIComponent (jQuery.urlParametro('textoEstatus'));
    var elError                = decodeURIComponent (jQuery.urlParametro('elError'));

    jQuery.appendDebugErrors( xhrObjetoForFAILString, textoEstatus, elError );  
}else{
    //
}