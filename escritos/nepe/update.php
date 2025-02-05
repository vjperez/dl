<?php
session_start();
if( isset($_SESSION['dueno_id']) && isset($_SESSION['own_nepes_with_ids']) ){
	$index = $_POST['nepe_index'];
	$own_nepes_with_ids = $_SESSION['own_nepes_with_ids'];
	$nepe_id = $own_nepes_with_ids[$index]['nepeId'];
	$dueno_id = $_SESSION['dueno_id'];

	$nombre = $_POST['nombre'];
	$cuando = $_POST['cuando'];
	
	//su casa - desde casa
	$su_casa_str = $_POST['suCasa'];
	if(      0 === strcmp($su_casa_str , 'si')){
		$su_casa = 't';// value that postgreSQL undestands
	}elseif( 0 === strcmp($su_casa_str , 'no')){
		$su_casa = 'f';// value that postgreSQL undestands.  
		//PHP undestands false, but tries to insert '' into Postgresql which causes an error
	}else{
		$su_casa = null;// value that postgreSQL undestands
	}
	$desde_casa_str = $_POST['desdeCasa'];
	if(      0 === strcmp($desde_casa_str , 'si')){
		$desde_casa = 't';// value that postgreSQL undestands
	}elseif( 0 === strcmp($desde_casa_str , 'no')){
		$desde_casa = 'f';// value that postgreSQL undestands
		//PHP undestands false, but tries to insert '' into Postgresql which causes an error
	}else{
		$desde_casa = null;// value that postgreSQL undestands
	}
	


	
	$respuesta = new stdClass;
	$respuesta->nepeId = $nepe_id;
	require_once '../conecta/conecta.php';
	//i am sure i have a connection, because an exception was NOT thrown at conecta
	



	if(isset( $_POST['videoUrl'] )){
    $videoUrl = $_POST['videoUrl'];

    $neededStr = 'youtu.be/';
    $youtubeIdFormat = '0123456789a';   //11 chars
    $indexOfNeededStr = strpos($videoUrl, $neededStr);

    if ( strlen($videoUrl) >= $indexOfNeededStr + strlen($neededStr) + strlen($youtubeIdFormat) ){
      $videoUrl = 'ytId:' . substr( $videoUrl, $indexOfNeededStr + strlen($neededStr), strlen($youtubeIdFormat) );
	    require_once 'update/core/updateWithVideoUrl.php';
    }else{
      require_once 'update/core/updateWithNoVideoUrl.php';
    }

  }else{
    require_once 'update/core/updateWithNoVideoUrl.php';
  }




	//foto
	if(isset( $_FILES['fotoArr'] )){  // cuando escoges files para subir
		require_once 'update/foto/with/updateFotoQueries.php';
		require_once 'update/foto/with/update.php';
		require_once 'update/foto/with/checkFotoErrorAndMove.php';
	}else{
		//require_once 'update/foto/without/update.php';
	}
	
	
	//que
	$queToBeFrasesArr   = json_decode( $_POST['losQue'] ); 
	//donde
	$dondeToBeFrasesArr = json_decode( $_POST['losDonde'] );
	require_once 'update/que-donde/update.php';
	
	
	pg_close($cnx);
	echo json_encode ($respuesta);
	
}else{
	throw new Exception('Session dueno_id o own_nepes_with_ids, no seteada en: ' . __FILE__  );
}

?>
