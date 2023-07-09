<?php

    $queryUpdateFotoUrl = "UPDATE nepe 
    SET media_foto_url = $1 
    WHERE id = $2";

    pg_prepare($cnx, "preparedQueryUpdateFotoUrl", $queryUpdateFotoUrl);
?>