<?php
//When you put bool values, arrays, or integers like the micro empre id, into a json format it allows
//the later use of functions like json_decode().  This makes possible
//the preservation of the datatypes, as stored in  postgresql.
//When jQuery.getJSON receives data it will build a javascript objects
//with the correct datatypes only if you preserve those datatypes,
//otherwise it simply receives text, and you get hard to debug,
//wrong results.



//query returns arrays, bool values ... everything in JSON format (read data from postgre, as json)
$query = "SELECT
	to_json(id),
	nombre,
	to_char(revisado, 'MM/DD/YYYY'),
	array_to_json(que),
	array_to_json(donde),	
	cuando, 
	to_json(a_tu_casa), 

	media_video_url, 
	media_social_handle, 
	array_to_json(media_foto_url) 
FROM nepe 
WHERE id = $1";
pg_prepare($cnx, "preparo", $query);
$recurso = pg_execute($cnx, "preparo", array($nepe_id));
?>
