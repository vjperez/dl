SELECT
	to_json(nepe.id),
	to_char(nepe.creado,   'MM/DD/YYYY'),
	to_char(nepe.revisado, 'MM/DD/YYYY'),
	nombre,
	cuando,
	su_casa,
	desde_casa,
	video.url,
	array(
		SELECT
			que.frase
		FROM nepe_que left JOIN que
			ON nepe_que.que_id = que.id	
		WHERE nepe_que.nepe_id = -2147483648
	) as losQue,
    array(
		SELECT
			donde.frase
		FROM nepe_donde left JOIN donde
			ON nepe_donde.donde_id = donde.id	
		WHERE nepe_donde.nepe_id = -2147483648
	) as losDonde
FROM nepe left JOIN video
	ON nepe.id = video.nepe_id	
WHERE nepe.id = -2147483648;

