SELECT
	que.frase
FROM nepe_que left JOIN que
	ON nepe_que.que_id = que.id	
WHERE nepe_que.nepe_id = -2147483648;

