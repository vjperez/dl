let forma = document.querySelector('form#loginForm');
let formData = new FormData(forma);

forma.addEventListener('submit',
function(evento){
	evento.preventDefault(); //not making a submit (POST request) from html action.
	let user = document.querySelector('#usernameId').value;
	let pass = document.querySelector('#passwordId').value;

	if( areValidUserYPass(user, pass, pass, "genericFeedback", 'form#loginForm h3.feedback') ){
		
    formData.append('user', user);
    formData.append('pass', pass);
    const opciones = { body:formData, method:'post' };
    fetch('escritos/dueno/login.php', opciones )
	  .then(
	  function(respuesta){
      console.log(' fetch, then 1');
      console.log(respuesta);
      return respuesta.text();  
	  })
	  .then(
    function(datos){
      console.log(' fetch, then 2: ');
      console.log( datos );
      /////////////////////////try catch////////////////////////
      let datosJSOBJ;
      try{
        datosJSOBJ = JSON.parse( datos );
      }
      catch( err ){
        throw new Error( err + '<br><br>' + datos ); 
      }
      //////////////////////////////////////////////////////////
      if(datosJSOBJ.logueado){
        window.location.href = window.location.pathname + '?look=home';
      }else{
        feedback('form#loginForm h3.feedback', datosJSOBJ.feedback, 'feedbackwarn', 'downdelayup');
      }
    })
    .catch(
    function(error){
      const href = encodeAndGetErrorPath(error);
      window.location.href = href;
    });

	}//if

});//eventlistener

/*
//erase feedback when user writes
jQuery('form[id*=Form]  input[name^=password],  form[id*=Form]  input[name=username]')
.keydown(function(){
	jQuery.feedback('form[id*=Form] h3', '', '');
});
*/
