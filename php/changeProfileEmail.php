<?php

$dataFirstJson = file_get_contents('../json/listUsers.json');
$FirstJson = json_decode($dataFirstJson, true);
//$old_email = $_POST['old_email'];
$new_email = json_encode($_POST['new_email'] );
/*$emails = json_decode($data, true);
$Simply_emails = array();
$flag = true;
$i=0;
$JsonRecovered = "";
foreach ($emails as $field => $value) {
    $Simply_emails[$i] = $value;  //in posizione 0 c'è la stringa con l'email vecchia, in posizione 1 quella nuova 
    $i++;
}
foreach ($FirstJson as $field => $value) { // controllo se in entrambi i json risulta già l'email in input 
   if (strpos($value['email'], $Simply_emails[1]) !== false) {
        $flag = false;
    }
}
if ($flag) {
    foreach ($FirstJson as $field => $value) {
        if (strpos($field, $Simply_emails[0]) !== false) {

            $temp = explode(" ", $field);
            unset($FirstJson[$field]);

            $pattern = $temp[2];
            $replacement = $Simply_emails[1];
            $subject = $field;
            $new_string = preg_replace($pattern, $replacement, $subject, -1);

            $JsonRecovered .= '{"' . $new_string . '":{';
            $counter = 0;
            foreach ($value as $key => $value2) {
                if ($counter != 4) {
                    if (strpos($key, "email") !== false) {
                        $JsonRecovered .= '"' . $key . '": "' . $Simply_emails[1] . '",';
                    } else {
                        $JsonRecovered .= '"' . $key . '": "' . $value2 . '",';
                    }
                } else {
                    if (strpos($key, "email") !== false) {
                        $JsonRecovered .= '"' . $key . '": "' . $Simply_emails[1] . '"}}';
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
    $success_or_failure = "1";*/
    echo $new_email;
//} else {
  //  $success_or_failure = "0";
    //echo $success_or_failure;
//}
?>

