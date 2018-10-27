CREATE TABLE IF NOT EXISTS bregando (
	usuario_id   INT  NOT NULL,
	micro_empre_id   INT  NOT NULL,
	FOREIGN KEY (usuario_id)     REFERENCES usuario(usuario_id),
	FOREIGN KEY (micro_empre_id) REFERENCES micro_empre(micro_empre_id)
) ;
ALTER TABLE IF EXISTS bregando ADD COLUMN IF NOT EXISTS bregando_id SERIAL  PRIMARY KEY;



SELECT * FROM usuario;
SELECT micro_empre_id, nombre FROM micro_empre;

INSERT INTO bregando(usuario_id, micro_empre_id) VALUES(7, 1);
INSERT INTO bregando(usuario_id, micro_empre_id) VALUES(1, 7);

INSERT INTO bregando(usuario_id, micro_empre_id) VALUES(1, 1);
INSERT INTO bregando(usuario_id, micro_empre_id) VALUES(2, 2);
INSERT INTO bregando(usuario_id, micro_empre_id) VALUES(3, 3);
INSERT INTO bregando(usuario_id, micro_empre_id) VALUES(4, 4);
INSERT INTO bregando(usuario_id, micro_empre_id) VALUES(4, 5);
INSERT INTO bregando(usuario_id, micro_empre_id) VALUES(5, 6);
INSERT INTO bregando(usuario_id, micro_empre_id) VALUES(6, 6);

SELECT * FROM bregando;

//SETTING NUMBER OF admins for bussiness 6
UPDATE micro_empre SET numero_de_admins = 2 WHERE micro_empre_id = 6;
SELECT numero_de_admins FROM micro_empre;



//who manages bussiness 1
SELECT username FROM usuario WHERE usuario_id = 
		(SELECT usuario_id   FROM bregando 	WHERE micro_empre_id = 1);

//who manages bussiness 6   ; cannot use = here, use IN.  Multiple admins.
SELECT username FROM usuario WHERE usuario_id IN 
		(SELECT usuario_id   FROM bregando 	WHERE micro_empre_id = 6);




//who manages a bussines which name is exactly 'lola dona'
SELECT username FROM usuario WHERE usuario_id = 
		(SELECT usuario_id   FROM bregando 	WHERE micro_empre_id = 
		(SELECT micro_empre_id FROM micro_empre 	WHERE nombre = 'lola dona'));

//who manages a bussines with 'foto' on its name
SELECT username FROM usuario WHERE usuario_id IN 
		(SELECT usuario_id   FROM bregando 	WHERE micro_empre_id IN 
		(SELECT micro_empre_id FROM micro_empre 	WHERE nombre iLIKE '%FoTo%'));







//is any of the admins of 'tito el barbero' the admin of any other bussines?  
SELECT nombre FROM micro_empre WHERE micro_empre_id IN (SELECT micro_empre_id FROM bregando WHERE usuario_id IN (SELECT usuario_id FROM bregando WHERE micro_empre_id IN (SELECT micro_empre_id FROM micro_empre 	WHERE nombre = 'tito el barbero')));


//which 'tito el barbero' admin has any other bussiness
SELECT username from usuario
WHERE usuario_id 
IN (SELECT usuario_id FROM bregando WHERE micro_empre_id IN (SELECT micro_empre_id FROM micro_empre 	WHERE nombre = 'tito el barbero'))
AND 
usuario_id 
IN (SELECT usuario_id FROM bregando WHERE micro_empre_id IN (SELECT micro_empre_id FROM micro_empre 	WHERE nombre != 'tito el barbero'));


//which 'tito el barbero' admin has no other bussiness
SELECT username from usuario
WHERE usuario_id 
IN (SELECT usuario_id FROM bregando WHERE micro_empre_id IN (SELECT micro_empre_id FROM micro_empre 	WHERE nombre = 'tito el barbero'))
AND 
usuario_id 
NOT IN (SELECT usuario_id FROM bregando WHERE micro_empre_id IN (SELECT micro_empre_id FROM micro_empre 	WHERE nombre != 'tito el barbero'));


//is any of the admins of 'papito el bello : car washer' the admin of any other bussines?
SELECT nombre FROM micro_empre WHERE micro_empre_id IN (SELECT micro_empre_id FROM bregando WHERE usuario_id IN (SELECT usuario_id FROM bregando WHERE micro_empre_id IN (SELECT micro_empre_id FROM micro_empre 	WHERE nombre = 'papito el bello : car washer')));

//which 'papito el bello : car washer' admin has any other bussiness


//busssiness of username chucho


//busssiness of username papito


//does lola has any bussiness with coadmins ;  in what busssiness is lola a coadmin?


//does cheo has any bussiness with coadmins

