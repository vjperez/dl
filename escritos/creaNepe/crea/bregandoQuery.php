<?php



//insert into bregando
$queryInsertBregando = "INSoERT INTO
	bregando(dueno_id, nepe_id)
	VALUES($1, $2)";

pg_prepare($cnx, "preparo", $queryInsertBregando);
$recurso = pg_execute($cnx, "preparo", array($dueno_id, $nepe_id));
?>
