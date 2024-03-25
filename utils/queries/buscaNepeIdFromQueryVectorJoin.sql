SELECT 
    nepe_que.nepe_id, queIds.id, queIds.ranqueo
FROM
    (
    SELECT id,  ts_rank_cd(que_vector, el_query) AS ranqueo
	FROM que, to_tsquery('spanish', unaccent('el | ciber:*')) el_query
	WHERE el_query @@ que_vector 
	ORDER BY ranqueo DESC
    ) queIds
INNER JOIN nepe_que 
    ON  queIds.id = nepe_que.que_id;