var elUsername = document.getElementById('username');// Get username input


function checkLength(e, minLength) {         // Declare function
  var el, elMsg;                             // Declare variables
  if (!e) {                                  // If event object doesn't exist
    e = window.event;                        // Use IE fallback
  }
  el = e.target || e.srcElement;             // Get target of event
  elMsg = el.nextSibling;                    // Get its next sibling

  if (el.value.length < minLength) {         // If length is too short set msg
    elMsg.innerHTML = 'Username must be ' + minLength + ' letras o mas';
  } else {                                   // Otherwise
    elMsg.innerHTML = '';                    // Clear message
  }
}


if (elUsername.addEventListener) {           // If event listener supported
  elUsername.addEventListener('blur', function(e) {  // On blur event
    // NOTE: This function is checkLength() - not checkUsername()
    checkLength(e, 2);                             // Call checkLength()
  }, false);                                       // Capture in bubble phase
} else {                                           // Otherwise
  elUsername.attachEvent('onblur', function(e) {   // IE fallback onblur
    // NOTE: This function is checkLength() - not checkUsername()
    checkLength(e, 2);                             // Call checkLength()
  });
}