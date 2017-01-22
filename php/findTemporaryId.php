<?php
$doc = $_POST['urlDoc'];
$user = $_POST['user'];
$lastValue = -1;

if(file_exists('../annotations/'.$doc.'/id.json')){
    $FileId = file_get_contents('../annotations/'.$doc.'/id.json');
    $FileId= json_decode($FileId, true);
    if($FileId !== null){
    foreach($FileId as $field =>$key) {
        $lastValue = $field;
    }
    }
}
echo $lastValue + 1;
?>