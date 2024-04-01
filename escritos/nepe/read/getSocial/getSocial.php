<?php
$social_array = array();  
$recurso = pg_execute($cnx, "preparadoQueryGetSocials", array($nepe_id));
if($recurso){
    if($socialFila = pg_fetch_row($recurso)){
        $social_array = json_decode( $socialFila[0] );	
    }
}else{
    pg_close($cnx);
    throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetSocials en: ' . __FILE__  );
}
?>