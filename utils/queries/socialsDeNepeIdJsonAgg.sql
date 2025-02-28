SELECT  json_agg(tipo) as tipos ,json_agg(handle) as handles
FROM social
WHERE dueno_id = 
	(
		SELECT
			dueno.id
		FROM dueno_nepe  JOIN  dueno
			ON dueno_nepe.dueno_id = dueno.id	
		WHERE dueno_nepe.nepe_id = -2147483648
	);
