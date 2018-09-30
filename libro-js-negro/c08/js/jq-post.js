// NOTE: This example will only work if you run it on a web server (it will not work locally)
// You can try it out on the website for the book http://javascriptbook.com/code/c08/
// or run it on your own server.

$('#registerFormId').on('submit', function(e) {           // When form is submitted
  e.preventDefault();                               // Prevent it being sent
  var details = $('#registerFormId').serialize();         // Serialize form data
  $.post('http://localhost/WebDevelopmentStuff/libro-js-negro/c08/php/register.php', details, function(datos, estatus) {  // Use $.post() to send it
    console.log('el estatus es ' + estatus);
	$('#registerFormId').html(datos);                    // Where to display result
  });
});