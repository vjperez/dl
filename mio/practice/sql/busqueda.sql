SELECT micro_empre_id, nombre, unnest (que) losque FROM micro_empre;


SELECT micro_empre_id FROM micro_empre WHERE nombre iLIKE '%sHop%';


SELECT micro_empre_id, COUNT(micro_empre_id) FROM micro_empre WHERE nombre iLIKE '%sHop%'
GROUP BY micro_empre_id;


SELECT micro_empre_id FROM
			(
			SELECT micro_empre_id, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%';


SELECT micro_empre_id, COUNT(micro_empre_id) FROM
			(
			SELECT micro_empre_id, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%'
GROUP BY micro_empre_id;


SELECT micro_empre_id FROM
			(
			SELECT micro_empre_id, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%'
UNION
SELECT micro_empre_id FROM micro_empre WHERE nombre iLIKE '%sHop%';


SELECT DISTINCT micro_empre_id FROM
			(
			SELECT micro_empre_id, nombre, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%';	


// 1pto
SELECT * FROM
			(
			SELECT micro_empre_id, nombre, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%mAg%';


// literal con que ; usa esta
SELECT micro_empre_id, losque, quien_foto_src FROM 	 
				 (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
				 ) queasrows  
WHERE losque = 'barbero'


// literal con donde ; usa esta
SELECT micro_empre_id, losdonde, quien_foto_src  FROM 	 
				 (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
				 ) dondeasrows  
WHERE losdonde = 'moca'
	

	
SELECT queasrows.micro_empre_id, losque, losdonde, queasrows.quien_foto_src  FROM (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
	 ) queasrows
	 INNER JOIN (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
	 ) dondeasrows
	ON queasrows.micro_empre_id = dondeasrows.micro_empre_id;
	

SELECT queasrows.micro_empre_id, losque, losdonde, queasrows.quien_foto_src  FROM (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
	 ) queasrows
	 INNER JOIN (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
	 ) dondeasrows
	ON queasrows.micro_empre_id = dondeasrows.micro_empre_id
	WHERE losque = 'barbero';	
	
	
//literal con ambos ; usa esta
SELECT queasrows.micro_empre_id, losque, losdonde, queasrows.quien_foto_src  FROM (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
	 ) queasrows
	 INNER JOIN (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
	 ) dondeasrows
	ON queasrows.micro_empre_id = dondeasrows.micro_empre_id
	WHERE losque = 'barbero' AND losdonde = 'moca';	