http://www.postgresqltutorial.com/postgresql-having/


dvdrental=# SELECT  count(payment_id), sum(amount)  FROM payment    HAVING count(payment_id) > 14595;
 count | sum
-------+-----
(0 rows)


dvdrental=# SELECT  count(payment_id), sum(amount)  FROM payment    HAVING count(payment_id) > 14594;
 count |   sum
-------+----------
 14595 | 61312.04
(1 row)