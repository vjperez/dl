<?php
//updates nepe donde and que parts

function getOrCreateToBeIds($tableName, $frasesArr, $cnx){
	$queryIsAlreadyFrase = "SELECT id FROM " . $tableName . " WHERE frase=$1";
	pg_prepare($cnx, "preparadoQueryIsAlreadyFrase", $queryIsAlreadyFrase);
	
	$queryInsertFrase = "INSERT INTO " . $tableName . " (frase, " . $tableName . "_vector) VALUES ($1, to_tsvector('spanish', $1)) RETURNING id";
	pg_prepare($cnx, "preparadoQueryInsertFrase", $queryInsertFrase);
	
	$toBeIds = array();
	foreach($frasesArr as $frase){
		$recurso = pg_execute($cnx, "preparadoQueryIsAlreadyFrase", array($frase));
		if($recurso){
			if( $fila = pg_fetch_row($recurso) ){
				array_push($toBeIds, $fila[0]);
			}else{
				$recurso = pg_execute($cnx, "preparadoQueryInsertFrase", array($frase));
				if($recurso){
					$fila = pg_fetch_row($recurso);
					array_push($toBeIds, $fila[0]);
				}else{
					pg_close($cnx);
					throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryInsertFrase en: ' . __FILE__ );
				}
			}
		}else{
			pg_close($cnx);
			throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryIsAlreadyFrase en: ' . __FILE__ );
		}
	}
	return $toBeIds;
}



function getCurrentIds($tableName, $nepe_id, $cnx){
	$queryGetIds = "SELECT " . $tableName . "_id FROM nepe_" . $tableName . " WHERE nepe_id=$1";
	pg_prepare($cnx, "preparadoQueryGetCurrentIds", $queryGetIds);
	
	$recurso = pg_execute($cnx, "preparadoQueryGetCurrentIds", array($nepe_id));
	if($recurso){
		$ids = pg_fetch_row($recurso);
		return $ids;
	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryGetCurrentIds en: ' . __FILE__ );
	}
}



function makeAndRemoveLinks($tableName, $nepe_id, $cnx){
	
	$queryAddLink = "INSERT INTO nepe_" . $tableName . " (" . $tableName . "_id, nepe_id, creado) VALUES($1, $2, NOW()::date)";
	pg_prepare($cnx, "preparadoQueryAddLink", $queryAddLink);	
	foreach($toBeIdsArr as $toBeId){
		if(in_array($toBeId, $areIdsArr, true)){
			continue;
		}else{//make link
			$recurso = pg_execute($cnx, "preparadoQueryAddLink", array($toBeId, $nepe_id));
			if($recurso){ ;
			}else{
				pg_close($cnx);
				throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryAddLink en: ' . __FILE__ );
			}
		}
	}   //foreach
	
	
	$queryGetCount = "SELECT COUNT(" . $tableName . "_id) FROM nepe_" . $tableName . " WHERE " . $tableName . "_id=$1 GROUP BY " . $tableName . "_id";
	pg_prepare($cnx, "preparadoQueryGetCount", $queryGetCount);
	$queryRemoveLink = "DELETE FROM nepe_" . $tableName . " WHERE " . $tableName . "_id=$1 AND nepe_id=$2";
	pg_prepare($cnx, "preparadoQueryRemoveLink", $queryRemoveLink);
	$queryRemoveQueDonde = "DELETE FROM " . $tableName . " WHERE id=$1";
	pg_prepare($cnx, "preparadoQueryRemoveQueDonde", $queryRemoveQueDonde);
	foreach($areIdsArr as $isId){
		if(in_array($isId, $toBeIdsArr, true)){
			continue;
		}else{//either remove link     OR    remove que-donde, if this was the last(only) link to it
			$recurso = pg_execute($cnx, "preparadoQueryGetCount", array($isId));
			if($recurso){
				$countFila = pg_fetch_row($recurso);
				$count = $countFila[0];
				if($count === 1){// remove que-donde, ON DELETE CASCADE on PostgreSql should remove link as well
					$recurso = pg_execute($cnx, "preparadoQueryRemoveQueDonde", array($isId));
					if($recurso){ ;
					}else{
						pg_close($cnx);
						throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryRemoveQueDonde en: ' . __FILE__ );
					}
				}else{ // remove link only
					$recurso = pg_execute($cnx, "preparadoQueryRemoveLink", array($isId, $nepe_id));
					if($recurso){ ;
					}else{
						pg_close($cnx);
						throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryRemoveLink en: ' . __FILE__ );
					}					
				}
			}else{
				pg_close($cnx);
				throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryGetCount en: ' . __FILE__ );
			}	
		}
	}   //foreach
	
}
?>