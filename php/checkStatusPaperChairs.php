<?php

$dataEvents = file_get_contents('../json/events.json');
$dataEvents = json_decode($dataEvents, true);
$urlDoc = $_POST['urlDocument'];
$user = $_POST['usermail'];
$result = "";
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
            if (count($value["accepted"])== $countReviewers) {
                $result = "allaccepted";
            } else if (count($value["rejected"])== $countReviewers) {
                $result = "allrejected";
            } else {
                $result = "notalljudge";
            }
        }
    }
}else{
    $result = "undefined";
}
 echo $result;

/* foreach ($docJudgment as $field => $value) {
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
  } */
?>