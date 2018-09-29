// NOTE: This example will not work locally in all browsers.
// In Chrome, if you try this locally, you may get an error along the lines of:
//       Origin 'null' is therefore not allowed access.
// You can try it out on the website for the book http://javascriptbook.com/code/c08/
// or run it on your own server.




// this is important only in event delegation, which is not happening here
// this y event.currentTarget es lo mismo - el elemento al que le pusiste el event listener 
// 		:"the element in front of the dot"
// event.target es el elemento especifico que hace trigger al event

// ver http://api.jquery.com/load/
// Loading Page Fragments
//The .load() method, unlike $.get(), allows us to specify a portion of the remote document to be inserted. 
//This is achieved with a special syntax for the url parameter. If one or more space characters are 
//included in the string, the portion of the string following the first space is assumed to be a 
//jQuery selector that determines the content to be loaded. 

//Script Execution
//When calling .load() using a URL without a suffixed selector expression, the content is passed to .html()
// prior to scripts being removed. This executes the script blocks before they are discarded. If .load() is
// called with a selector expression appended to the URL, however, the scripts are stripped out prior to 
//the DOM being updated, and thus are not executed. An example of both cases can be seen below:
$('nav a').on('click', function(e) {                 // User clicks nav link
    e.preventDefault();                                // Stop loading new link
    var url = e.target.href;                               // Get value of href

    $('nav a.current').removeClass('current');         // Clear current indicator
    $(e.target).addClass('current');                       // New current indicator

    $('#container').remove();                          // Remove elemento with id = #container
    $('#content').load(url + ' #container', function(data){
												console.log(data);
											} 
					).hide().fadeIn(500); // // load INTO #content el url, pero solo el elemento con id = #container (space before # is necessary)
  }
);