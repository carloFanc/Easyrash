<?php

$docJudgment = file_get_contents('../json/documentJudgmentReviewers.json');
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
            if (in_array($user, $value["accepted"])) {
                $result = "accepted";
            } else if (in_array($user, $value["rejected"])) {
                $result = "rejected";
            } else {
                $result = "undefined";
            }
        }
    }
}else{
    $result = "undefined";
}
echo $result;
?>