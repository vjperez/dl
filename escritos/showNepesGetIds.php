<?php
//saca los valores de GET
//$duenoId = $_GET['duenoId'];

if(isset($_COOKIE['dueno_id'])){
		$dueno_id = $_COOKIE['dueno_id'];	
	
		//conecta al db
		require_once 'conecta/conecta.php';
		//i am sure i have a connection, because an exception was NOT thrown at conecta

		require_once 'showNepesGetIds/showNepesGetIdsQuery.php';
		$ownNepes = array();	// to store this user's nepe ids
		$empresa =  array();
		$empresas = array();
		$recurso = pg_query($cnx, $getNepeIdsQuery);
		if($recurso){
			$index = 0;
			while($empresa = pg_fetch_row($recurso) ){
				$ownNepes[$index] = $empresa[0];
				$empresas[$index]['nepeId'] = json_decode($empresa[0]);
				$empresas[$index]['nepeNombre'] = $empresa[1];
				$index++;
			}
			pg_close($cnx);
			echo json_encode($empresas);
			//Store own nepes on cookie in json format
			setcookie('own_nepes', json_encode($ownNepes), 3600*24 + time(), '/');
		}else{
			pg_close($cnx); //maybe not needed but doesn't hurt
			throw new Exception('Mal query.  Sin RECURSO en: ' . __FILE__  );
		}
}else{
	throw new Exception('Sin cookie en: ' . __FILE__  );
}
?>
