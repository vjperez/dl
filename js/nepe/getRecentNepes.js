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
  
  /////////////////////////try-catch/////////////
  let datosJSOBJArr;
  try{
    datosJSOBJArr = JSON.parse( datos );
  }
  catch( err ){
    throw new Error( err + '<br><br>::php<br>' + datos ); 
  }
  ///////////////////////////////////////////////

  addNepes( datosJSOBJArr );
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});


function addNepes(losNepes){
	let tableRows = '';
	losNepes.forEach(
	function(nepe, index){
		//console.log(index + '::' + nepe.nepeFotoName);
		let link = '"portada.html?look=viewNepe&nepeId=' + nepe.nepeId  + '"';
		tableRows += '<tr class="texto"><td>' 
		+ '<a href=' + link + '>' 
		+ nepe.nepeNombre + '</a>   <span class="diasOld">['  +   nepe.dias  +  ' dia'  + 
		( (nepe.dias == 1)? '' : 's' )  +  ']</span>'
		+ '</td></tr>'; 

		tableRows +=  '<tr class="foto"><td>' 
    + '<a href=' + link + '>' 
		+ '<img src="imagenes/nepe/subidas/' + nepe.nepeFotoName + '">'
		+ '</a>' 
		+ '</td></tr>'; 
		tableRows += '<tr><td></td></tr><tr><td></td></tr>';
	});
	document.querySelector('section#labelAndTableContainer table.subArea').innerHTML = tableRows;
}