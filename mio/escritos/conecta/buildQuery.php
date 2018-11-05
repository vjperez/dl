<?php
//Othe way to query array
//$query = 'SELECT micro_empre_id, que FROM micro_empre WHERE que @> ARRAY['payaso']::varchar[]';

$queries[1] = "SELECT quien_foto_src, micro_empre_id FROM micro_empre 
			WHERE '$queLiteralStr' = ANY(que)
			AND '$dondeLiteralStr' = ANY(donde)";
			
$queries[2] = "SELECT quien_foto_src, micro_empre_id FROM micro_empre 
			WHERE '$queLiteralStr' = ANY(que)";
			
$queries[3] = "SELECT quien_foto_src, micro_empre_id FROM micro_empre 
			WHERE '$dondeLiteralStr' = ANY(donde)";
?>