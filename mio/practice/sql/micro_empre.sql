CREATE TABLE IF NOT EXISTS micro_empre (
	numero_de_admins   SMALLINT  NOT NULL  DEFAULT 1  CHECK(numero_de_admins>0),
	
    micro_empre_id   SERIAL  PRIMARY KEY,
	nombre   VARCHAR (64)  NOT NULL,
	revisado   DATE  NOT NULL   DEFAULT '2010-01-01'  CHECK(revisado > '2009-12-31'), 
	video_url   VARCHAR (64)  NOT NULL,
	quien_social_handle json NOT NULL, 
	quien_foto_src VARCHAR(64) []  NOT NULL, 
	cuando json  NOT NULL,
	que VARCHAR(64) []  NOT NULL, 
	donde VARCHAR(64) []  NOT NULL, 
	a_tu_casa boolean   NOT NULL
);


INSERT INTO micro_empre
	    (nombre, video_url, quien_social_handle, quien_foto_src, cuando, que, donde, a_tu_casa) 
		VALUES('tito el barbero', 
			   'https://www.youtube.com/embed/rWq_-AexyAo', 
			   '{"tt":"@tito", "fbk":"", "igrm":"@tito_en_insta", "phn":""}', 
			   ARRAY['bob301a.jpg', 'bob301b.jpg', 'bob301c.jpg', 'bob301d.jpg', 'bob301e.jpg'],
			   '{"lun":"libre", "mar":"por la tarde", "mier":"8am-11am", "jue":"3pm-11pm", "vier":"libre papi, hoy se bebe", "sab":"tambien bebo hoy", "dom":"desde 7pm"}',
			   ARRAY['barbero', 'estilista', 'hair professional', 'peinador', 'peluquero'],
			   ARRAY['moca', 'anasco', 'rincon'],
			   true
);


SELECT * FROM micro_empre;

SELECT quien_social_handle, cuando FROM micro_empre;

SELECT quien_foto_src, que, donde FROM micro_empre;

SELECT micro_empre_id, numero_de_admins, nombre, revisado, video_url, a_tu_casa FROM micro_empre;

SELECT micro_empre_id, nombre FROM micro_empre;







