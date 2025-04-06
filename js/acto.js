console.log('acto.js   [loading...]');

var logueado;

//logueado must be set on every case
//then loadAfterActo(), runs logueado dependent contenido
const acto = urlParametro('acto');
switch(acto){
  case 'logout':
    logout();
  break;
  case 'deleteNepe':
    deleteNepe();
  break;
  case 'deleteHerNepes':
    deleteHerNepes();
  break;
  case 'deleteUser':
    deleteUser();
  break;
  
  case '':
  case null:
  default :
    isSessionSet( sessionName = "dueno_id");
  break;
}//acto switch




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


function deleteNepe(){
  const nepeId = urlParametro('nepeId');
    
  let urlParams = new URLSearchParams('escritos/nepe/deleteNepe.php');
  urlParams.set("nepeId", nepeId);
  fetch('escritos/nepe/deleteNepe.php' + '?' + urlParams.toString() )
  .then(
  function(respuesta){
    return respuesta.text();
  })
  .then(
  function(datoTxt){
    /////////////////////////try catch////////////////////////
    let datosJsObj;
    try{
      datosJsObj = JSON.parse( datoTxt );
    }
    catch( err ){
      throw new Error( err + '<br><br>::php<br>' + datoTxt ); 
    }
    //////////////////////////////////////////////////////////
    if(datosJsObj.nepeBorrado){
      logueado = true;//no need to ask server
      loadAfterActo();
      return;
    }else{ 
      throw new Error( "borrado = false, 0 affected rows." ); 
    }
  })
  .catch(
  function(error){
    window.location.href = encodeAndGetErrorPath(error);
  });
}


function deleteHerNepes(){
  const userId = urlParametro('userId');

  urlParams = new URLSearchParams('escritos/nepe/deleteHerNepes.php');
  urlParams.set("userId", userId);
  fetch('escritos/nepe/deleteHerNepes.php' + '?' + urlParams.toString() )
  .then(
  function(respuesta){
    return respuesta.text();
  })
  .then(
  function(datoTxt){
    /////////////////////////try catch////////////////////////
    let datosJsObj;
    try{
      datosJsObj = JSON.parse( datoTxt );
    }
    catch( err ){
      throw new Error( err + '<br><br>::php<br>' + datoTxt ); 
    }
    //////////////////////////////////////////////////////////
    if(datosJsObj.nepesBorrados > 0){
      logueado = true;//no need to ask server
      loadAfterActo();
      return;
    }else{ 
      throw new Error( "borrados = 0, " + datosJsObj.nepesBorrados + " affected rows." ); 
    }
  })
  .catch(function(error){
    window.location.href = encodeAndGetErrorPath(error);
  });
}


function deleteUser(){
  const userNo = urlParametro('userNo');

  let urlParams = new URLSearchParams('escritos/dueno/deleteDueno.php');
  urlParams.set("userNo", userNo);
  fetch('escritos/dueno/deleteDueno.php' + '?' + urlParams.toString() )
  .then(
  function(respuesta){
    return respuesta.text();
  })
  .then(
  function(datoTxt){
    /////////////////////////try catch////////////////////////
    let datosJsObj;
    try{
      datosJsObj = JSON.parse( datoTxt );
    }
    catch( err ){
      throw new Error( err + '<br><br>' + datoTxt ); 
    }
    //////////////////////////////////////////////////////////
    if(datosJsObj.userBorrado){
      logueado = true;//no need to ask server
      loadAfterActo();
      return;
    }else{ 
      throw new Error( "borrado = false, 0 affected rows." ); 
    }
  })
  .catch(
  function(error){
    window.location.href = encodeAndGetErrorPath(error);
  });
}


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



//runs logueado dependent contenido
function loadAfterActo(){
  ponScript('js/navButtons.js');
  ponScript('js/getMainContenido.js');
}