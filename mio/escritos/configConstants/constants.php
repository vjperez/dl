<?php
//define("MAQUINA_PATH", "C:\Users\\victor\lighttpd\htdocs");
//define("SITE_PATH_APPEND", "\WebDevelopmentStuff\mio");
//define("UPLOAD_DIR", "\imagenes\profile\subidas\\");

define("MAQUINA_PATH", "/srv/http");
define("SITE_PATH_APPEND", "/WebDevelopmentStuff/mio");
define("UPLOAD_DIR", "/imagenes/profile/subidas/");

$fotos_subidas_dir = MAQUINA_PATH . SITE_PATH_APPEND . UPLOAD_DIR;
?>
