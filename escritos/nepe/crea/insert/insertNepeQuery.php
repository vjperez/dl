<?php
//double query

// inserts a into db a nepe
$queryInsertNepe = "INSERT INTO
	nepe (nombre, cuando, su_casa, desde_casa, creado, revisado, activo )
 	VALUES ($1, $2, $3, $4,  NOW()::date,  NOW()::date,  TRUE )";
pg_prepare($cnx, "preparadoQueryInsertNepe", $queryInsertNepe);



$querySelectNepeInsertedId = "SELECT currval('nepe_id_seq')";
?>