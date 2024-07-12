const nepeId = urlParametro('nepeId');

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
  populate(dato); 
})
.catch(
function(error){
  const href = encodeAndGetErrorPath(error);
  window.location.href = href;
});


function populate(elNepe){
    //insert json data into profile look 
    let date = new Date(elNepe.revisado);
    let opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.querySelector('#nombreyRevisado h5').innerText = 'Revisado:  ' + date.toLocaleDateString('es-ES', opciones); 
    document.querySelector('#nombreyRevisado section label.cabe').innerText = elNepe.nombre;
    


    /*
    //alert('url: ' + elNepe.videoUrl + '\nis Valid Video Url: ' + elNepe.isValidVideoUrl);
    if(elNepe.videoCode == 0){
        jQuery('.videoframecontainer').hide();
    }else if(elNepe.videoCode == 1){
        var str = elNepe.videoUrl;
        //alert( 'https://www.youtube.com/embed/' + str.substring(str.length - 11, str.length) );
        jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + str.substring(str.length - 11, str.length)); 		
    }else {		//  if(elNepe.videoCode == 2)

        //jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + '123456789');
        jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + '6qpudAhYhpc');  // hacker movie
    }
    */
    document.querySelector('.videoframecontainer').style.display = 'none';

    

    //following code works when there are 8 or less images received.
    //the html is prepared for a max of 8 images
    //code removes excess html when less than 8 images are received
    //alert(elNepe.losFoto);
    document.querySelectorAll('#fotos #nepefotos img')
    .forEach(
    function(imagen, index){
        if(index < elNepe.losFoto.length){ 
            imagen.src ='imagenes/nepe/subidas/' + elNepe.losFoto[index];
        }else{ 
            imagen.remove(); 
        }
    });




    //alert(elNepe.socialArray);
    if(elNepe.socialArray[0])   document.querySelector('#quien h5.phone').innerText = elNepe.socialArray[0];
    if(elNepe.socialArray[1])   document.querySelector('#quien h5.envelope').innerText = elNepe.socialArray[1];    
    if(elNepe.socialArray[2])   document.querySelector('#quien h5.redSoc1').innerText = elNepe.socialArray[2];
    if(elNepe.socialArray[3])   document.querySelector('#quien h5.redSoc2').innerText = elNepe.socialArray[3];
        
    



    //alert(elNepe.cuando);
    if(elNepe.cuando.lun  != '') document.querySelector('#cuando td.lun').innerText = elNepe.cuando.lun;			
    if(elNepe.cuando.mar  != '') document.querySelector('#cuando td.mar').innerText = elNepe.cuando.mar;
    if(elNepe.cuando.mie  != '') document.querySelector('#cuando td.mie').innerText = elNepe.cuando.mie;
    if(elNepe.cuando.jue  != '') document.querySelector('#cuando td.jue').innerText = elNepe.cuando.jue;
    if(elNepe.cuando.vie  != '') document.querySelector('#cuando td.vie').innerText = elNepe.cuando.vie;
    if(elNepe.cuando.sab  != '') document.querySelector('#cuando td.sab').innerText = elNepe.cuando.sab;
    if(elNepe.cuando.dom  != '') document.querySelector('#cuando td.dom').innerText = elNepe.cuando.dom;
    
    
    
    
    //following code works when there are 10 or less 'que'  are received.
    //the html is prepared for a max of 10 'que' 
    //this code removes excess html when less than 10 'que' are received
    //alert(elNepe.losQue);
	let losQue = JSON.parse( elNepe.losQue );
	if(losQue === null) losQue = ['no info'];
    document.querySelectorAll('#que li a')
    .forEach(
    function(link, index){
        if(index < losQue.length) {
            link.href = window.location.pathname + '?look=opciones&que=' + encodeURIComponent(losQue[index]) + '&donde=' + encodeURIComponent('');
            link.innerText = losQue[index];
        }else{ link.remove(); }
    });
    
    
    //following code works when there are 5 or less 'donde' are received.
    //the html is prepared for a max of 5 'donde'
    //this code removes excess html when less than 5 'donde' are received
    //alert(elNepe.losDonde);
	let losDonde = JSON.parse( elNepe.losDonde );
	if(losDonde === null) losDonde = ['no info'];
    document.querySelectorAll('#donde li a')
    .forEach(
    function(link, index){
        if(index < losDonde.length) {
            link.href = window.location.pathname + '?look=opciones&que=' + encodeURIComponent('') + '&donde=' + encodeURIComponent(losDonde[index]);
            link.innerText = losDonde[index];
        }else{ link.remove(); }
    });
	
    //alert('a tu casa: ' + elNepe.suCasa + '\ntipo: ' + typeof elNepe.suCasa);
    let clase = 'no'; 
	if(elNepe.suCasa.indexOf('si') === 0) clase = 'si';
    document.querySelector('span#sucasa span#background').classList.add(clase);
    //jQuery('span#sucasa span#background').after.remove();
	let texto = clase;
	if(elNepe.suCasa.indexOf('na') === 0) texto = clase + " aplica";
    document.querySelector('span#sucasa span.texto').innerText = texto;
	
    clase = 'no'; 
	if(elNepe.desdeCasa.indexOf('si') === 0) clase = 'si';
    document.querySelector('span#desdecasa span#background').classList.add(clase);
    //jQuery('span#desdecasa span#background').after.remove();
	texto = clase;
	if(elNepe.desdeCasa.indexOf('na') === 0) texto = clase + " aplica";
    document.querySelector('span#desdecasa span.texto').innerText = texto;	
                
}// populate


hideThemSections();


//show only 1 social handle with class current
document.querySelectorAll('div#quien ul li i')
.forEach(
function(iEl, index){
    iEl.addEventListener('click', clicked);
});

function clicked(evento){
    evento.preventDefault();
    let iclassList; 
    let iToFocus = evento.currentTarget;

    document.querySelectorAll('div#quien ul li i')
    .forEach(
    function(iEl, index){
        iEl.classList.remove('current');
        if(iEl === iToFocus){
            iclassList = iToFocus.classList; // grab this i class list, used to select h5 with 'same' class
            iToFocus.classList.add('current');
        }
    });
    
    document.querySelectorAll('div#quien h5')
    .forEach(
    function(h, index){
        h.classList.remove('current');
        if( iclassList.value.includes( h.classList.item(0) ) ){
            h.classList.add('current');
        }
    });
}