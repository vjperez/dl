<?php
    
    session_start();
    $_SESSION['quien'] = 'Victor';

    echo '<br>' . $_SESSION['quien'] . ' esta en la session.<br>';

?>