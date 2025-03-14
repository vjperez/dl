jQuery.haveAtLeast1 = function (formaStr) {
  var regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@._+-]/gi); //	allowing letters, numbers plus los de login   @ . _ - +				escaping dot and minus
  if (
    isVacioStr(cleanStr( document.querySelector(formaStr + ' input[name=red1]').value, regexp )) &&
    isVacioStr(cleanStr( document.querySelector(formaStr + ' input[name=red2]').value, regexp )) &&
    isVacioStr(cleanStr( document.querySelector(formaStr + ' input[name=red3]').value, regexp )) &&
    isVacioStr(cleanStr( document.querySelector(formaStr + ' input[name=red4]').value, regexp ))
  ) {
    feedback('fieldset#socialHandleFieldset h5', 'Minimo 1 contacto');
    feedback('fieldset#submitButtonFieldset h5#handlesFeedback', 'Verifica secci\u00F3n : QUIEN');
    submitVote1 = false;
  } else {
    feedback('fieldset#socialHandleFieldset h5', '');
    feedback('fieldset#submitButtonFieldset h5#handlesFeedback', '');
    submitVote1 = true;
  }
};