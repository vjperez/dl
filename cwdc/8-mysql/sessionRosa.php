<?php
    
    session_start();
    $_SESSION['quien'] = null;

    echo '<br>' . $_SESSION['quien'] . ' esta en la session.<br>';

?>