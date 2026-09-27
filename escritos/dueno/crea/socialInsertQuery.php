<?php
// query to insert dueno's social contactos for dueno_id
//string comes from registra.php 
	//$contactos   = array( $telefono,  $nombre,  $insta,  $caralibro);
	//$contactosStr = implode(',', $contactos);
	//the created postgresql array is 1 index based, so contactos[2] will be nombre
$querySocialInsert = "INSERT INTO
	social(dueno_id, contactos, creado, revisado)
	VALUES($1, string_to_array( $2, ',' ), NOW()::date, NOW()::date )";

pg_prepare($cnx, "preparadoQuerySocialInsert", $querySocialInsert);
?>
