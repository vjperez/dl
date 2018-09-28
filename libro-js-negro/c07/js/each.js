// Dentro del each si esta definido this, pero dentro de otras funciones NO 


/*
$(function() {
  $('li').each(function() {
    var ids = this.id;
    $(this).append(' <span class="order">' + ids + '</span>');
  });
});
*/



$(function() {
  $('li').each(function() {
	var $theLi = jQuery(this);  
    var theId = $theLi.attr('id');
    $theLi.prepend(' <span class="order">' + theId + '</span>');
  });
});





