<?php
    
    $ahora = time(); // ahora en segundos since 1970


    //set
    $expiracion = $ahora + 5*24*60*60;  // ahora + 5 dias
    setcookie('fastingSince', $ahora , $expiracion); // 3er parametro hay q darlo siempre; el 2do es el cookie q quiero guardar

    //update
    //$_COOKIE['fastingSince'] =  $ahora;


    //show cookie 1
    //echo '<br> La galleta: ' . $_COOKIE['fastingSince']   .  '<br>';

    //show cookie 2
    //print_r($_COOKIE) . '<br>';
    
    //show cookie 3
    date_default_timezone_set("America/Puerto_Rico");  // time() y date asumen UTC , yo quiero DESPLEGAR UTC-4
    echo '<br><br> fasting since: ' . date("Y/m/d h:m:s A", $_COOKIE['fastingSince']) . "<br>";;
?>