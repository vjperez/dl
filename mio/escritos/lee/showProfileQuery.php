<?php
$query = "SELECT 
	micro_empre_id, 
	nombre, 
	to_char(revisado, 'Mon/DD/YYYY'), 
	video_url, 
	quien_social_handle->>'tt',  
	quien_social_handle->>'fbk',
	quien_social_handle->>'igrm',
	quien_social_handle->>'phn',
	quien_foto_src, 
	cuando->>'lun',
	cuando->>'mar',
	cuando->>'mier',
	cuando->>'jue',
	cuando->>'vier',
	cuando->>'sab',
	cuando->>'dom',	
	que,
	donde,
	case when a_tu_casa = TRUE then 'si' else 'no' end as a_tu_casa
FROM micro_empre 
WHERE micro_empre_id = $id";
?>