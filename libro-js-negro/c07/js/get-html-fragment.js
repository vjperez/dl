$(function() {
  var $listHTML = $('ul').html();
  $('ul').append('<li class="cool"></li>' + $listHTML);
});