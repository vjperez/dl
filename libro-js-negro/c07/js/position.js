 $(function() {
  var $window = $(window);
  var $slideAd = $('#slideAd');
  //var profundidad = $('#footer').offset().top - 500;  // 500px arriba del footer
  var profundidad = jQuery('#profundidadMarker').offset().top; //la profundidad a la que esta coconut (check the html marker)
  
  $window.on('scroll', function() {

    if ( $window.scrollTop() + $window.height() > profundidad ) {
		// cuando la parte de abajo de la ventana (el tope + el alto de ella misma)
		// este a una profundidad mayor que ....
      $slideAd.animate({ 'right': '0px' }, 250);
    } else {
      $slideAd.stop(true).animate({ 'right': '-360px' }, 250);
    }

  });

});