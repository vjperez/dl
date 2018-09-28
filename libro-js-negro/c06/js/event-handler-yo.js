var elUsername = document.getElementById('username'); // Get username input

function checkUsername() {                            // Declare function
  var elMsg = document.getElementById('feedback');    // Get feedback element
  if (elUsername.value.length < 3) {                        // If username too short
    elMsg.textContent = 'Username tiene q ser 3 letras or mas';  // Set msg
  } else {                                            // Otherwise
    elMsg.textContent = '';                           // Clear message
  }
}


elUsername.onblur = checkUsername;  // When it loses focus call checkuserName()