CREATE TABLE  IF NOT EXISTS usuario(
	usuario_id   SERIAL  PRIMARY KEY,
	username   VARCHAR (64)  NOT NULL  UNIQUE,
	password   VARCHAR (64)  NOT NULL, 
	last_log   DATE  CHECK(last_log > '2009-12-31')   
);
ALTER TABLE usuario ALTER COLUMN last_log SET DEFAULT '2010-01-01';

 
INSERT INTO usuario(username, password, last_log) VALUES('tito', '1111', '1999-04-29');

INSERT INTO usuario(username, password, last_log) VALUES('lola', '2222', '2009-12-31');

INSERT INTO usuario(username, password, last_log) VALUES('tito', '1111', CURRENT_DATE);


INSERT INTO usuario(username, password, last_log) VALUES('lola', '2222', '2010-01-02');

SELECT * FROM usuario;

SELECT usuario_id FROM usuario WHERE usuario_id IS NULL;

INSERT INTO usuario(usuario_id, username, password, last_log) VALUES(4, 'papito', '4444', '2010-01-04');

UPDATE usuario SET last_log = '2010-01-02' WHERE usuario_id=2;

UPDATE usuario SET last_log = '2010-01-06' WHERE usuario_id=6;

INSERT INTO usuario(usuario_id, username, password) VALUES(3, 'chucho', '3333');

INSERT INTO usuario(usuario_id, username, password) VALUES(5, 'luis', '5555');

INSERT INTO usuario(usuario_id, username, password, last_log) VALUES(1, 'cheo', '6666', CURRENT_DATE);

UPDATE usuario SET last_log=CURRENT_DATE;

INSERT INTO usuario(usuario_id, username, password) VALUES(5, 'luis', '5555');

INSERT INTO usuario(username, password) VALUES('luis', '5555');




SELECT currval('usuario_usuario_id_seq');

SELECT setval('usuario_usuario_id_seq', 7);