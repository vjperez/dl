console.log('acto.js   [loading...]');

var logueado;

const acto = urlParametro('acto');
switch(acto){
  case 'logout':
    logout();
  break;
  case 'deleteNepe':
    const nepeId = urlParametro('nepeId');
    
    let urlParams = new URLSearchParams('escritos/deleteNepe.php');
    urlParams.set("nepeId", nepeId);
    fetch('escritos/nepe/deleteNepe.php' + '?' + urlParams.toString() )
    .then(
    function(respuesta){
      return respuesta.text();
    })
    .then(
    function(dato){
      /////////////////////////try catch////////////////////////
      let datosJSOBJ;
      try{
        datosJSOBJ = JSON.parse( dato );
      }
      catch( err ){
        throw new Error( err + '<br><br>' + dato ); 
      }
      //////////////////////////////////////////////////////////
      if(datosJSOBJ.nepeBorrado){

      }else{ 
        throw new Error( "borrado = false, 0 affected rows." ); 
      }
    })
    .catch(
    function(error){
      window.location.href = encodeAndGetErrorPath(error);
    });
  break;
  case 'deleteHerNepes':
    const userId = urlParametro('userId');

    urlParams = new URLSearchParams('escritos/deleteHerNepes.php');
    urlParams.set("userId", userId);
    fetch('escritos/deleteHerNepes.php' + '?' + urlParams.toString() )
    .then(
    function(respuesta){
      return respuesta.text();
    })
    .then(
    function(dato){
      /////////////////////////try catch////////////////////////
      let datosJSOBJ;
      try{
        datosJSOBJ = JSON.parse( dato );
      }
      catch( err ){
        throw new Error( err + '<br><br>' + dato ); 
      }
      //////////////////////////////////////////////////////////
      if(datosJSOBJ.nepeBorrados > 0){

      }else{ 
        throw new Error( "borrados = 0, " + datosJSOBJ.nepeBorrados + " affected rows." ); 
      }
    })
    .catch(function(error){
      window.location.href = encodeAndGetErrorPath(error);
    });			
  break;
  
  case '':
  case null:
  default :
    isSessionSet( sessionName = "dueno_id");
  break;
}//acto switch


function isSessionSet( sessionName ){
    console.log('acto.js, before isSessionSet fetch: ' + logueado);

    let urlParams = new URLSearchParams('escritos/session/isSessionSet.php');
    urlParams.set("key", sessionName);
    fetch('escritos/session/isSessionSet.php' + '?' + urlParams.toString() )
    .then(function(respuesta){
      console.log('acto.js, isSessionSet fetch, then 1');
      console.log(respuesta);
      return respuesta.json();
    })
    .then(function(dato){
      console.log('acto.js isSessionSet fetch, then 2: ');
      console.log(dato);

      logueado = dato.isSet;
      loadAfterActo();
      return;
    })
    .catch(
      function(error){
        console.error('catch...');
        console.error(error);
        //next href reasign will restart the process at initLoad.js
        //and eventually here again... causing infinite loop
        //const href = encodeAndGetErrorPath(error);
        //window.location.href = href;
    });
}


function logout(){
  //const opciones = {
    //method:'PUT'
  //};
  fetch('escritos/dueno/logout.php')
  .then(
    function(respuesta){
      console.log('acto.js logout fetch, then 1: ');
      console.log(respuesta);
      return respuesta.json();
  })
  .then(
    //No need for next line here!
    //window.location.href = window.location.pathname + '?look=login';
    function(dato){
      console.log('acto.js logout fetch, then 2: ');
      console.log(dato);
      console.log('php dueno isset after logout: ' + dato.duenoIsSet);
      
      logueado = dato.duenoIsSet;
      loadAfterActo();
      return;
    })
  .catch(
    function(error){
      console.error('catch...');
      console.error(error);
      //const href = encodeAndGetErrorPath(error);
      //window.location.href = href;
  });
}


function loadAfterActo(){
  ponScript('js/navButtons.js');
  ponScript('js/getMainContenido.js');
}
