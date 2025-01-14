function appendDebugErrors( msg ){
    // <br />\n  changed to  <br>  
    msg = msg.replace(new RegExp('<br \/>\r?\n','g'), '<br>');
    // \n   changed to  <br>
    msg = msg.replace(new RegExp('\n','g'), '<br>');  
    // bold php messages changed to bold red  
    msg = msg.replace(/<b>/g, '<b style="color: hsl(000, 100%, 70%) ;">'); 
    msg = msg.replace(/Stack trace:/, '<br>Stack trace:'); 

    
    losLis = '<br><hr>';
    losLis += '<li>Error:<br>' + msg + '</li>';
    losLis += '<hr>';
    document.querySelector('#containerForErrors').insertAdjacentHTML('beforeend', losLis);
}


if(DEBUGUEO){
    const msg = decodeURIComponent( urlParametro('msgEncoded') );
    appendDebugErrors( msg );  
}else{
    //
}