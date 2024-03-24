<?php
//updates nepe donde and que parts

function prepareToBeIdsQueries($tableName, $cnx){
	$queryIsAlreadyFrase = "SELECT id FROM " . $tableName . " WHERE frase=$1";
	pg_prepare($cnx, "preparadoQueryIsAlready" . $tableName . "Frase", $queryIsAlreadyFrase);
	$queryInsertFrase = "INSERT INTO " . $tableName . " (frase)  VALUES  ( cast($1 as varchar) )  RETURNING id";
	pg_prepare($cnx, "preparadoQueryInsert" . $tableName . "Frase", $queryInsertFrase);
}
function getOrCreateToBeIds($tableName, $frasesArr, $cnx){
	$toBeIds = array();
	foreach($frasesArr as $frase){
		if(is_null($frase)) continue;  //ignore empty 'frases' values from user
		$recurso = pg_execute($cnx, "preparadoQueryIsAlready" . $tableName . "Frase", array($frase));
		if($recurso){
			if( $fila = pg_fetch_row($recurso) ){
				array_push($toBeIds, $fila[0]);
			}else{
				$recurso = pg_execute($cnx, "preparadoQueryInsert" . $tableName . "Frase", array($frase));
				if($recurso){
					$fila = pg_fetch_row($recurso);
					array_push($toBeIds, $fila[0]);
				}else{
					pg_close($cnx);
					throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryInsert' . $tableName . 'Frase en: ' . __FILE__ );
				}
			}
		}else{
			pg_close($cnx);
			throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryIsAlready' . $tableName . 'Frase en: ' . __FILE__ );
		}
	}
	return $toBeIds;
}


function prepareCurrentIdsQueries($tableName, $cnx){
	$queryGetIds = "SELECT " . $tableName . "_id FROM nepe_" . $tableName . " WHERE nepe_id=$1";
	pg_prepare($cnx, "preparadoQueryGetCurrent" . $tableName . "Ids", $queryGetIds);
}
function getCurrentIds($tableName, $nepe_id, $cnx){
	$areIds = array();	
	$recurso = pg_execute($cnx, "preparadoQueryGetCurrent" . $tableName . "Ids", array($nepe_id));
	if($recurso){
		while($fila = pg_fetch_row($recurso)){
			array_push($areIds, $fila[0]);
		}
	}else{
		pg_close($cnx);
		throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryGetCurrent' . $tableName . 'Ids en: ' . __FILE__ );
	}
	return $areIds;
}


function prepareMakeRemoveQueries($tableName, $cnx){
	//insert - prepared queries
	$queryAddLink = "INSERT INTO nepe_" . $tableName . " (" . $tableName . "_id, nepe_id, creado) VALUES($1, $2, NOW()::date)";
	pg_prepare($cnx, "preparadoQueryAdd" . $tableName . "Link", $queryAddLink);
	//remove - prepared queries
	$queryGetCount = "SELECT COUNT(nepe_id) FROM nepe_" . $tableName . " WHERE " . $tableName . "_id=$1 GROUP BY " . $tableName . "_id";
	pg_prepare($cnx, "preparadoQueryGet" . $tableName . "Count", $queryGetCount);
	$queryRemoveLink = "DELETE FROM nepe_" . $tableName . " WHERE " . $tableName . "_id=$1 AND nepe_id=$2";
	pg_prepare($cnx, "preparadoQueryRemove" . $tableName . "Link", $queryRemoveLink);
	$queryRemoveQueDonde = "DELETE FROM " . $tableName . " WHERE id=$1";
	pg_prepare($cnx, "preparadoQueryRemove" . $tableName, $queryRemoveQueDonde);
}
function makeAndRemoveLinks($tableName, $nepe_id, $areIdsArr, $toBeIdsArr, $cnx){	
	//insert - foreach loop
	foreach($toBeIdsArr as $toBeId){
		if(in_array($toBeId, $areIdsArr, true)){
			continue;
		}else{//make link
			$recurso = pg_execute($cnx, "preparadoQueryAdd" . $tableName . "Link", array($toBeId, $nepe_id));
			if($recurso){ 
				//a user could send the same toBeId on same request, 
				//if it is a toBeId already in areIdsArr, this insert query will not run anyway
				//BUT the push avoids trying to add link twice when it is sent multiple times 
				//and was not already in areIdsArr
				array_push($areIdsArr, $toBeId);
			}else{
				pg_close($cnx);
				throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryAdd' . $tableName . 'Link en: ' . __FILE__ );
			}
		}
	}//foreach
	//remove - foreach loop
	foreach($areIdsArr as $isId){
		if(in_array($isId, $toBeIdsArr, true)){
			continue;
		}else{//either remove link     OR    remove que-donde, if this was the last(only) link to it
			$recurso = pg_execute($cnx, "preparadoQueryGet" . $tableName . "Count", array($isId));
			if($recurso){
				$countFila = pg_fetch_row($recurso);
				$count = intval($countFila[0]);
				if($count === 1){// remove que-donde, ON DELETE CASCADE on PostgreSql should remove link as well
					$recurso = pg_execute($cnx, "preparadoQueryRemove" . $tableName, array($isId));
					if($recurso){ ;
					}else{
						pg_close($cnx);
						throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryRemove' . $tableName . ' en: ' . __FILE__ );
					}
				}else{ // remove link only
					$recurso = pg_execute($cnx, "preparadoQueryRemove" . $tableName . "Link", array($isId, $nepe_id));
					if($recurso){ ;
					}else{
						pg_close($cnx);
						throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryRemove' . $tableName . 'Link en: ' . __FILE__ );
					}					
				}
			}else{
				pg_close($cnx);
				throw new Exception('Mal query.  Sin RECURSO, para preparadoQueryGet' . $tableName . 'Count en: ' . __FILE__ );
			}	
		}//else
	}   //foreach
}//function
?>