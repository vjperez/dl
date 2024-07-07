let que   = decodeURIComponent( urlParametro('que') );      
let donde = decodeURIComponent( urlParametro('donde') ); 
//alert('[' + que + '][' + donde + ']');

let urlParams = new URLSearchParams('escritos/nepe/read/getOpciones.php');
urlParams.set("que", que);   urlParams.set("donde", donde);
fetch('escritos/nepe/read/getOpciones.php' + '?' + urlParams.toString() )
.then(
function(respuesta){
  console.log('opciones fetch, then 1');
  console.log(respuesta);
  return respuesta.json();
})
.then(
function(datos){
  console.log('opciones fetch, then 2: ');
  console.log(datos);
  if(datos.length > 0){
	//alert('datos: automatically parsed to object object por getJSON = ' + datos + '\nxhrObjetoForDONE.status = ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE.statustext = ' + xhrObjetoForDONE.statusText + '\nestatusForDONE = ' + estatusForDONE );
	let htmlForMain = '';
	datos.forEach(
	function(item, index){
		//alert( datos[index].nepeId );
		htmlForMain += '<fieldset class="notHidable"><label>'  + item.queDondeTag  + '</label></fieldset>' + '<h5>[' + item.ranqueoDeNepe + ']</h5>';
		//htmlForMain += '<fieldset class="notHidable"><label>'  + queDondeTag  + '</label></fieldset>';
		
		htmlForMain += '<div id="nepefotos">';
		htmlForMain += '<a href="portada.html?look=viewNepe&nepeId=' + item.nepeId + '">';
		htmlForMain += '<img class="" src="imagenes/nepe/subidas/' + item.fotoUrl + '">'; 
		htmlForMain += '</a>';
		htmlForMain += '</div>';
	}); // each in datos
	document.querySelector('#main').innerHTML = htmlForMain;
  }else{
	window.location.href = window.location.pathname + '?look=nada';  
  }
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});