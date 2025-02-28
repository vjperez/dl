SELECT
    id, nombre, (now()::date - revisado) as dias 
FROM nepe
WHERE ((now()::date - revisado) <  3)
order by dias asc;