<?php

$docJudgment = file_get_contents('../json/documentJudgmentChairs.json');
$docJudgment = json_decode($docJudgment, true);
$urlDoc = $_POST['urlDoc'];
$eval = $_POST['eval'];
$user = $_POST['user'];
$bool = false; 


foreach ($docJudgment as $field => $value) {
    if (strpos(json_encode($field), $urlDoc) != false) {
        $bool = true;
    }
}

if (!$bool) {
    if($eval === "accepted"){
    $string = '{"' . $urlDoc . '":{';
    $string .= '"accepted": ["'.$user.'"],"rejected": []}}';
    }else{
    $string = '{"' . $urlDoc . '":{';
    $string .= '"accepted": [],"rejected": ["'.$user.'"]}}';
    }
    $JsonDocAdd = json_decode($string, true);
    $merge = array_merge($docJudgment, $JsonDocAdd);
    $FinalJsonDoc = json_encode($merge, JSON_PRETTY_PRINT);
    $file = fopen('../json/documentJudgmentChairs.json', 'w');
    fwrite($file, $FinalJsonDoc);
    fclose($file);
echo true;
}
?>