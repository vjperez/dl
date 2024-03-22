var nepeId = jQuery.urlParametro('nepeId');	
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
    jQuery('#nombreyRevisado h2').text(datos.nombre);
    


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

    

    //following code works when there are 5 or less images received.
    //the html is prepared for a max of 5 images
    //code removes excess html when less than 5 images are received
    //alert(datos.losFoto);
    jQuery('#fotos #nepefotos img').each(function(index){
        if(index < datos.losFoto.length){ 
            jQuery(this).attr('src', 'imagenes/nepe/subidas/' + datos.losFoto[index] + '?v=' + Math.random() );
        }else{ 
            jQuery(this).remove(); 
        }
    });




    //alert(datos.losSocial);
    if(datos.losSocial.length > 0){
        if(datos.losSocial[0].handle != '') jQuery('#quien h5.phone').text(datos.losSocial[0].handle);
        if(datos.losSocial[1].handle != '') jQuery('#quien h5.envelope').text(datos.losSocial[1].handle);    
        if(datos.losSocial[2].handle != '') jQuery('#quien h5.redSoc1').text(datos.losSocial[2].handle);
        if(datos.losSocial[3].handle != '') jQuery('#quien h5.redSoc2').text(datos.losSocial[3].handle);
    }        
    



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
	if(losQue === null) losQue = ['no que info provided'];
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
	if(losDonde === null) losDonde = ['no donde info provided'];
    jQuery('#donde li a').each(function(index){
        if(index < losDonde.length) {
            jQuery(this).attr('href', window.location.pathname + '?look=opciones&que=' + encodeURIComponent('') + '&donde=' + encodeURIComponent(losDonde[index])  ).text(losDonde[index]);
        }else{ jQuery(this).remove(); }
    });
    //alert('a tu casa: ' + datos.atucasa + '\ntipo: ' + typeof datos.atucasa);
    var clase = 'no'; if(datos.atucasa) clase = 'si';
    jQuery('#donde span#background').attr('class', clase);
    //jQuery('#donde span#background').after.remove();
    jQuery('#donde span.texto').text(clase);
                
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