SELECT 
			nepe_que.nepe_id, queIds.frase, dondeIds.frase, queIds.ranqueo + dondeIds.ranqueo
		FROM
		(
			SELECT id, frase, ts_rank_cd(que_vector, que_query)  AS ranqueo
			FROM que, to_tsquery('spanish', unaccent('coc:* | pio:*')) que_query
			WHERE que_query @@ que_vector
		) queIds
		INNER JOIN nepe_que 
			ON  queIds.id = nepe_que.que_id,
		(
			SELECT id, frase, ts_rank_cd(donde_vector, donde_query) AS ranqueo
			FROM donde, to_tsquery('spanish', unaccent('moca:* | ponce:*')) donde_query
			WHERE donde_query @@ donde_vector
		) dondeIds		
		INNER JOIN nepe_donde 
			ON  dondeIds.id = nepe_donde.donde_id

		WHERE nepe_que.nepe_id = nepe_donde.nepe_id
        
        
		ORDER BY queIds.ranqueo + dondeIds.ranqueo DESC;