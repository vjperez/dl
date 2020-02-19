<?php
    
    session_start();
    $_SESSION['quien'] = 'Rosa';

    echo '<br>' . $_SESSION['quien'] . ' esta en la session.<br>';

?>