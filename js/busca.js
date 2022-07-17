jQuery('#footer').css('visibility','visible');

//jQuery.handleSubmit = function(){

jQuery('form').submit(function(evento){
    evento.preventDefault(); //not making a submit (GET request) here. Lets do it at look=opciones
    var regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú+]/gi);	//see 'negated or complemented character class'
    var que = jQuery('#queId').val();
    que = jQuery.cleanStr(que, regexp); // clean function returns cleaned str,  adds ' ' as delimiter
    var donde = jQuery('#dondeId').val();
    donde = jQuery.cleanStr(donde, regexp); // clean function returns cleaned str, adds  ' ' as delimiter
    //alert('que=(' + que  + ')\ndonde=(' +  donde + ')');
    if(que.length > 0 || donde.length > 0){//i'm looking for a non empty cleaned str
        jQuery(window.location).attr('href', window.location.pathname + '?look=opciones&que=' + encodeURIComponent(que) 
        + '&donde=' + encodeURIComponent(donde)  );
    }else{
        jQuery.feedback('form#queDondeForm h3', 'Buscas algo?', 'downdelayup');
    }
});

//}       