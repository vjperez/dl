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

ponScript('js/funcionesMainContenido.js');
ponScript('js/funcionesMenu-HidableSectionsToggle.js');
ponScript('js/funciones.js');

ponScript('js/acto.js');
//portada html links already have look and acto, 
//logout for example, have look=login and have an acto=logout
//so after initLoad, then acto.js, which sets logueado
//either on isSessionSet or logout
//then loads the rest after acto.