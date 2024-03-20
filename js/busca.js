jQuery('form').submit(function(evento){
    evento.preventDefault(); //not making a submit (GET request) here. Lets do it at look=opciones
    var regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@._+-]/gi);	//see 'negated or complemented character class'; basically what characters are not letters, numbers or these symbols
    var que = jQuery('#queId').val();
    que = jQuery.cleanStr(que, regexp); // clean function returns cleaned str
    var donde = jQuery('#dondeId').val();
    donde = jQuery.cleanStr(donde, regexp); // clean function returns cleaned str
    //alert('que=(' + que  + ')\ndonde=(' +  donde + ')');
    if(que.length > 0 || donde.length > 0){//i'm looking for a non empty cleaned str
        jQuery(window.location).attr('href', window.location.pathname + '?look=opciones&que=' + encodeURIComponent(que) 
        + '&donde=' + encodeURIComponent(donde)  );
    }else{
        jQuery.feedback('form#queDondeForm h3', 'Buscas algo?', 'downdelayup');
    }
});    