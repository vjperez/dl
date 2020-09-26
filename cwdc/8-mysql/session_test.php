<?php
    session_start();

    

    echo "<br><h1>session['quien'] can be set on sessionVictor.php and sessionRosa.php file. 
    Let's test if we can read it here...</h1>";

    echo "<br><p>try values like 'algo', zero lenght string,  and null</p>";

    echo '<br>' . $_SESSION['quien'] . ' esta en la session.<br>';
    
    //exists (existe?)
    if( array_key_exists('quien', $_SESSION) ){
        echo "<br> array key exists() para $ SESSION [quien] es TRUE o truty. <br>";
    }

    //exists and is not NULL  ;  (nulidad)
    if( isset($_SESSION['quien']) ){
        echo "<br> isset () para $ SESSION [quien] es TRUE o truty. <br>";
    }

    //exists, not null, and truty   (veracidad)
    if( $_SESSION['quien'] ){
        echo "<br> $ SESSION [quien] es TRUE o truty. <br>";
    }
?>