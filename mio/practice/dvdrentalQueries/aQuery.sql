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
SELECT address
FROM address LEFT JOIN customer ON customer.address_id = address.address_id
			WHERE customer_id ISNULL;