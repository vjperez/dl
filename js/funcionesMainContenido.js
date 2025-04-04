console.log('funcionesMainContenido.js   [loading...]');


function isReady( fun ){
  console.log('isReady() trying to run fun()');
  if (document.readyState !== 'loading'){
    //interactive and complete are the other states
    fun();
    return;
  }else{
    document.addEventListener('DOMContentLoaded', fun);
    //load is another state
  }
}


//extracs parameters from the url
function urlParametro(name){
  const str = window.location.href;
  const patron = new RegExp('[?&]' + name + '=([^&#]*)');
  const results = patron.exec(str); //searches str for a pattern described in patron
  //results is an array, contains NULL when name=" " is not found on str.
  //otherwise results[0] contains name=" ", a match with the entire reg exp
  //          results[1] contains a match with the group defined between () after the = sign on the regExp.  Search for 'javascript regex groups'
  if (results === null) return null;
  else return results[1];
  //return results[1] || 0;
}


function lookYelScript(pageName, scriptPath){
  fetch(pageName)
  .then(
  function(respuesta){
    return respuesta.text();
  })
  .then(
  function(newMainText){
    //console.log(newMainText);
    //option 1
    //document.querySelector('#containerForMain').innerHTML = newMainText;
    //option 2
    const parentDiv = document.createElement('div');
    parentDiv.innerHTML = newMainText;
    //firstElementChild will be, the newMainText, but as an HTML element
    document.querySelector('#main').replaceWith( parentDiv.firstElementChild );
  })
  .then(
  function(){
    ponScript(scriptPath)

    document.querySelector('#footer').style.visibility = 'visible'; 
    document.querySelector('#containerForMain').style.visibility = 'visible';
    console.log('footer and containerForMain divs visible.');
  });
}


const DEBUGUEO = true;
function encodeAndGetErrorPath( msg ){
	if(DEBUGUEO){
		const msgEncoded = encodeURIComponent( msg );
		return window.location.pathname + '?look=' + 'error'  + '&msgEncoded=' + msgEncoded;
	}else{
		return window.location.pathname + '?look=' + 'error';
	}	
}