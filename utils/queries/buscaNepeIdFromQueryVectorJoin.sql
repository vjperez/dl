SELECT 
    nepe_que.nepe_id, queIds.id, queIds.frase, queIds.ranqueo
FROM
    (
    SELECT id, frase, ts_rank_cd(que_vector, el_query) AS ranqueo
	FROM que, to_tsquery('spanish', unaccent('coc:* | pio:*')) el_query
	WHERE el_query @@ que_vector 
	ORDER BY ranqueo DESC
    ) queIds
INNER JOIN nepe_que 
    ON  queIds.id = nepe_que.que_id;