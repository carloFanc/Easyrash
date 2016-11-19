<?php

$lockJson = file_get_contents('../json/lock.json');
$lockJson = json_decode($lockJson, true);
$lockResponse = $_POST['response'];
$url = $_POST['url'];
$bool = false;
if ($lockResponse == 1) { //Annotator Mode
    $string = '{"' . $url . '":{';
    $string .= '"lock": "' . $lockResponse . '"}}';
    foreach ($lockJson as $field => $value) {
        if (strpos(json_encode($field), $url) != false) {
            $bool = true;
            $CurrentLock = $value["lock"];
        }
    }
    if ($bool == false) {
        $JsonLock = json_decode($string, true);
        $merge = array_merge($lockJson, $JsonLock);
        $FinalJsonLock = json_encode($merge, JSON_PRETTY_PRINT);
        $file = fopen('../json/lock.json', 'w');
        fwrite($file, $FinalJsonLock);
        fclose($file);
        echo "success";
    } else {
        if ($CurrentLock == "0") {
            $JsonLock = json_decode($string, true);
            $merge = array_merge($lockJson, $JsonLock);
            $FinalJsonLock = json_encode($merge, JSON_PRETTY_PRINT);
            $file = fopen('../json/lock.json', 'w');
            fwrite($file, $FinalJsonLock);
            fclose($file);
            echo "success";
        } else if ($CurrentLock == "1") {
            echo "blocked";
        }
    }
} else { // Reader Mode
    foreach ($lockJson as $field => $value) {
        if (strpos(json_encode($field), $url) != false) {
            unset($lockJson[$field]);
            $string = '{"' . $url . '":{';
            $string .= '"lock": "' . $lockResponse . '"}}';
            $JsonLock = json_decode($string, true);
            $merge = array_merge($lockJson, $JsonLock);
            $FinalJsonLock = json_encode($merge, JSON_PRETTY_PRINT);
            $file = fopen('../json/lock.json', 'w');
            fwrite($file, $FinalJsonLock);
            fclose($file);
            echo "reader";
        }
    }
}
?>