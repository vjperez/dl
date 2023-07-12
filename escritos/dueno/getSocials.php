<?php
session_start();
if(isset($_SESSION['dueno_id'])){
	$dueno = $_SESSION['dueno_id'];
	
	require_once '../conecta/conecta.php';
	
	require_once 'read/socialsQuery.php';
	$recurso = pg_execute($cnx, "preparadoQuerySocials", array($dueno));
	if($recurso){
		$losSocials = array();
		$index = 0;
		while($socialFila = pg_fetch_row($recurso)){
			$losSocials[$index]['tipo']   = $socialFila[0];
			$losSocials[$index]['handle'] = $socialFila[1];
			$index++;
		}
		pg_close($cnx);
		echo json_encode($losSocials);
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Mal query.  Sin RECURSO para preparadoQuerySocials en: ' . __FILE__  );
	}
}else{
	throw new Exception('Session no seteada en: ' . __FILE__  );
}
?>
