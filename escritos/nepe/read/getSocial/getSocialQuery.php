<?php
$queryGetSocials = "SELECT 
		array_to_json( contactos )
    FROM social
	WHERE dueno_id = 
	(
		SELECT
			dueno.id
		FROM dueno_nepe  JOIN  dueno
			ON dueno_nepe.dueno_id = dueno.id	
		WHERE dueno_nepe.nepe_id = $1
	)";
pg_prepare($cnx, "preparadoQueryGetSocials", $queryGetSocials);
?>