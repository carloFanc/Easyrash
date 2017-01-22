<?php

$dataEvents = file_get_contents('../json/events.json');
$dataEvents = json_decode($dataEvents, true);
$dataUser = $_POST['user'];
$identify_tab = $_POST['tab'];
if (strcmp($identify_tab, "tab1") == 0) { //CHAIR
    
    $i = 0;
    $stringFinalData = "<div class=\"container\"><div class=\"panel-group\" id=\"accordion1\">";
    foreach ($dataEvents as $field) { // controllo se in entrambi i json risulta già l'email in input 
        foreach ($field as $field2 => $value2) {
            $test = "";
            $stringFinalData .= "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion1\" href=\"#tab1" . $i . "\"  >" . $value2["conference"] . "</a></h4></div><div id=\"tab1" . $i . "\" class=\"panel-collapse collapse\">";

            foreach ($dataEvents as $field123 => $value123) {
                if (strpos(json_encode($value123[$i]["chairs"]), $dataUser) !== false) {
                    for ($j = 0; $j < count($value123[$i]["submissions"]); $j++) {
                        $test[$j] = $value123[$i]["submissions"][$j]["title"];
                    }
                }
            }
            if (strcmp(gettype($test), "array") == 0) {
                foreach ($test as $test1) {
                    $stringFinalData .= "<div class=\"panel-body\"><a href='#' class=\"doc\" onclick='openDocument(\"$test1\",\"chair\")'>\"" . $test1 . "</a></div>";
                }
            } else {
                $stringFinalData .= "<div class=\"panel-body\">" . "You are not a chair for this conference." . "</div>";
            }
            $stringFinalData .= "</div></div>";
            $i++;
            unset($test);
        }
        
            
    }
    $stringFinalData .= "</div> </div> </div>";

    echo $stringFinalData;
} else if (strcmp($identify_tab, "tab2") == 0) {//REVIEWER
    $i = 0;
    $stringFinalData = "<div class=\"container\"><div class=\"panel-group\" id=\"accordion2\">";

    foreach ($dataEvents as $field) { // controllo se in entrambi i json risulta già l'email in input 
        foreach ($field as $field2 => $value2) {
            $test = "";
            $stringFinalData .= "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion2\" href=\"#tab2" . $i . "\"  >" . $value2["conference"] . "</a></h4></div><div id=\"tab2" . $i . "\" class=\"panel-collapse collapse\">";

            foreach ($dataEvents as $field123 => $value123) {
                $prova = count($value123[$i]["submissions"]);
                for ($j = 0; $j < count($value123[$i]["submissions"]); $j++) {
                    if (strpos(json_encode($value123[$i]["submissions"][$j]["reviewers"]), $dataUser) !== false) {
                        $test[$j] = $value123[$i]["submissions"][$j]["title"];
                    }
                }
            }
            if (strcmp(gettype($test), "array") == 0) {
                foreach ($test as $test1) {
                    $stringFinalData .= "<div class=\"panel-body\"><a href='#' class=\"doc\" onclick='openDocument(\"$test1\",\"reviewer\")'>\"" . $test1 . "</a></div>";
                }
            } else {
                $stringFinalData .= "<div class=\"panel-body\">" . "You are not a reviewer for this conference." . "</div>";
            }
            $stringFinalData .= "</div></div>";
            $i++;
            unset($test);
        }
    }
    $stringFinalData .= "</div> </div> </div>";
    echo $stringFinalData;
} else if (strcmp($identify_tab, "tab3") == 0) {//AUTHOR
    $i = 0;
    $stringFinalData = "<div class=\"container\"><div class=\"panel-group\" id=\"accordion3\">";

    foreach ($dataEvents as $field) { // controllo se in entrambi i json risulta già l'email in input 
        foreach ($field as $field2 => $value2) {
           $test = "";
            $stringFinalData .= "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion3\" href=\"#tab3" . $i . "\"  >" . $value2["conference"] . "</a></h4></div><div id=\"tab3" . $i . "\" class=\"panel-collapse collapse\">";

            foreach ($dataEvents as $field123 => $value123) {
                $prova = count($value123[$i]["submissions"]);
                for ($j = 0; $j < count($value123[$i]["submissions"]); $j++) {
                    if (strpos(json_encode($value123[$i]["submissions"][$j]["authors"]), $dataUser) !== false) {
                        $test[$j] = $value123[$i]["submissions"][$j]["title"];
                    }
                }
            }
            if (strcmp(gettype($test), "array") == 0) {
                foreach ($test as $test1) {
                    $stringFinalData .= "<div class=\"panel-body\"><a href='#' class=\"doc\" onclick='openDocument(\"$test1\",\"author\")'>\"" . $test1 . "</a></div>";
                }
            } else {
                $stringFinalData .= "<div class=\"panel-body\">" . "You are not a author for this conference." . "</div>";
            }
            $stringFinalData .= "</div></div>";
            $i++;
            unset($test);
        }
    }
    $stringFinalData .= "</div> </div> </div>";
    echo $stringFinalData;
}
?>