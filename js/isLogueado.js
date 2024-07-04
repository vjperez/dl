function ponScript(scriptSrc) {
  const scriptEle = document.createElement('script');
  scriptEle.src = scriptSrc;
  /*
  scriptEle.addEventListener('load', 
    function(){
      console.log(cb);
      if(cb) setTimeout(cb(),0);
    });
  */
  
  document.querySelector('body').insertAdjacentElement('beforeend', scriptEle);
  scriptEle.addEventListener('load', 
    function(){ 
      console.log( scriptSrc + ' just loaded' );
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

      ponScript('js/funcionesMainContenido.js');
      ponScript('js/funcionesMenu-HidableSectionsToggle.js');
      ponScript('js/funciones.js');
      return;
    })
    .then(
      function(dato){
        console.log('fetch en isLogueado.js, then 3: ');
      
        ponScript('js/navButtons.js');
        ponScript('js/getMainContenido.js');
        //setTimeout( ponScript('js/getMainContenido.js') , 9000 );
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