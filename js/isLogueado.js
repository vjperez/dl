function ponScript(scriptSrc) {
  const scriptEle = document.createElement('script');
  scriptEle.src = scriptSrc; 
  scriptEle.async = false;
  document.querySelector('body').insertAdjacentElement('beforeend', scriptEle);

  scriptEle.addEventListener('load', 
    function(){ 
      console.log( scriptSrc + ' responding to load event.' );
    }
  );
}




var logueado;
function isSessionSet( sessionName ){
    console.log('logueado en isLogueado.js, before fetch: ' + logueado);

    let urlParams = new URLSearchParams('escritos/session/isSessionSet.php');
    urlParams.set("key", sessionName);
    fetch('escritos/session/isSessionSet.php' + '?' + urlParams.toString() )
    .then(
    function(respuesta){
      console.log('fetch en isLogueado.js, then 1');
      console.log(respuesta);
      return respuesta.json();
    })
    .then(
    function(dato){
      console.log('fetch en isLogueado.js, then 2: ');
      console.log(dato);

      logueado = dato.isSet;
      //why setTimeout doesn't work here ?! for ponScript
      ponScript('js/funcionesMainContenido.js');
      ponScript('js/funcionesMenu-HidableSectionsToggle.js');
      ponScript('js/funciones.js');

      ponScript('js/navButtons.js');
      ponScript('js/getMainContenido.js');
      return;
    });
}

isSessionSet( sessionName = "dueno_id")