$(function() {
  $('ul').before('<p class="notice">Just updated</p>');
  $('li.hot').prepend('krystal ');
  var $newListItem = jQuery('<li><em>gluten-free</em> soy victor</li>');
  $('li:last').before($newListItem);
});