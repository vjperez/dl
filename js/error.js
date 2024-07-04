appendDebugErrors = function( error ){
    // <br />\n  changed to  <br>  
    error = error.replace(new RegExp('<br \/>\r?\n','g'), '<br>');
    // \n   changed to  <br>
    error = error.replace(new RegExp('\n','g'), '<br>');  
    // bold php messages changed to bold red  
    error = error.replace(/<b>/g, '<b style="color:red;">'); 
    error = error.replace(/Stack trace:/, '<br>Stack trace:'); 

    if(isVacioStr(error)) error = 'Hubo un error.';
    
    losLis = '<br><hr>';
    losLis += '        <li>Error:<br>' + error + '</li>';
    losLis += '<hr>';
    document.querySelector('#containerForErrors').insertAdjacentHTML('beforeend', losLis);
}


if(DEBUGUEO){
    const error = decodeURIComponent (urlParametro('error'));
    appendDebugErrors( error );  
}else{
    //
}