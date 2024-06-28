//menu Hidable Driver h1 buttons are hidden on width >= 768
//see div#menuicons h1.menuHidableDriver{ display:none; }
//Since there is no driver, the menu, needs to be reShown when resizing window from
//pixels going from less to more than 768px
function reShowMenu() {
  const menuTarget = document.querySelector('.menuHidableTarget');
  if (window.innerWidth >= 768 && window.getComputedStyle(menuTarget).display === 'none') {
    showMenu();
    console.log('reShowing menu...');
  }
}
window.addEventListener('resize', reShowMenu);


function cleanStr(str, patron) {
  //function will convert a string like   !@#uno!$#dos!#@   into    ___uno___dos___
  //when patron is RegExp(/[^a-z0-9ñüàáèéìíòóùú]/gi)
  //patron comes mainly from crea y update nepe, y busca

  //replace characters matching a patron with '_'
  let cleanedstr = str.replace(patron, '_');
  patron = new RegExp(/[\s]+/g); // 1 or more continuous blank spaces, global
  cleanedstr = cleanedstr.replace(patron, ' ');
  patron = new RegExp(/^\s+|\s+$/gm); // 1 or more space at begginning or end, global and multiline - a trim
  cleanedstr = cleanedstr.replace(patron, '');
  return cleanedstr;
}


function feedback(queElemento, mensaje, clase, forma) {
  const el = document.querySelector(queElemento);
  el.innerText = mensaje;
  el.classList.remove('feedbackgreen');
  el.classList.remove('feedbackwarn');
  el.classList.add(clase);
  if (forma === 'downdelayup') {
    slideDown(el, 1000);
    window.setTimeout(() => {
      slideUp(el, 1000);
    }, 4000);
    //slideToggle( el, 1000 );

    //jQuery(queElemento).slideDown(1).delay(5000).slideUp(2000);
  }
}


/* SLIDE UP */
function slideUp(el, duration = 500){
  el.style.transitionProperty = 'height, margin, padding';
  el.style.transitionDuration = duration + 'ms';
  el.style.boxSizing = 'border-box';
  el.offsetHeight;
  el.style.height = el.offsetHeight + 'px';
  el.style.overflow = 'hidden';
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;

  window.setTimeout(() => {
    el.style.display = 'none';
    el.style.removeProperty('height');
    el.style.removeProperty('padding-top');
    el.style.removeProperty('padding-bottom');
    el.style.removeProperty('margin-top');
    el.style.removeProperty('margin-bottom');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition-duration');
    el.style.removeProperty('transition-property');
    //alert("!");
  }, duration);
};


/* SLIDE DOWN */
function slideDown(el, duration = 500){
  let display = window.getComputedStyle(el).display;
  if (display === 'none') display = 'block';
  el.style.display = display;
  let height = el.offsetHeight;
  el.style.overflow = 'hidden';
  el.style.height = 0;
  //target.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  el.offsetHeight;
  el.style.boxSizing = 'border-box';
  el.style.transitionProperty = 'height, margin, padding';
  el.style.transitionDuration = duration + 'ms';
  el.style.height = height + 'px';

  window.setTimeout(() => {
    el.style.removeProperty('display');
    el.style.removeProperty('padding-top');
    el.style.removeProperty('padding-bottom');
    el.style.removeProperty('margin-top');
    el.style.removeProperty('margin-bottom');
    el.style.removeProperty('height');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition-duration');
    el.style.removeProperty('transition-property');
  }, duration);
};


/* TOOGLE */
function slideToggle(el, duration = 500){
  if (window.getComputedStyle(el).display === 'none') {
    return slideDown(el, duration);
  } else {
    return slideUp(el, duration);
  }
};


