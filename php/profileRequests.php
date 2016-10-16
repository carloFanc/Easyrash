<?php
$dataFirstJson = file_get_contents ('../json/listUsers.json');
$FirstJson = json_decode($dataFirstJson, true);
$dati = $_POST['dati'];
echo $dati; 

/*foreach ($FirstJson as $field => $value) { 

if(strpos($field, $UserEmail)!== false){

	var_dump($field);
		}
	}
*/
?>
