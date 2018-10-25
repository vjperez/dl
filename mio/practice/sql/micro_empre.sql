CREATE TABLE micro_empre (
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