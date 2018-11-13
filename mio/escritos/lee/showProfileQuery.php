<?php
//When you put bool values, arrays, or integers like the id, into a json format it allows
//the later use of functions like json_decode().  This makes possible
//the preservation of the datatypes, as stored in  postgresql.  
//When jQuery.getJSON receives data it will build a javascript objects
//with the correct datatypes only if you preserve those datatypes, 
//otherwise it simply receives text, and you get hard to debug,
//wrong results.

//query returns arrays, bool values ... everything in JSON format (read data from postgre, as json)
$query = "SELECT 
	to_json(micro_empre_id), 
	nombre, 
	to_char(revisado, 'Mon/DD/YYYY'), 
	video_url, 
	quien_social_handle,
	array_to_json(quien_foto_src), 
	cuando,
	array_to_json(que),
	array_to_json(donde),
	to_json(a_tu_casa)
FROM micro_empre 
WHERE micro_empre_id = $id";
?>