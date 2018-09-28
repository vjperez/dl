jQuery(function() {
  var $listItemText = jQuery('li').text();
  jQuery('li').append('<i>' + $listItemText + '</i>');
});