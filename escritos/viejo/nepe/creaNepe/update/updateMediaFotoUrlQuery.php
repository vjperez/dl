<?php

    $queryUpdateFotoUrl = "UPDATE nepe 
    SET media_foto_url = $1 
    WHERE id = $2";

    pg_prepare($cnx, "preparedQueryUpdateFotoUrl", $queryUpdateFotoUrl);
    $recurso = pg_execute($cnx, "preparedQueryUpdateFotoUrl", array($mediaFotoUrlPosgreArray, $nepe_id));
?>