<?php

//insert into bregando
$queryInsertBregando = "INSERT INTO
	bregando(dueno_id, nepe_id)
	VALUES($1, $2)";

pg_prepare($cnx, "preparadoQueryInsertBregando", $queryInsertBregando);
?>
