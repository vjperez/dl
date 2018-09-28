var firstItem = document.getElementById('one'); // Get the first item
firstItem.className = 'complete';               // Change its class attribute

var fourthItem = document.getElementsByTagName('li').item(3);// Get fourth item
fourthItem.setAttribute('class', 'cool');       // Add an attribute to it

document.getElementById('scriptResults').innerHTML = '<p>el elemento uno se seteo usando una propiedad, el cuarto usando un metodo</p>';