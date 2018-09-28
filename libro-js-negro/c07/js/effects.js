$(function() {

  $('h2').hide().slideDown(4000);
  
  var $li = $('li');
  $li.hide().each(function(v) {
    $(this).delay(1000 * v).fadeIn(1000);
  });
  
  
  $li.on('click', function() {
    $(this).fadeOut(1000);
  });
  
  
  
});