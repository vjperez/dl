document.write('You cannot loop a live Nodelist with a regular loop ya que la lista se reduce en '); 
document.write('length (con cada iteracion es una lista reducida que empieza en lugares diferentes). ');
document.write(' <br>Si dejas el .length de la lista como condicion en el loop, no habra out of bounds, ');
document.write(' pero tendras un resultado loco tambien, basicamente por lo mismo, '); 
document.write(' por que la lista se reduce y empieza en sitios diferentes.');
var hotItems = document.getElementsByClassName('hot'); // Store NodeList in array
var numEle = hotItems.length;
if (numEle > 0) {                          // no hace falta

  for (var i = 0; i < numEle; i++) {       // Loop through each item
    hotItems[i].className = 'cool';         // Change value of class attribute
  }

}