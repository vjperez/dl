SELECT
	to_json(nepe.id),
	to_char(nepe.creado,   'MM/DD/YYYY'),
	to_char(nepe.revisado, 'MM/DD/YYYY'),
	nombre,
	cuando,
	su_casa,
	desde_casa,
	video.url
FROM nepe left JOIN video
	ON nepe.id = video.nepe_id	
WHERE nepe.id = -2147483645;

