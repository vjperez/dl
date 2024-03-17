jQuery.appendDebugErrors = function( xhrObjetoForFAILString, textoEstatus, elError ){
    // <br />\n  changed to  <br>  
    xhrObjetoForFAILString = xhrObjetoForFAILString.replace(new RegExp('<br \/>\r?\n','g'), '<br>');
    // \n   changed to  <br>
    xhrObjetoForFAILString = xhrObjetoForFAILString.replace(new RegExp('\n','g'), '<br>');  
    // bold php messages changed to bold red  
    xhrObjetoForFAILString = xhrObjetoForFAILString.replace(/<b>/g, '<b style="color:red;">'); 
    xhrObjetoForFAILString = xhrObjetoForFAILString.replace(/Stack trace:/, '<br>Stack trace:'); 

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