SELECT DISTINCT micro_empre_id FROM
			(
			SELECT micro_empre_id, nombre, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%';
	
SELECT * FROM
			(
			SELECT micro_empre_id, nombre, unnest (que) losque FROM micro_empre
			) queasrows 
WHERE losque iLIKE '%sHop%';
	
SELECT micro_empre_id, nombre, unnest (que) FROM micro_empre;








INSERT INTO micro_empre
	    (nombre, revisado, video_url, quien_social_handle, quien_foto_src, cuando, que, donde, a_tu_casa) 
		VALUES('lola dona', '1992-07-25',
			   'https://www.youtube.com/embed/4KjYNuNBOBg', 
			   '{"tt":"", "fbk":"lola la comelola", "igrm":"@lola_en_insta", "phn":"787 249 0002"}', 
			   ARRAY['bob302a.jpg', 'bob302b.jpg', 'bob302c.jpg'],
			   '{"lun":"12 a 5pm", "mar":"no trabajo los martes", "mier":"10pm-1am", "jue":"5am-1pm", "vier":"10:30am a 2pm", "sab":"desde 9pm", "dom":"hasta las 15"}',
			   ARRAY['repostera', 'baker', 'panadera', 'dulces', 'postres'],
			   ARRAY['ponce', 'coamo', 'sabana grande'],
			   false
);

INSERT INTO micro_empre
	    (nombre, revisado, video_url, quien_social_handle, quien_foto_src, cuando, que, donde, a_tu_casa) 
		VALUES('lola dona', '2010-07-25',
			   'https://www.youtube.com/embed/4KjYNuNBOBg', 
			   '{"tt":"", "fbk":"lola la comelola", "igrm":"@lola_en_insta", "phn":"787 249 0002"}', 
			   ARRAY['bob302a.jpg', 'bob302b.jpg', 'bob302c.jpg'],
			   '{"lun":"12 a 5pm", "mar":"no trabajo los martes", "mier":"10pm-1am", "jue":"5am-1pm", "vier":"10:30am a 2pm", "sab":"desde 9pm", "dom":"hasta las 15"}',
			   ARRAY['repostera', 'baker', 'panadera', 'dulces', 'postres'],
			   ARRAY['ponce', 'coamo', 'sabana grande'],
			   false
);

SELECT quien_social_handle FROM micro_empre;

SELECT cuando FROM micro_empre;

SELECT quien_foto_src, que, donde FROM micro_empre;

SELECT micro_empre_id, nombre, revisado, a_tu_casa FROM micro_empre;

UPDATE micro_empre SET revisado='2010-01-01' WHERE nombre='lola dona';




INSERT INTO micro_empre
	    (micro_empre_id, nombre, video_url, quien_social_handle, quien_foto_src, cuando, que, donde, a_tu_casa) 
		VALUES(2, 'chucho landscaping',
			   'https://www.youtube.com/embed/0Uk5kZ5k0vY', 
			   '{"tt":"@granchucho", "fbk":"chucho de jayuya", "igrm":"", "phn":"787 222 0003"}', 
			   ARRAY['bob303a.jpg', 'bob303b.jpg'],
			   '{"lun":"no creo, llama", "mar":"quiza", "mier":"todito el dia", "jue":"3pm-11pm", "vier":"si no llueve", "sab":"desde 9am", "dom":"24hrs"}',
			   ARRAY['pica grama', 'corta grama', 'tumba yerba', 'limpio patios', 'trimeo palos'],
			   ARRAY['moca', 'las marias', 'mayaguez'],
			   true
);


UPDATE micro_empre SET micro_empre_id=4 WHERE micro_empre_id=3;

UPDATE micro_empre SET micro_empre_id=3 WHERE micro_empre_id=2;

UPDATE micro_empre SET micro_empre_id=2 WHERE micro_empre_id=4;


SELECT setval('micro_empre_micro_empre_id_seq', 4, false);

SELECT micro_empre_id, quien_social_handle, quien_foto_src FROM micro_empre;

SELECT currval('micro_empre_micro_empre_id_seq');

SELECT nextval('micro_empre_micro_empre_id_seq');




INSERT INTO micro_empre
	    (nombre, video_url, quien_social_handle, quien_foto_src, cuando, que, donde, a_tu_casa) 
		VALUES('papito el bello : car washer', 
			   'https://www.youtube.com/embed/L0eIqLvZlz8', 
			   '{"tt":"@papito-carwasher", "fbk":"papito limpia carro", "igrm":"@papitoWasher_en_insta", "phn":"787 249 4005"}', 
			   ARRAY['bob305a.jpg'],
			   '{"lun":"si me levanto", "mar":"texteame a ver", "mier":"10pm-4am", "jue":"si hay agua", "vier":"12:30am a 5pm", "sab":"desde 9pm", "dom":"por la tarde"}',
			   ARRAY['limpia carro', 'brilla carro', 'vaccum car cleaner', 'car detailing', 'lava carro'],
			   ARRAY['yauco', 'santa isabel', 'sabana grande'],
			   true
);

SELECT micro_empre_id, cuando FROM micro_empre;

SELECT micro_empre_id, que, donde FROM micro_empre;
 	
	
	
INSERT INTO micro_empre
	    (nombre, video_url, quien_social_handle, quien_foto_src, cuando, que, donde, a_tu_casa) 
		VALUES('luis y cheo foto shopeo', 
			   'https://www.youtube.com/embed/nSYT367zBUI', 
			   '{"tt":"@luis-cheo", "fbk":"cheo luis foto shopeo", "igrm":"@luis_cheo_en_insta", "phn":"787 222 5606"}', 
			   ARRAY['bob306a.jpg', 'bob306b.jpg'],
			   '{"lun":"nos amanecemos", "mar":"quiza", "mier":"toda la noche", "jue":"3pm pa lante", "vier":"si tenemos luz", "sab":"3er turno", "dom":"24hrs"}',
			   ARRAY['profile picture photoshop', 'photoshop pictures', 'foto shopeo imagenes', 'caricaturas basada en foto', 'experto dibujo digital'],
			   ARRAY['new york', 'orlando', 'bayamon'],
			   false
);

SELECT quien_social_handle->'tt' FROM micro_empre WHERE micro_empre_id=6;

SELECT quien_social_handle->>'tt' FROM micro_empre WHERE micro_empre_id=6;

UPDATE micro_empre SET 	quien_social_handle->'tt' = '"@luisYcheo"' WHERE micro_empre_id=6;


UPDATE micro_empre SET quien_foto_src = ARRAY['4a.jpg', '4b.jpg', '4c.jpg', '4d.jpg'] WHERE micro_empre_id = 4;