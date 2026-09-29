<?php
//query to find out (read) if for a dueno, social contacts exists

//  using email in dueno, and  a required nombre (from registro.html), social
//  will always have at least nombre at this point in contactos 


$queryGetSocialId = "SELECT 
	id
FROM social
WHERE dueno_id = $1";

pg_prepare($cnx, "preparadoQueryGetSocialId", $queryGetSocialId);
?>