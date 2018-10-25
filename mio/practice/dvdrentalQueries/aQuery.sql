SELECT title FROM film WHERE description LIKE '%ySQL%';

SELECT customer_id, sum(amount)        FROM payment      GROUP BY customer_id     HAVING sum(amount) > 150   ORDER BY sum(amount);

SELECT customer_id, count(store_id)    FROM customer     GROUP BY customer_id     ORDER BY count(store_id);

SELECT store_id, count(customer_id)    FROM customer     GROUP BY store_id        ORDER BY count(customer_id);

SELECT store_id, count(customer_id)    FROM customer     GROUP BY store_id        HAVING count(customer_id) > 300       ORDER BY count(customer_id);

SELECT customer_id, count(payment_id)    FROM payment     GROUP BY customer_id      ORDER BY count(payment_id)  DESC;

SELECT customer.customer_id, first_name, last_name,  count(payment_id)     FROM payment JOIN customer ON customer.customer_id = payment.customer_id   
		GROUP BY customer.customer_id      ORDER BY count(payment_id)  DESC;
		
SELECT first_name, last_name, amount     FROM payment INNER JOIN customer ON customer.customer_id = payment.customer_id   
        ORDER BY first_name, last_name  DESC;


SELECT c1.customer_id, c2.customer_id, c1.first_name, c2.first_name FROM customer c1 INNER JOIN customer c2 ON c1.customer_id < c2.customer_id 
		WHERE c1.first_name = c2.first_name;

		
SELECT c1.customer_id, c2.customer_id, c1.first_name, c2.first_name FROM customer c1 INNER JOIN customer c2 ON c1.customer_id < c2.customer_id 
		WHERE c1.first_name = c2.first_name     ORDER BY  c1.customer_id, c2.customer_id; 
		

		
SELECT amount, payment_date FROM payment;

SELECT count(payment_id) FROM payment;


SELECT count(payment_id) FROM payment   HAVING count(payment_id)> 5000;
			
		
		
SELECT customer.first_name, amount, staff.first_name, payment_date
FROM payment INNER JOIN customer ON customer.customer_id = payment.customer_id
             INNER JOIN staff    ON staff.staff_id       = payment.staff_id;
			 
			 
SELECT  count(payment_id)
FROM payment INNER JOIN customer ON customer.customer_id = payment.customer_id
             INNER JOIN staff    ON staff.staff_id       = payment.staff_id;
			 
			 
SELECT  count(payment_id)
FROM payment INNER JOIN customer ON customer.customer_id = payment.customer_id
             INNER JOIN staff    ON staff.staff_id       = payment.staff_id
			 HAVING count(payment_id)> 5000;
			 

			 
			 
//customer that have made no payment			 
SELECT first_name, last_name			 
FROM payment RIGHT JOIN customer ON customer.customer_id = payment.customer_id
			 WHERE payment_id ISNULL;
			 
			 
			 
//staff that have processed no payment	
SELECT first_name, last_name			 
FROM staff LEFT JOIN payment ON staff.staff_id = payment.staff_id
			 WHERE payment_id ISNULL;
			 

//payment processed by nobody(null) ; impossible because of constrains ; and illegal :)
SELECT payment_id			 
FROM staff RIGHT JOIN payment ON staff.staff_id = payment.staff_id
			 WHERE payment.staff_id ISNULL;
			
//payment processed by nobody(null) ; impossible because of constrains ; and illegal :)			
SELECT payment_id FROM  payment  WHERE staff_id ISNULL;



//films on No inventory  ;  every value on the 'right' is null still the common value returns TRUE for film.film_id = inventory.film_id
SELECT film.film_id, inventory.film_id, title, inventory_id, store_id, inventory.last_update
FROM film   LEFT JOIN  inventory ON  film.film_id = inventory.film_id
			WHERE inventory_id ISNULL; 
			

//address where no customer lives in  
//on left joins, even when when every customer value is NULL, the address is 'equal' for join purposes
//i guess thats the whole idea of a left and right join 
SELECT address.address_id, customer.address_id, address
FROM address LEFT JOIN customer ON customer.address_id = address.address_id
			WHERE customer_id ISNULL;
			
			
			
//smallint type used on customer.address_id but integer used on address.address_id
//you get no rows, but not for the reason above.  The reason is the extra column last update.		
SELECT   first_name, address  FROM address NATURAL JOIN customer;
//same thing here
SELECT   country, city        FROM country NATURAL JOIN city;

//this join works, because last update is not used in the join here 
SELECT   first_name, address  FROM address INNER JOIN customer ON customer.address_id = address.address_id;
SELECT   country, city        FROM country INNER JOIN city     ON country.country_id  = city.country_id     ORDER BY country;


//customer living in store addresses ;  
SELECT customer_id, first_name FROM customer WHERE address_id IN 
			(SELECT address_id FROM store);

//customer living in store addresses ;  
SELECT customer_id, first_name FROM customer WHERE address_id IN 
			(SELECT address_id FROM store);
			
SELECT store_id, count(customer_id) FROM customer GROUP BY store_id;

INSERT INTO customer (store_id, first_name, last_name, email, address_id) VALUES(2, 'DON VICTOR', 'Perez', 'algo at emilio', 28);

SELECT first_name FROM customer WHERE address_id=28;

SELECT count(customer_id) FROM customer WHERE  first_name='Krystal';


UPDATE  store  SET  last_update = '2018-04-29 05:00:00';
			


