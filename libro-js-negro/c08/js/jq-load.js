// NOTE: This example will not work locally in all browsers.
// In Chrome, if you try this locally, you may get an error along the lines of:
//       Origin 'null' is therefore not allowed access.
// You can try it out on the website for the book http://javascriptbook.com/code/c08/
// or run it on your own server.





// this y event.currentTarget es lo mismo - el elemento al que le pusiste el event listener
// event.target es el elemento especifico que triggers the event

// ver http://api.jquery.com/load/

$('nav a').on('click', function(e) {                 // User clicks nav link
    e.preventDefault();                                // Stop loading new link
    var url = this.href;                               // Get value of href

    $('nav a.current').removeClass('current');         // Clear current indicator
    $(this).addClass('current');                       // New current indicator

    $('#container').remove();                          // Remove old content
    $('#content').load(url + ' #container').hide().fadeIn(500); // New content
  }
);