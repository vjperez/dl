SELECT nepe_que.nepe_id
	FROM   nepe_que	
	WHERE  nepe_que.que_id = 
    (
    SELECT que.id
        FROM que, to_tsquery('spanish', unaccent('el | jardin:*')) el_query
        WHERE el_query @@ que_vector   
    );


