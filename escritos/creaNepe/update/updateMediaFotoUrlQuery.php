<?php

    $query = "UPDATE nepe 
    SET media_foto_url = $1 
    WHERE id = $2";

    pg_prepare($cnx, "preparo", $query);
    $recurso = pg_execute($cnx, "preparo", array($mediaFotoUrlPosgreArray, $nepe_id));
?>