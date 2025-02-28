SELECT
	dueno.id, dueno.nombre
FROM dueno_nepe  JOIN  dueno
	ON dueno_nepe.dueno_id = dueno.id	
WHERE dueno_nepe.nepe_id = -2147483648;