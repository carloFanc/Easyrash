<?php

$dataEvents = file_get_contents('../json/events.json');
$dataEvents = json_decode($dataEvents, true);
$titleConference = $_POST['titleConference'];
$role = $_POST['role'];
$usermail = $_POST['usermail'];
$p = 0;

if (strcmp($role, "chair") == 0) { //CHAIR
    $test = "";
    $url = "";
    $i = 0;
    $stringFinalData = "";
    $index = 0;
    foreach ($dataEvents as $field123 => $value123) {
        for ($i = 0; $i < count($value123); $i++) {
            if (strpos(json_encode($value123[$i]["conference"]), $titleConference) !== false) {
                if (strpos(json_encode($value123[$i]["chairs"]), $usermail) !== false) {
                    for ($j = 0; $j < count($value123[$i]["submissions"]); $j++) {
                        $test[$j] = $value123[$i]["submissions"][$j]["title"];
                        $url[$j] = $value123[$i]["submissions"][$j]["url"];
                    }
                }
            }
        }
    }

    foreach ($test as $test1) { 
         $stringFinalData .= "<div class=\"panel-body\" id=\"id-body\"><a href='#' class=\"doc\" onclick='openDocumentSelect(\"$url[$index]\")'>\"" . $test1 . "</a></div>";
         $index++;
    }

    echo $stringFinalData;
} else if (strcmp($role, "reviewer") == 0) {//REVIEWER
  $test = "";
    $i = 0;
    $stringFinalData = "";
    $q=0;
    $url = "";
    $index = 0;
    foreach ($dataEvents as $field123 => $value123) {
        for ($i = 0; $i < count($value123); $i++) {
            if (strpos(json_encode($value123[$i]["conference"]), $titleConference) !== false) {
                for ($p = 0; $p < count($value123[$i]["submissions"]); $p++) {
                    if (strpos(json_encode($value123[$i]["submissions"][$p]["reviewers"]), $usermail) !== false) {
                        //$testa = json_encode($value123[$i]["submissions"][]["authors"]);
                        
                            $test[$q] = $value123[$i]["submissions"][$p]["title"];
                            $url[$q] = $value123[$i]["submissions"][$p]["url"];
                            $q++;
                    }
                }
            }
        }
    }

    foreach ($test as $test1) {
        $stringFinalData .= "<div class=\"panel-body\" id=\"id-body\"><a href='#' class=\"doc\" onclick='openDocumentSelect(\"$url[$index]\")'>\"" . $test1 . "</a></div>";
         $index++;
    }

    echo $stringFinalData;
  } else if (strcmp($role, "author") == 0) {//AUTHOR
    $test = "";
    $url = "";
    $i = 0;
    $stringFinalData = "";
    $q=0;
    $index = 0;
    foreach ($dataEvents as $field123 => $value123) {
        for ($i = 0; $i < count($value123); $i++) {
            if (strpos(json_encode($value123[$i]["conference"]), $titleConference) !== false) {
                for ($p = 0; $p < count($value123[$i]["submissions"]); $p++) {
                    if (strpos(json_encode($value123[$i]["submissions"][$p]["authors"]), $usermail) !== false) {
                        //$testa = json_encode($value123[$i]["submissions"][]["authors"]);
                        
                            $test[$q] = $value123[$i]["submissions"][$p]["title"];
                            $url[$q] = $value123[$i]["submissions"][$p]["url"];
                            $q++;
                    }
                }
            }
        }
    }

    foreach ($test as $test1) {
       $stringFinalData .= "<div class=\"panel-body\" id=\"id-body\"><a href='#' class=\"doc\" onclick='openDocumentSelect(\"$url[$index]\")'>\"" . $test1 . "</a></div>";
         $index++; 
    }

    echo $stringFinalData;
}
?>