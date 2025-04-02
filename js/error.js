const nepeId = -2147483648;

let urlParams = new URLSearchParams('escritos/nepe/read/getNepe.php');
urlParams.set("nepeId", nepeId);
fetch('escritos/nepe/read/getNepe.php' + '?' + urlParams.toString() )
.then(
function(respuesta){
  console.log('view nepe fetch, then 1');
  console.log(respuesta);
  return respuesta.json();
})
.then(
function(dato){
  console.log('view nepe fetch, then 2: ');
  console.log(dato);
  addNepeRow(dato); 
})
.catch(
function(error){
  //error on error loop!
  //const href = encodeAndGetErrorPath(error);
  //window.location.href = href;
});

function addNepeRow(elNepe){
  let tableRow = '';
  //console.log(index + '::' + elNepe.nepeFotoName);
  let link = '"portada.html?look=viewNepe&nepeId=' + elNepe.nepeId  + '"';
  tableRow += '<tr class="texto"><td>' 
  + '<a href=' + link + '>' 
  + elNepe.nombre + '</a>   <span class="diasOld">'  +   elNepe.revisado  +  '</span>'
  + '</td></tr>'; 

  tableRow +=  '<tr class="foto"><td>' 
  + '<a href=' + link + '>' 
  + '<img src="imagenes/nepe/subidas/' + elNepe.losFoto[0] + '">'
  + '</a>' 
  + '</td></tr>'; 
  tableRow += '<tr><td></td></tr><tr><td></td></tr>';
	document.querySelector('table.subArea').innerHTML = tableRow;
}

function appendDebugErrors( msg ){
    // <br />\n  changed to  <br>  
    msg = msg.replace(new RegExp('<br \/>\r?\n','g'), '<br>');
    // \n   changed to  <br>
    msg = msg.replace(new RegExp('\n','g'), '<br>');  
    // bold php messages changed to bold red  
    msg = msg.replace(/<b>/g, '<b style="color: hsl(000, 100%, 70%) ;">'); 
    msg = msg.replace(/Stack trace:/, '<br>Stack trace:'); 

    
    losLis = '<hr><br>';
    losLis += '<li>' + msg + '</li>';
    losLis += '<br><hr>';
    document.querySelector('#containerForErrors').insertAdjacentHTML('beforeend', losLis);
}


if(DEBUGUEO){
    const msg = decodeURIComponent( urlParametro('msgEncoded') );
    appendDebugErrors( msg );  
}else{
    //
}