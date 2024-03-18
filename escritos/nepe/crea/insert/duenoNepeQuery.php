<?php

//insert into dueno nepe
$queryInsertDuenoNepe = "INSERT INTO
	dueno_nepe(dueno_id, nepe_id, creado, vence)
	VALUES($1, $2, NOW()::date , 365 + NOW()::date )";

pg_prepare($cnx, "preparadoQueryInsertDuenoNepe", $queryInsertDuenoNepe);
?>
