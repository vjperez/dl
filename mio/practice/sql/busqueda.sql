SELECT micro_empre_id, nombre, unnest (que) losque FROM micro_empre;

SELECT * FROM
			(
			SELECT micro_empre_id, nombre, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%ImAgEn%';



SELECT micro_empre_id FROM micro_empre 
WHERE nombre iLIKE '%sHop%';


SELECT micro_empre_id, COUNT(micro_empre_id) cuentaennombre FROM micro_empre 
WHERE nombre iLIKE '%sHop%'
GROUP BY micro_empre_id;


SELECT micro_empre_id FROM
			(
			SELECT micro_empre_id, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%';


SELECT micro_empre_id, COUNT(micro_empre_id) cuentaenque FROM
			(
			SELECT micro_empre_id, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%'
GROUP BY micro_empre_id;


///////////////////////////////////////////////////////////////////////////////////////////////////// iLIKE en nombre y en los que ; usa esta
SELECT cuantosque.micro_empre_id, cuentaenque, cuantosmicroempre.micro_empre_id, cuentaennombre
FROM
(SELECT micro_empre_id, COUNT(micro_empre_id) cuentaennombre FROM micro_empre 
WHERE nombre iLIKE '%sHop%'
GROUP BY micro_empre_id) cuantosmicroempre
FULL OUTER JOIN
(SELECT micro_empre_id, COUNT(micro_empre_id) cuentaenque FROM
			(
			SELECT micro_empre_id, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%'
GROUP BY micro_empre_id) cuantosque
ON cuantosmicroempre.micro_empre_id = cuantosque.micro_empre_id;
/////////////////////////////////////////////////////////////////////////////////////////////////////



// union ?
SELECT micro_empre_id FROM
			(
			SELECT micro_empre_id, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%'
UNION
SELECT micro_empre_id FROM micro_empre WHERE nombre iLIKE '%sHop%';

//distinct ? ; not good if you want to keep (add) points
SELECT DISTINCT micro_empre_id FROM
			(
			SELECT micro_empre_id, nombre, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%';	






///////////////////////////////////////////////////////////////////////////////////////////////////// literal con que ; usa esta
SELECT micro_empre_id, losque, quien_foto_src FROM 	 
				 (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
				 ) queasrows  
WHERE losque = 'barbero';
/////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////// literal con donde ; usa esta
SELECT micro_empre_id, losdonde, quien_foto_src  FROM 	 
				 (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
				 ) dondeasrows  
WHERE losdonde = 'moca';
/////////////////////////////////////////////////////////////////////////////////////////////////////	


// todos los pareos que - donde	
SELECT queasrows.micro_empre_id, losque, losdonde, queasrows.quien_foto_src  FROM (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
	 ) queasrows
	 INNER JOIN (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
	 ) dondeasrows
	ON queasrows.micro_empre_id = dondeasrows.micro_empre_id;
	

//  too much info ; no need to match barbero with losdonde if user ONLY asks for barbero // usa literal con que
SELECT queasrows.micro_empre_id, losque, losdonde, queasrows.quien_foto_src  FROM (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
	 ) queasrows
	 INNER JOIN (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
	 ) dondeasrows
	ON queasrows.micro_empre_id = dondeasrows.micro_empre_id
	WHERE losque = 'barbero';	
	
	
///////////////////////////////////////////////////////////////////////////////////////////////////// literal con ambos ; usa esta
SELECT queasrows.micro_empre_id, losque, losdonde, queasrows.quien_foto_src  FROM (
				  SELECT micro_empre_id, unnest (que) losque, quien_foto_src FROM micro_empre
	 ) queasrows
	 INNER JOIN (
				  SELECT micro_empre_id, unnest (donde) losdonde, quien_foto_src FROM micro_empre
	 ) dondeasrows
	ON queasrows.micro_empre_id = dondeasrows.micro_empre_id
	WHERE losque = 'barbero' AND losdonde = 'moca';	
/////////////////////////////////////////////////////////////////////////////////////////////////////