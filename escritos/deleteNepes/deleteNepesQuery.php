<?php




//revisalo

$deleteBregandoQuery = "DELETE 
FROM bregando
WHERE dueno_id = '$user_to_leave_without_nepes'";
$recurso = pg_query($cnx, $deleteBregandoQuery);

if($recurso){
}else{
    pg_close($cnx); //maybe not needed but doesn't hurt	
    throw new Exception('Mal query.  Sin RECURSO, para deleteBregandoQuery en: '  . __FILE__ );
}


$deleteNepesQuery = "DELETE 
FROM nepe
WHERE id = '$nepe_to_delete'";
$recurso = pg_query($cnx, $deleteNepeQuery);
?>