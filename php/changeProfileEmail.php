<?php

$dataFirstJson = file_get_contents('../json/listUsers.json');
$FirstJson = json_decode($dataFirstJson, true);
$old_email = $_POST['old_email'];
$new_email = $_POST['new_email'];
$flag = true;
$i = 0;
$JsonRecovered = "";

foreach ($FirstJson as $field => $value) { // controllo se in entrambi i json risulta già l'email in input 
    if (strpos($value['email'], $new_email) !== false) {
        $flag = false;
    }
}
if ($flag) {
//correggo tutti i file
    $file_events = file_get_contents('../json/events.json');
    $file_events = str_replace($old_email, $new_email, $file_events);
    file_put_contents('../json/events.json', $file_events);
    
    $file_chairs = file_get_contents('../json/documentJudgmentChairs.json');
    $file_chairs = str_replace($old_email, $new_email, $file_chairs);
    file_put_contents('../json/documentJudgmentChairs.json', $file_chairs);
    
    $file_reviewers = file_get_contents('../json/documentJudgmentReviewers.json');
    $file_reviewers = str_replace($old_email, $new_email, $file_reviewers);
    file_put_contents('../json/documentJudgmentReviewers.json', $file_reviewers);

    foreach ($FirstJson as $field => $value) {
        if (strpos($field, $old_email) !== false) {

            $temp = explode(" ", $field);
            unset($FirstJson[$field]);

            $pattern = $temp[2];
            $replacement = $new_email;
            $subject = $field;
            $new_string = preg_replace($pattern, $replacement, $subject, -1);

            $JsonRecovered .= '{"' . $new_string . '":{';
            $counter = 0;
            foreach ($value as $key => $value2) {
                if ($counter != 4) {
                    if (strpos($key, "email") !== false) {
                        $JsonRecovered .= '"' . $key . '": "' . $new_email . '",';
                    } else {
                        $JsonRecovered .= '"' . $key . '": "' . $value2 . '",';
                    }
                } else {
                    if (strpos($key, "email") !== false) {
                        $JsonRecovered .= '"' . $key . '": "' . $new_email . '"}}';
                    } else {
                        $JsonRecovered .= '"' . $key . '": "' . $value2 . '"}}';
                    }
                }
                $counter++;
            }
        }
    }
    $JsonRecoveredArray = json_decode($JsonRecovered, true);
    $merge = array_merge($FirstJson, $JsonRecoveredArray);
    $FirstJson = json_encode($merge, JSON_PRETTY_PRINT);

    $file = fopen('../json/listUsers.json', 'w');
    fwrite($file, $FirstJson);
    fclose($file);
    $success_or_failure = "1";
    echo $success_or_failure;
} else {
    $success_or_failure = "0";
    echo $success_or_failure;
}
?>

