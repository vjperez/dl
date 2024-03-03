<?php
//double query

// inserts a into db a nepe with fotos
$queryInsertNepe = "INSERT INTO
	nepe (nombre, cuando, su_casa, desde_casa, creado, revisado)
 	VALUES ($1, $2, $3, $4, NOW()::date, NOW()::date)";

pg_prepare($cnx, "preparadoQueryInsertNepe", $queryInsertNepe);



$querySelectNepeInsertedId = "SELECT currval('nepe_id_seq')";
?>