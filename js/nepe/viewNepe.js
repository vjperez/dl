var nepeId = urlParametro('nepeId');	
jQuery.getJSON('escritos/nepe/read/getNepe.php', {nepeId:nepeId} )
.done(function(datos, estatusForDONE, xhrObjetoForDONE){   
    //alert('datos: automatically parsed to object object by getJSON : ' + datos + '\nxhrObjetoForDONE status ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE statustext ' + xhrObjetoForDONE.statusText + '\nestatusForDONE ' + estatusForDONE + '\nrevisado: ' + datos.revisado );
    jQuery.populate(datos);         
})
.fail(function(xhrObjetoForFAIL, textoEstatus, elError){
    var xhrObjetoForFAILString = JSON.stringify(  xhrObjetoForFAIL  );
    var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
    jQuery(window.location).attr('href', path); 
});

jQuery.populate = function(datos){
    //insert json data into profile look 
    let date = new Date(datos.revisado);
    let opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    jQuery('#nombreyRevisado h5').text('Revisado:  ' + date.toLocaleDateString('es-ES', opciones)); 
    jQuery('#nombreyRevisado fieldset.notHidable label').text(datos.nombre);
    


    /*
    //alert('url: ' + datos.videoUrl + '\nis Valid Video Url: ' + datos.isValidVideoUrl);
    if(datos.videoCode == 0){
        jQuery('.videoframecontainer').hide();
    }else if(datos.videoCode == 1){
        var str = datos.videoUrl;
        //alert( 'https://www.youtube.com/embed/' + str.substring(str.length - 11, str.length) );
        jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + str.substring(str.length - 11, str.length)); 		
    }else {		//  if(datos.videoCode == 2)

        //jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + '123456789');
        jQuery('#video iframe').attr('src', 'https://www.youtube.com/embed/' + '6qpudAhYhpc');  // hacker movie
    }
    */
    jQuery('.videoframecontainer').hide();

    

    //following code works when there are 8 or less images received.
    //the html is prepared for a max of 8 images
    //code removes excess html when less than 5 images are received
    //alert(datos.losFoto);
    jQuery('#fotos #nepefotos img').each(function(index){
        if(index < datos.losFoto.length){ 
            jQuery(this).attr('src', 'imagenes/nepe/subidas/' + datos.losFoto[index] + '?v=' + Math.random() );
        }else{ 
            jQuery(this).remove(); 
        }
    });




    //alert(datos.socialArray);
    if(datos.socialArray[0])   jQuery('#quien h5.phone').text(datos.socialArray[0]);
    if(datos.socialArray[1])   jQuery('#quien h5.envelope').text(datos.socialArray[1]);    
    if(datos.socialArray[2])   jQuery('#quien h5.redSoc1').text(datos.socialArray[2]);
    if(datos.socialArray[3])   jQuery('#quien h5.redSoc2').text(datos.socialArray[3]);
        
    



    //alert(datos.cuando);
    if(datos.cuando.lun  != '') jQuery('#cuando td.lun').text(datos.cuando.lun);			
    if(datos.cuando.mar  != '') jQuery('#cuando td.mar').text(datos.cuando.mar);
    if(datos.cuando.mie  != '') jQuery('#cuando td.mie').text(datos.cuando.mie);
    if(datos.cuando.jue  != '') jQuery('#cuando td.jue').text(datos.cuando.jue);
    if(datos.cuando.vie  != '') jQuery('#cuando td.vie').text(datos.cuando.vie);
    if(datos.cuando.sab  != '') jQuery('#cuando td.sab').text(datos.cuando.sab);
    if(datos.cuando.dom  != '') jQuery('#cuando td.dom').text(datos.cuando.dom);
    
    
    
    
    //following code works when there are 10 or less 'que'  are received.
    //the html is prepared for a max of 10 'que' 
    //this code removes excess html when less than 10 'que' are received
    //alert(datos.losQue);
	let losQue = JSON.parse( datos.losQue );
	if(losQue === null) losQue = ['no info'];
    jQuery('#que li a').each(function(index){
        if(index < losQue.length) {
            jQuery(this).attr('href', window.location.pathname + '?look=opciones&que=' + encodeURIComponent(losQue[index]) + '&donde=' + encodeURIComponent('')  ).text(losQue[index]);
        }else{ jQuery(this).remove(); }
    });
    
    
    //following code works when there are 5 or less 'donde' are received.
    //the html is prepared for a max of 5 'donde'
    //this code removes excess html when less than 5 'donde' are received
    //alert(datos.losDonde);
	let losDonde = JSON.parse( datos.losDonde );
	if(losDonde === null) losDonde = ['no info'];
    jQuery('#donde li a').each(function(index){
        if(index < losDonde.length) {
            jQuery(this).attr('href', window.location.pathname + '?look=opciones&que=' + encodeURIComponent('') + '&donde=' + encodeURIComponent(losDonde[index])  ).text(losDonde[index]);
        }else{ jQuery(this).remove(); }
    });
	
    //alert('a tu casa: ' + datos.suCasa + '\ntipo: ' + typeof datos.suCasa);
    let clase = 'no'; 
	if(datos.suCasa.indexOf('si') === 0) clase = 'si';
    jQuery('span#sucasa span#background').attr('class', clase);
    //jQuery('span#sucasa span#background').after.remove();
	let texto = clase;
	if(datos.suCasa.indexOf('na') === 0) texto = clase + " aplica";
    jQuery('span#sucasa span.texto').text(texto);
	
    clase = 'no'; 
	if(datos.desdeCasa.indexOf('si') === 0) clase = 'si';
    jQuery('span#desdecasa span#background').attr('class', clase);
    //jQuery('span#desdecasa span#background').after.remove();
	texto = clase;
	if(datos.desdeCasa.indexOf('na') === 0) texto = clase + " aplica";
    jQuery('span#desdecasa span.texto').text(texto);	
                
}// populate



jQuery.hideThemSections();

//show only 1 social handle with class current
var $icon = jQuery('div#quien ul li').click(function(evento){
    evento.preventDefault();
    jQuery('div#quien ul li i').removeClass('current');
    let $iToFocus = jQuery(evento.currentTarget).find('i');
    $iToFocus.addClass('current');

    let iclass = $iToFocus.attr('class'); 
    // grab this i class name, used to select h5 with same class

    jQuery('div#quien h5').removeClass('current');
    jQuery('div#quien h5').each(function(){
        if( iclass.includes( jQuery(this).attr('class') ) ){
            jQuery(this).addClass('current');
        }
    });
});