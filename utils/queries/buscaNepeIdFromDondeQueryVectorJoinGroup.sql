SELECT 
    nepe_donde.nepe_id, STRING_AGG(dondeIds.frase, ', '), SUM(dondeIds.ranqueo)
FROM
    (
    SELECT id, frase, ts_rank_cd(donde_vector, el_query) AS ranqueo
	FROM donde, to_tsquery('spanish', unaccent('moca:* | ponce:*')) el_query
	WHERE el_query @@ donde_vector 
	ORDER BY ranqueo DESC
    ) dondeIds
INNER JOIN nepe_donde 
    ON  dondeIds.id = nepe_donde.donde_id
GROUP BY  nepe_donde.nepe_id
ORDER BY SUM(dondeIds.ranqueo) DESC;