$(function() {

  var date;	
  $('li').on('click', function(ek) {
    $('li span').remove();
   
    date = new Date();
    $(this).prepend('<span class="date">' + date.toString() + ' ' + ek.type + '</span>');
  });

});