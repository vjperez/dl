appendDebugErrors = function( xhrObjetoForFAILString, textoEstatus, elError ){
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
    document.querySelector('#containerForErrors').insertAdjacentHTML('beforeend', losLis);
}


if(DEBUGUEO){
    var xhrObjetoForFAILString = decodeURIComponent (urlParametro('xhrObjetoForFAILString'));
    var textoEstatus           = decodeURIComponent (urlParametro('textoEstatus'));
    var elError                = decodeURIComponent (urlParametro('elError'));

    appendDebugErrors( xhrObjetoForFAILString, textoEstatus, elError );  
}else{
    //
}