//extracs parameters from the url
urlParametro = function (name) {
  var str = window.location.href;
  var patron = new RegExp('[?&]' + name + '=([^&#]*)');
  var results = patron.exec(str); //searches str for a pattern described in patron
  //results is an array, contains NULL when name=" " is not found on str.
  //otherwise results[0] contains name=" ", a match with the entire reg exp
  //          results[1] contains a match with the group defined between () after the = sign on the regExp.  Search for 'javascript regex groups'
  if (results === null) return null;
  else return results[1];
  //return results[1] || 0;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const DEBUGUEO = true;
const MINIMUM_USER_PASS_LENGTH = 4;
const MINIMUM_USER_NAME_LENGTH = 3;
var logueado;


jQuery.areValidUserYPass = function (usertb, pass01, pass02, feedbackType, whatElement) {
  //Esta funcion la usan login y registra
  //para detectar valores invalidos q se pueden chequear con JavaScript, y evitar post innecesarios.
  // 1)lenght >= 3o4; 2)only numbers or letters  @ . _  - +   ; 3)both pass are equal;
  usertbCheck = usertb.replace(/[^a-z0-9ñüàáèéìíòóùú@._+-]/gi, ''); // g for 'dont stop at first match, find all'; i for case insensitive
  pass01Check = pass01.replace(/[^a-z0-9ñüàáèéìíòóùú@._+-]/gi, '');
  pass02Check = pass02.replace(/[^a-z0-9ñüàáèéìíòóùú@._+-]/gi, '');
  if (
    usertb.length < MINIMUM_USER_NAME_LENGTH ||
    pass01.length < MINIMUM_USER_PASS_LENGTH ||
    pass02.length < MINIMUM_USER_PASS_LENGTH
  ) {
    if (feedbackType.indexOf('fullFeedback') !== -1) {
      jQuery.feedback(
        whatElement,
        'Username o contrase\u00f1a es muy corto.',
        'feedbackwarn',
        'downdelayup'
      );
    } else {
      // if(feedbackType.indexOf('genericFeedback') !== -1){
      jQuery.feedback(whatElement, 'Trata otra vez.', 'feedbackwarn', 'downdelayup');
    }
    return false;
  } else if (
    usertbCheck.length < usertb.length ||
    pass01Check.length < pass01.length ||
    pass02Check.length < pass02.length
  ) {
    if (feedbackType.indexOf('fullFeedback') !== -1) {
      jQuery.feedback(
        whatElement,
        'Usa solo letras, numeros y @ . _ - + ',
        'feedbackwarn',
        'downdelayup'
      );
    } else {
      // if(feedbackType.indexOf('genericFeedback') !== -1){
      jQuery.feedback(whatElement, 'Trata otra vez.', 'feedbackwarn', 'downdelayup');
    }
    return false;
  } else if (pass01 !== pass02) {
    //same type, same value, no type conversion, case sensitive
    if (feedbackType.indexOf('fullFeedback') !== -1) {
      jQuery.feedback(
        whatElement,
        'Las contrase\u00f1as son diferentes.',
        'feedbackwarn',
        'downdelayup'
      );
    } else {
      // if(feedbackType.indexOf('genericFeedback') !== -1){
      jQuery.feedback(whatElement, 'Trata otra vez.', 'feedbackwarn', 'downdelayup');
    }
    return false;
  } else {
    return true;
  }
};

jQuery.cleanStrJustKeep1SpaceBetweenWords = function (str, patron) {
  //function will convert a string like   !@#uno!$#dos!#@    into   uno dos
  //when patron is RegExp(/[^a-z0-9ñüàáèéìíòóùú]/gi)
  //patron comes mainly from crea y update nepe, y busca

  //replace characters matching a patron with '%'
  str = str.replace(patron, '%'); // str will be   %%%uno%%%dos%%%

  strComponentsArray = str.split('%'); // strComponentsArray will contain   ,,uno,,dos,,
  cleanedstr = '';
  for (var i = 0; i < strComponentsArray.length; i++) {
    //alert('parte de strComponentsArray=[' + strComponentsArray[i]  + ']');
    if (strComponentsArray[i] !== '') {
      //ignore strComponent when it is empty string
      //strComponent will be '' in these situations:
      //to represent character BEFORE a delimiter on the first position
      //to represent character AFTER  a delimiter on the last  position
      //to represent character BETWEEN  back to back delimiters
      if (cleanedstr !== '') {
        cleanedstr += ' ';
      } //add blank space before adding a component, but not the first time
      cleanedstr += strComponentsArray[i];
      //build a string from non-empty strComponents, adding a space BETWEEN them
    }
  }
  return cleanedstr;
};


//returns null when typeof str is not string
//when str IS a string ... returns whether string has zero length after trimmed
jQuery.isVacioStr = function (str) {
  if (typeof str === 'string') return str.trim().length === 0;
  else return null;
};

//returns null when typeof str is not string
//when str IS a string ... returns whether string has length > zero after trimmed
jQuery.isNotVacioStr = function (str) {
  if (typeof str === 'string') return str.trim().length > 0;
  else return null;
};

//to get logged condition and include other scripts after logueado is set
jQuery.isLogueadoSessionSet = function () {
  jQuery
    .getJSON('escritos/session/isSessionSet.php', { key: 'dueno_id' })
    .done(function (respuesta, estatusForDONE, xhrObjetoForDONE) {
      //alert('funciones: \nisSessionSet(): \n' + respuesta.isSet);
      logueado = respuesta.isSet;

      jQuery.includeScript('js/funcionesMenu-HidableSectionsToggle.js');
      jQuery.includeScript('js/funcionesMainContenido.js');
      jQuery.includeScript('js/navButtons.js');
      jQuery.includeScript('js/getMainContenido.js');
    })
    .fail(function (xhrObjetoForFAIL, textoEstatus, elError) {
      var xhrObjetoForFAILString = JSON.stringify(xhrObjetoForFAIL);
      var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
      jQuery(window.location).attr('href', path);
    });
};
//////////////////////////////////////          calling function     ///////////////////////////////////
//to get logged condition and include other scripts after logueado is set
jQuery.isLogueadoSessionSet();

jQuery.isSessionSet = function (sessionName) {
  jQuery
    .getJSON('escritos/session/isSessionSet.php', { key: sessionName })
    .done(function (respuesta, estatusForDONE, xhrObjetoForDONE) {
      return respuesta.isSet;
    })
    .fail(function (xhrObjetoForFAIL, textoEstatus, elError) {
      var xhrObjetoForFAILString = JSON.stringify(xhrObjetoForFAIL);
      var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
      jQuery(window.location).attr('href', path);
    });
};

jQuery.getSessionValue = function (sessionName) {
  jQuery
    .getJSON('escritos/session/getSessionValue.php', { key: sessionName })
    .done(function (respuesta, estatusForDONE, xhrObjetoForDONE) {
      return respuesta.valorSession;
    })
    .fail(function (xhrObjetoForFAIL, textoEstatus, elError) {
      var xhrObjetoForFAILString = JSON.stringify(xhrObjetoForFAIL);
      var path = jQuery.encodeAndGetErrorPath(xhrObjetoForFAILString, textoEstatus, elError);
      jQuery(window.location).attr('href', path);
    });
};

jQuery.includeScript = function include(scriptSrc) {
  jQuery('<script src="' + scriptSrc + '" defer></script>').appendTo('body');
  console.log(scriptSrc + ' appended to body.');
};

jQuery.logout = function () {
  jQuery
    .get('escritos/dueno/logout.php')
    .done(function (datos, estatusForDONE, xhrObjetoForDONE) {
      //alert('despues de escritos logout, voy pa login!');
      jQuery(window.location).attr('href', window.location.pathname + '?look=login');
    })
    .fail(function (xhrObjetoForFAIL, textoEstatus, elError) {
      var xhrObjetoForFAILString = JSON.stringify(xhrObjetoForFAIL);
      var path = jQuery.encodeAndGetErrorPath(
        'On logout:<br>' + xhrObjetoForFAILString,
        textoEstatus,
        elError
      );
      jQuery(window.location).attr('href', path);
    });
};

jQuery.haveAtLeast1 = function (formaStr) {
  var regexp = new RegExp(/[^a-z0-9ñüàáèéìíòóùú@._+-]/gi); //	allowing letters, numbers plus los de login   @ . _ - +				escaping dot and minus
  if (
    jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red1]').val(), regexp)) &&
    jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red2]').val(), regexp)) &&
    jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red3]').val(), regexp)) &&
    jQuery.isVacioStr(jQuery.cleanStr(jQuery(formaStr + ' input[name=red4]').val(), regexp))
  ) {
    jQuery.feedback('fieldset#socialHandleFieldset h5', 'Minimo 1 contacto');
    jQuery.feedback(
      'fieldset#submitButtonFieldset h5#handlesFeedback',
      'Verifica secci\u00F3n : QUIEN'
    );
    submitVote1 = false;
  } else {
    jQuery.feedback('fieldset#socialHandleFieldset h5', '');
    jQuery.feedback('fieldset#submitButtonFieldset h5#handlesFeedback', '');
    submitVote1 = true;
  }
};
