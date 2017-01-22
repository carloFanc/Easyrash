<?php

$dataEvents = file_get_contents('../json/events.json');
$dataEvents = json_decode($dataEvents, true);
$urlDoc = $_POST['urlDocument'];
$user = $_POST['usermail'];
$result["ntot"] = 0;
$result["nA"] = 0;
$result["nR"] = 0;
$result["notJ"] = 0;
$result["nameA"] = "";
$result["nameR"] = "";
$bool = false;
$countReviewers = 0;
$i = 0;
foreach ($dataEvents as $field => $value) {//conto quanti reviewer ha l'articolo che ho selezionato
    for ($i = 0; $i < count($value); $i++) {
        if (strpos(json_encode($value[$i]["chairs"]), $user) !== false) {
            for ($j = 0; $j < count($value[$i]["submissions"]); $j++) {
                if (strpos(json_encode($value[$i]["submissions"][$j]["url"]), $urlDoc) !== false) {
                    $countReviewers = count($value[$i]["submissions"][$j]["reviewers"]);
                }
            }
        }
    }
}
$result["ntot"] = $countReviewers;

$docJudgment = file_get_contents('../json/documentJudgmentReviewers.json');
$docJudgment = json_decode($docJudgment, true);

foreach ($docJudgment as $field => $value) {
    if (strpos(json_encode($field), $urlDoc) != false) {
        $bool = true;
    }
}

if ($bool) {
    foreach ($docJudgment as $field => $value) {
        if (strpos($field, $urlDoc) !== false) {
            $result["nA"] = count($value["accepted"]);
            $result["nR"] = count($value["rejected"]);

            $result["nameA"] = implode(',<li>', $value["accepted"]);
            $result["nameR"] = implode(',<li>', $value["rejected"]);

            $result["notJ"] = $result["ntot"] - $result["nA"] - $result["nR"];
        }
    }

    $nameR = "";
    if ($result["nameR"] == "") {
        $nameR = $result["nameR"];
    } else {
        $nameR = '<li>' . $result["nameR"];
    }
    $nameA = "";
    if ($result["nameA"] == "") {
        $nameA = $result["nameA"];
    } else {
        $nameA = '<li>' . $result["nameA"];
    }

    $notJ = "";
    if ($result["notJ"] > 1) {
        $notJ = "Mancano " . $result["notJ"] . " giudizi";
    } else {
        $notJ = "Manca " . $result["notJ"] . " giudizio";
    }

    if ($result["notJ"] == 0) {
        $stringa1 = '<div align="center"><b>Tutti i reviewers hanno giudicato!</b></div><br>';
    } else {

        if ($result["nR"] == 0 && $result["nA"] == 0) {
            $stringa1 = '<div align="center"><b>Nessun reviwers ha ancora giudicato!</b><br>' . $notJ . '</div>';
        } else {
            $stringa1 = '<div align="center"><b>Non tutti i reviewers hanno giudicato!</b><br>' . $notJ . '</div><br>';
        }
    }

    if ($result["nA"] == $result["ntot"]) {
        $stringa1 = $stringa1 . 'Tutti i reviewers hanno accettato questo documento: <br><ol>' . $nameA . '</ol>';
    } else if ($result["nR"] == $result["ntot"]) {
        $stringa1 = $stringa1 . 'Tutti i reviewers hanno rigettato questo documento: <br><ol>' . $nameR . '</ol>';
    } else {

        if ($result["nA"] != 0) {
            $stringa1 = $stringa1 . 'Reviewers che hanno accettato (' . $result["nA"] . '):<br><ol>' . $nameA . '</ol>';
        }           
        if ($result["nR"] != 0) {
            $stringa1 = $stringa1 . 'Reviewers che hanno rigettato (' . $result["nR"] . '):<br><ol>' . $nameR . '</ol>';
        }
    }

    $stringa = $stringa1;
 
    $result = $stringa;
} else {
    $result = "error";
}
echo $result;
?>