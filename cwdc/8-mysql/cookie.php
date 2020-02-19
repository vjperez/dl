<?php
    
    echo '<br><br>time es seconds since 1970 ... pero en years: ' . (time() / (60*60*24*365)) . '<br>';

    $ahora = time(); // ahora en segundos since 1970
    //  $expiracion = $ahora + 5*24*60*60;  // ahora + 5 dias
    //  setcookie('fastingSince', $ahora , $expiracion); // 3er parametro hay q darlo siempre; el 2do es el cookie q quiero guardar

    $_COOKIE['fastingSince'] =  $ahora;

    echo '<br> La galleta: ' . $_COOKIE['fastingSince']   .  '<br>';
    print_r($_COOKIE) . '<br>';

    date_default_timezone_set("America/Puerto_Rico");  // time() y date asumen UTC , yo quiero DESPLEGAR UTC-4
    echo '<br><br> fasting since: ' . date("Y/m/d h:m:s A", $_COOKIE['fastingSince']) . "<br>";;
?>