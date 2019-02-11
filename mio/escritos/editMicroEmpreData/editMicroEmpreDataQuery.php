<?php
$query = "UPDATE
	micro_empre
SET revisado = NOW()::date,
nombre = '$nombre',
video_url = '$videoUrl',
quien_social_handle = '$quien_social_handle',
cuando = '$cuando',
que = '$que',
donde = '$donde',
a_tu_casa = '$a_tu_casa'

WHERE micro_empre_id = '$micro_empre_id'";
?>
