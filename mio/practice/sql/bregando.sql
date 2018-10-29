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

//SETTING NUMBER OF admins for bussiness 6
UPDATE micro_empre SET numero_de_admins = 2 WHERE micro_empre_id = 6;
SELECT numero_de_admins FROM micro_empre;


SELECT * FROM bregando;


// triple join for admin name and micro_empre name
SELECT username, nombre FROM bregando 
	INNER JOIN micro_empre ON bregando.micro_empre_id = micro_empre.micro_empre_id
	INNER JOIN usuario     ON bregando.usuario_id     = usuario.usuario_id;







//				SEARCHING FOR ADMINS				//

//who admins micro empre 1
SELECT username FROM usuario WHERE usuario_id = (SELECT usuario_id   FROM bregando 	WHERE micro_empre_id = 1);

//who admins micro empre 6   ; cannot use = here, use IN.  Multiple admins.
SELECT username FROM usuario WHERE usuario_id IN (SELECT usuario_id   FROM bregando 	WHERE micro_empre_id = 6);


//who admins a micro empre which name is exactly 'lola dona'
SELECT username FROM usuario WHERE usuario_id = 
		(SELECT usuario_id   FROM bregando 	WHERE micro_empre_id = 
		(SELECT micro_empre_id   FROM micro_empre   WHERE nombre = 
		'lola dona'));
//wont work when more than 1 micro_empre or more than 1 usuario


//who admins a micro empre with 'foto' on its name
SELECT username FROM usuario WHERE usuario_id IN 
		(SELECT usuario_id   FROM bregando 	WHERE micro_empre_id IN 
		(SELECT micro_empre_id   FROM micro_empre   WHERE nombre iLIKE 
		'%FoTo%'));


//an admin of 'tito el barbero' and at the same time, admins other micro empre
//try also with 'papito el bello : payaso' micro_empre
SELECT username from usuario
WHERE usuario_id IN 
		(SELECT usuario_id FROM bregando WHERE micro_empre_id IN (SELECT micro_empre_id FROM micro_empre 	WHERE nombre = 'tito el barbero'))
AND usuario_id IN 
		(SELECT usuario_id FROM bregando WHERE micro_empre_id IN (SELECT micro_empre_id FROM micro_empre 	WHERE nombre != 'tito el barbero'));

		
		
//an admin of 'tito el barbero', and has no other bussiness
SELECT username from usuario
WHERE usuario_id IN 
		(SELECT usuario_id FROM bregando WHERE micro_empre_id IN (SELECT micro_empre_id FROM micro_empre 	WHERE nombre = 'tito el barbero'))
AND usuario_id NOT IN 
		(SELECT usuario_id FROM bregando WHERE micro_empre_id IN (SELECT micro_empre_id FROM micro_empre 	WHERE nombre != 'tito el barbero'));




//related admins
SELECT username FROM usuario WHERE usuario_id IN 
		(SELECT usuario_id FROM bregando WHERE micro_empre_id IN 
		(SELECT micro_empre_id FROM bregando WHERE usuario_id = 
		(SELECT usuario_id FROM usuario WHERE username = 
		'tito')));







		
//				SEARCHING FOR MICRO EMPRES			//		

		
//micro emprees administered by the admins of any 'tito el barbero' ; with exact name
//micro emprees RELATED to a particular micro empre 
SELECT nombre FROM micro_empre WHERE micro_empre_id IN 
		(SELECT micro_empre_id FROM bregando WHERE usuario_id IN 
		(SELECT usuario_id FROM bregando WHERE micro_empre_id IN 
		(SELECT micro_empre_id FROM micro_empre 	WHERE nombre = 
		'tito el barbero')));

		




//micro empre(s) (0, 1, MANY) of admin with username chucho
SELECT nombre FROM micro_empre WHERE micro_empre_id IN
		(SELECT micro_empre_id FROM bregando WHERE usuario_id = 
		(SELECT usuario_id FROM usuario WHERE username = 
		'chucho'));

		
		
		
		
//micro empre(s) of lola that, at the same time, have other admins
//try with cheo for diferent result
SELECT nombre FROM micro_empre 
WHERE micro_empre_id IN
		(SELECT micro_empre_id FROM bregando WHERE usuario_id = (SELECT usuario_id FROM usuario WHERE username =  'lola'))
AND micro_empre_id IN
		(SELECT micro_empre_id FROM bregando WHERE usuario_id IN (SELECT usuario_id FROM usuario WHERE username != 'lola'));
		
		
		
//micro empre(s) of luis that, at the same time, have NO other admins ; ()
//try with tito for diferent result
SELECT nombre FROM micro_empre 
WHERE micro_empre_id IN
		(SELECT micro_empre_id FROM bregando WHERE usuario_id = (SELECT usuario_id FROM usuario WHERE username =  'luis'))
AND micro_empre_id NOT IN
		(SELECT micro_empre_id FROM bregando WHERE usuario_id IN (SELECT usuario_id FROM usuario WHERE username != 'luis'));