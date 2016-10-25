<?php

$dataEvents = file_get_contents('../json/events.json');
$dataEvents = json_decode($dataEvents, true);
$titleDoc = $_POST['titledoc'];
 
foreach ($dataEvents as $field => $value) {
    for($i=0; $i < count($value);$i++){
                for ($j = 0; $j < count($value[$i]["submissions"]); $j++) {
                        if(strcmp($value[$i]["submissions"][$j]["title"],$titleDoc)==0){
                            $urlDoc = $value[$i]["submissions"][$j]["url"];
                        } 
                         
                    }
                
    }
            
            }
echo $urlDoc;

?>