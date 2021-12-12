<?php
$deleteBregandoQuery = "DELETE 
FROM bregando
WHERE nepe_id = '$nepe_to_delete'";
$recurso = pg_query($cnx, $deleteBregandoQuery);

if($recurso){
}else{
    pg_close($cnx); //maybe not needed but doesn't hurt	
    throw new Exception('Mal query.  Sin RECURSO, para deleteBregandoQuery en: '  . __FILE__ );
}


$deleteNepeQuery = "DELETE 
FROM nepe
WHERE id = '$nepe_to_delete'";
$recurso = pg_query($cnx, $deleteNepeQuery);
?>