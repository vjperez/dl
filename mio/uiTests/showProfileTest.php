<?php
//In this ui test $dbJSON represents data on a database. It is a JSON string that will be encoded
//as a PHP variable.  PHP will use the variable to return the requested option, the
//one with the matching id.

$dbJSON = '
{"opciones":[
    { "id":1,
	  "nombre":"tito el barbero", 
	  "videoUrl":"https://www.youtube.com/watch?v=rWq_-AexyAo", 
	  "quien":["socialHandle":["tt":"@tito", "fb":"tito el feo", "insta":"@tito_en_insta", "phone":"787 248 0001"], 
	           "fotoSrc":["imagenes/profile/bob301a.jpg", "imagenes/profile/bob301b.jpg", "imagenes/profile/bob301c.jpg", "imagenes/profile/bob301d.jpg", "imagenes/profile/bob301e.jpg"]],
	  "cuando":["lun":"libre", "mar":"por la tarde", "mier":"8am-11am", "jue":"3pm-11pm", "vier":"libre:se bebe", "sab":"desde 5am", "dom":"desde 7pm"],
	  "que":["barbero", "estilista", "hair professional", "peinador", "peluquero"],
	  "donde":["moca", "anasco", "rincon"],
	  "atucasa":true
	},
	{ "id":2,
	  "nombre":"lola dona", 
	  "videoUrl":"https://www.youtube.com/watch?v=4KjYNuNBOBg", 
	  "quien":["socialHandle":["tt":"@lola", "fb":"lola la comelola", "insta":"@lola_en_insta", "phone":"787 249 0002"], 
	           "fotoSrc":["imagenes/profile/bob302a.jpg", "imagenes/profile/bob302b.jpg", "imagenes/profile/bob302c.jpg"]],
	  "cuando":["lun":"12 a 5pm", "mar":"no work martes", "mier":"10pm-1am", "jue":"5am-1pm", "vier":"10:30am a 2pm", "sab":"desde 9pm", "dom":"hasta las 15"],
	  "que":["repostera", "baker", "panadera", "dulces", "postres"],
	  "donde":["ponce", "coamo", "sabana grande"],
	  "atucasa":false
	},
    { "id":3,
	  "nombre":"chucho landscaping", 
	  "videoUrl":"https://www.youtube.com/watch?v=0Uk5kZ5k0vY", 
	  "quien":["socialHandle":["tt":"@granchucho", "fb":"chucho de jayuya", "insta":"@chucho_en_insta", "phone":"787 222 0003"], 
	           "fotoSrc":["imagenes/profile/bob303a.jpg", "imagenes/profile/bob303b.jpg"]],
	  "cuando":["lun":"no", "mar":"quiza", "mier":"to el dia", "jue":"3pm-11pm", "vier":"si no llueve", "sab":"desde 9am", "dom":"24hrs"],
	  "que":["pica grama", "corta grama", "tumba yerba", "limpio patios", "trimeo palos"],
	  "donde":["moca", "las marias", "mayaguez"],
	  "atucasa":true
	},
    { "id":4,
	  "nombre":"papito el bello", 
	  "videoUrl":"https://www.youtube.com/watch?v=AFoFxirvRKU", 
	  "quien":["socialHandle":["tt":"@papito", "fb":"papito el bello", "insta":"@papito_en_insta", "phone":"787 248 0004"], 
	           "fotoSrc":["imagenes/profile/bob304a.jpg", "imagenes/profile/bob304b.jpg", "imagenes/profile/bob304c.jpg", "imagenes/profile/bob304d.jpg"]],
	  "cuando":["lun":"libre", "mar":"", "mier":"8am-11am", "jue":"3pm-11pm", "vier":"libre:se bebe", "sab":"", "dom":""],
	  "que":["musico", "bailarin", "orquesta", "entretenimiento actividades", "payaso"],
	  "donde":["moca", "san german", "lares"],
	  "atucasa":true
	},
	{ "id":5,
	  "nombre":"luis car wash", 
	  "videoUrl":"https://www.youtube.com/watch?v=L0eIqLvZlz8", 
	  "quien":["socialHandle":["tt":"@luis", "fb":"luis limpia carro", "insta":"@luis_en_insta", "phone":"787 249 0005"], 
	           "fotoSrc":["imagenes/profile/bob305a.jpg"]],
	  "cuando":["lun":"12 a 5pm", "mar":"no work martes", "mier":"10pm-1am", "jue":"5am-1pm", "vier":"10:30am a 2pm", "sab":"desde 9pm", "dom":"hasta las 15"],
	  "que":["limpia carro", "brilla carro", "vaccum car cleaner", "car detailing", "lava carro"],
	  "donde":["yauco", "santa isabel", "sabana grande"],
	  "atucasa":true
	},
    { "id":6,
	  "nombre":"cheo foto shopero", 
	  "videoUrl":"https://www.youtube.com/watch?v=nSYT367zBUI", 
	  "quien":["socialHandle":["tt":"@cheo", "fb":"cheo mr foto", "insta":"@cheo_en_insta", "phone":"787 222 0006"], 
	           "fotoSrc":["imagenes/profile/bob306a.jpg", "imagenes/profile/bob306b.jpg"]],
	  "cuando":["lun":"me amanesco", "mar":"quiza", "mier":"to la noche", "jue":"3pm pa lante", "vier":"si tengo luz", "sab":"desde 9am", "dom":"24hrs"],
	  "que":["profile picture photoshop", "photoshop pictures", "foto shopeo imagenes", "caricaturas basada en foto", "experto dibujo digital"],
	  "donde":["new york", "orlando", "bayamon"],
	  "atucasa":false
	}
]}';

//saca los valores de GET
$id = $_GET['id'];


//generar la opcion deseada
$dbPHP = json_decode($dbJSON);
$opcion = $dbPHP['opciones'][-1 + $id]; //PHP counts from 0, this dbJSON data counts from 1

//devuelve la opcion deseada as JSON 
echo json_encode($opcion);
?>
