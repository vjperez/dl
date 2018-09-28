var elUsername = document.getElementById('username');  // Get username input

function checkUsername() {                             // Declare function
  var elMsg = document.getElementById('feedback');     // Get feedback element
  if (elUsername .value.length < 2) {                         // If username too short
    elMsg.textContent = 'Username must be 2 letras or mas'; // Set msg
  } else {                                             // Otherwise
    elMsg.textContent = '';                            // Clear msg
  }
}

// When it loses focus call checkUsername()
elUsername.addEventListener('blur', checkUsername, false);