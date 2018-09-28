jQuery(function() {
  jQuery('li:contains("pine")').text('almonds');
  jQuery('li.hot').html(function() {
    return '<b>' + $(this).text() + '</b>';
  });
  
  jQuery('li#two').remove();
});