<?php

$docJudgment = file_get_contents('../json/documentJudgmentReviewers.json');
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

if ($bool) {
    foreach ($docJudgment as $field => $value) {
        if (strpos($field, $urlDoc) !== false) {
            if($eval === "accepted"){
            array_push($value["accepted"], $user);
            $docJudgment[$field]['accepted'] = $value["accepted"];
            }else{
            array_push($value["rejected"], $user);
            $docJudgment[$field]['rejected'] = $value["rejected"];
            }
        }
    }
    $file = fopen('../json/documentJudgmentReviewers.json', 'w');
    fwrite($file, json_encode($docJudgment, JSON_PRETTY_PRINT));
    fclose($file);
} else {
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
    $file = fopen('../json/documentJudgmentReviewers.json', 'w');
    fwrite($file, $FinalJsonDoc);
    fclose($file);

}
?>