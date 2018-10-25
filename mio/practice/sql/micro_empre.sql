CREATE TABLE micro_empre (
	numero_de_admins   SMALLINT  NOT NULL  CHECK(numero_de_admins>0)
	
    micro_empre_id   SERIAL  PRIMARY KEY,
	nombre   VARCHAR (64)  NOT NULL,
	revisado   DATE  CHECK(revisado > '2009-12-31') NOT NULL, 
	video_url   VARCHAR (64)  NOT NULL,
	quien_social_handle json NOT NULL, 
	quien_foto_src VARCHAR(64) []  NOT NULL, 
	cuando json  NOT NULL,
	que VARCHAR(64) []  NOT NULL, 
	donde VARCHAR(64) []  NOT NULL, 
	a_tu_casa boolean
);