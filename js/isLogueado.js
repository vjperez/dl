function ponScript(scriptSrc, cb) {
  const scriptEle = document.createElement('script');
  scriptEle.src = scriptSrc;
  scriptEle.addEventListener('load', 
    function(){
      if(cb) setTimeout(cb, 500);
    });
  document.querySelector('body').insertAdjacentElement('beforeend', scriptEle);
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
      ponScript('js/funciones.js', 
        ponScript('js/funcionesMainContenido.js', 
          ponScript('js/funcionesMenu-HidableSectionsToggle.js', null )
        ) 
      ) 
    })
    .then(
      function(dato){
        console.log('fetch en isLogueado.js, then 3: ');
      
        ponScript('js/navButtons.js', 
          ponScript('js/getMainContenido.js', null )
        );
      });
    /*  
    .catch(
    function(error){
      console.log('catch...');
      //captures errors from .then
      //const href = encodeAndGetErrorPath(error);
      //window.location.href = href;

      jQuery.lookYelScript('looks/error.html', 'js/error.js');
    });
    */
    
}

isSessionSet( sessionName = "dueno_id")