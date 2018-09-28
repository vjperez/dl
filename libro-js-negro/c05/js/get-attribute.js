var firstItem = document.getElementsByTagName('li')[2]; // Get first list item 
var attr;
var el = document.getElementById('scriptResults');
if (firstItem.hasAttribute('class')) {          // If it has class attribute
  attr = firstItem.getAttribute('class');   // Get the attribute

  // Add the value of the attribute after the list
  el.innerHTML = '<p>El tercer item has a class name: ' + attr + '</p>';
}


var lastItem = document.getElementsByTagName('li')[3]; // Get last list item 
attr = lastItem.getAttribute('class');   // Get the attribute

  // Add the value of the attribute after the list
el.innerHTML += '<p>El cuarto item has a class name: ' + attr + '</p>';