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
  return respuesta.text();
})
.then(
function(datos){
  console.log('opciones fetch, then 2: ');
  console.log(datos);
  /////////////////////////try catch////////////////////////
  let datosJSOBJ;
  try{
    datosJSOBJ = JSON.parse( datos );
  }
  catch( err ){
    throw new Error( err + '<br><br>' + datos ); 
  }
  //////////////////////////////////////////////////////////
  if(datosJSOBJ.length > 0){
	//alert('datos: automatically parsed to object object por getJSON = ' + datos + '\nxhrObjetoForDONE.status = ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE.statustext = ' + xhrObjetoForDONE.statusText + '\nestatusForDONE = ' + estatusForDONE );
	let htmlForMain = '';
	datosJSOBJ.forEach(
	function(item, index){
		//alert( datos[index].nepeId );
		htmlForMain += '<section>'
					+  '<label class="cabe">'  + item.queDondeTag  + '</label>'
					+  '<label class="explica">[' + item.ranqueoDeNepe + ']</label>'
					+ '</section>';
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