CREATE TABLE  IF NOT EXISTS usuario(
	usuario_id   SERIAL  PRIMARY KEY,
	username   VARCHAR (64)  NOT NULL  UNIQUE,
	password   VARCHAR (64)  NOT NULL, 
	last_log   DATE  CHECK(last_log > '2009-12-31')   
);
ALTER TABLE usuario ALTER COLUMN last_log SET DEFAULT '2010-01-01';

INSERT INTO usuario(username, password) VALUES('tito',   '1111');
INSERT INTO usuario(username, password) VALUES('lola',   '2222');
INSERT INTO usuario(username, password) VALUES('chucho', '3333');
INSERT INTO usuario(username, password) VALUES('papito', '4444');
INSERT INTO usuario(username, password) VALUES('luis',   '5555');
INSERT INTO usuario(username, password) VALUES('cheo',   '6666');
