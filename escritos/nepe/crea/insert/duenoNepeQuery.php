<?php

//insert into dueno nepe
$queryInsertDuenoNepe = "INSERT INTO
	dueno_nepe(dueno_id, nepe_id)
	VALUES($1, $2)";

pg_prepare($cnx, "preparadoQueryInsertDuenoNepe", $queryInsertDuenoNepe);
?>
