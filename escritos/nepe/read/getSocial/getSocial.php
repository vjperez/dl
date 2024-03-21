<?php
$losSocial = array();  
$recurso = pg_execute($cnx, "preparadoQueryGetSocials", array($nepe_id));
if($recurso){
    $index = 0;
    while($socialFila = pg_fetch_row($recurso)){
        $losSocial[$index]['tipo']   = $socialFila[0];
        $losSocial[$index]['handle'] = $socialFila[1];
        $index++;
    }
}else{
    pg_close($cnx);
    throw new Exception('Mal query.  Sin RECURSO para preparadoQueryGetSocials en: ' . __FILE__  );
}
?>