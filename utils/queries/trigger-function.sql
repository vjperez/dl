CREATE OR REPLACE FUNCTION  update_nombrevector_after_update()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
AS
$$
BEGIN
  IF(NEW.nombre <> OLD.nombre) then
    UPDATE nepe set nombre_vector =  to_tsvector('spanish', NEW.nombre) where id=NEW.id ;
  END IF; 
   RETURN NEW;
END;
$$


CREATE TRIGGER after_insert_nombre_trigger
AFTER UPDATE  ON nepe
FOR EACH ROW
EXECUTE FUNCTION crea_nombrevector_after_insert();




CREATE OR REPLACE FUNCTION  crea_dondevector_after_insert()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
AS
$$
BEGIN     
  UPDATE donde set donde_vector = to_tsvector('spanish', NEW.frase) where id=NEW.id;     
  RETURN NEW; 
END;
$$


CREATE TRIGGER after_insert_frase_trigger
AFTER INSERT  ON que
FOR EACH ROW
EXECUTE FUNCTION crea_quevector_after_insert();