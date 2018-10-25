CREATE TABLE bregando WITH OWNER=victordbu (
	usuario_id   INT  NOT NULL,
	micro_empre_id   INT  NOT NULL,
	FOREIGN KEY (usuario_id)     REFERENCES usuario(usuario_id),
	FOREIGN KEY (micro_empre_id) REFERENCES micro_empre(micro_empre_id)
) ;