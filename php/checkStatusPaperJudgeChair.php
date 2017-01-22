<?php

$docJudgment = file_get_contents('../json/documentJudgmentChairs.json');
$docJudgment = json_decode($docJudgment, true);
$urlDoc = $_POST['urlDocument']; 
$user = $_POST['usermail'];
$result = "";
$bool= false;
foreach ($docJudgment as $field => $value) {
    if (strpos(json_encode($field), $urlDoc) != false) {
        $bool = true;
    }
}
if ($bool) {
    foreach ($docJudgment as $field => $value) {
        if (strpos($field, $urlDoc) !== false) {
            if (count($value["accepted"]) == 1 ) {
                $result = "accepted";
            } else if (count($value["rejected"]) == 1) {
                $result = "rejected";
            }  
        }
    }
}else{
    $result = "notJudgement";
}
echo $result;
?>