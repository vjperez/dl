var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow > 18) {
    greeting = 'Buenas noches!';
} else if (hourNow > 12) {
    greeting = 'Buenas taaaardes!';
} else if (hourNow > 0) {
    greeting = 'Que tenga buen dia!';
} else {
    greeting = 'Welcome!';
}

document.write('<h3>' + greeting + '</h3>');
document.write('el Date string:: ' + today.toDateString() + '<br>');
document.write('el Time string:: ' + today.toTimeString() + '<br>');
document.write('el string:: ' + today.toString() + '<br>');