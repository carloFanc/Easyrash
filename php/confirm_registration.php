<?php
$UserEmail = $_GET['email'];

$dataFirstJson = file_get_contents ('../json/listUsers.json');
$dataSecondJson = file_get_contents ('../json/temp_users.json');
$FirstJson = json_decode($dataFirstJson, true);
$SecondJson = json_decode($dataSecondJson, true); 
$JsonRecovered='';
foreach ($SecondJson as $field => $value) { 
	 

	if(strpos($field, $UserEmail)!== false){
		 
		unset($SecondJson[$field]);
	 
    $JsonRecovered .= '{"'. $field.'":{';
    $counter = 0;
	foreach ($value as $key=>$value2) {
		if($counter!=4){

          $JsonRecovered .= '"'.$key.'": "'.$value2.'",';

          }else{
          	$JsonRecovered .= '"'.$key.'": "'.$value2.'"}}';
          }
          $counter++;
		}
	}
	}
	$JsonRecoveredArray=json_decode($JsonRecovered,true); 
    $merge = array_merge( $FirstJson,$JsonRecoveredArray);
     
 $FirstJson = json_encode($merge, JSON_PRETTY_PRINT);
 $SecondJson = json_encode($SecondJson,JSON_PRETTY_PRINT);

  if (json_decode($SecondJson) != null)
           {
             $file = fopen('../json/temp_users.json','w');
             fwrite($file, $SecondJson);
             fclose($file);
           }
  if (json_decode($FirstJson) != null)
           {
             $file = fopen('../json/listUsers.json','w');
             fwrite($file, $FirstJson);
             fclose($file);
           }  
echo '<script language="javascript">';
echo 'alert("Registrazione Confermata.Torna alla pagina del login!")';
echo '</script>';
?>