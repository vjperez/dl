SELECT id, frase, que_vector, ts_rank_cd(que_vector, el_query) AS ranqueo
	FROM que, to_tsquery('spanish', unaccent('el | jardin:*')) el_query
	WHERE el_query @@ que_vector
	ORDER BY ranqueo DESC;


