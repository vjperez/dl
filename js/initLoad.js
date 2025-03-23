function ponScript(scriptSrc) { 
  const scriptEle = document.createElement('script');
  scriptEle.src = scriptSrc; 
  scriptEle.async = false;
  document.querySelector('body').insertAdjacentElement('beforeend', scriptEle);

  scriptEle.addEventListener('load', 
    function(){ 
      console.log( scriptSrc + ' script resource has loaded.' );
    }
  );
}

ponScript('js/funcionesMainContenido.js');
ponScript('js/funcionesMenu-HidableSectionsToggle.js');
ponScript('js/funciones.js');

ponScript('js/acto.js');
//portada html links already have look and acto, 
//logout for example, have look=login and an acto=logout
//so after initLoad.js, acto.js is runned,
//which sets logueado, either on isSessionSet or logout
//acto.js finishes by loading other scripts on load after acto