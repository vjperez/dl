fetch('escritos/nepe/read/getRecentNepes.php')
.then(
function(respuesta){
  console.log('view nepe fetch, then 1');
  console.log(respuesta);
  return respuesta.text();
})
.then(
function(datos){
  console.log('view nepe fetch, then 2: ');
  console.log(datos);
  /////////////////////////try catch////////////////////////
  let datosJSOBJArr;
  try{
    datosJSOBJArr = JSON.parse( datos );
  }
  catch( err ){
    throw new Error( err + '<br><br>' + datos ); 
  }
  ///////////////////////////////////////////////
	let tableRows = '';
	datosJSOBJArr.forEach(
	function(dato, index){
		//console.log(index + '::' + dato.nepeFotoName);
		let link = '"portada.html?look=viewNepe&nepeId=' + dato.nepeId  + '"';
		tableRows += '<tr class="texto"><td>' 
		+ '<a href=' + link + '>' 
		+ dato.nepeNombre + '</a>   <span class="diasOld">['  +   dato.dias  +  ' dia'  + 
		( (dato.dias == 1)? '' : 's' )  +  ']</span>'
		+ '</td></tr>'; 

		tableRows +=  '<tr class="foto"><td>' 
    + '<a href=' + link + '>' 
		+ '<img src="imagenes/nepe/subidas/' + dato.nepeFotoName + '">'
		+ '</a>' 
		+ '</td></tr>'; 
		tableRows += '<tr><td></td></tr><tr><td></td></tr>';
	});
	document.querySelector('section#labelAndTableContainer table.subArea').innerHTML = tableRows;
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});