<?php

$dataFirstJson = file_get_contents('../json/listUsers.json');
$FirstJson = json_decode($dataFirstJson, true); 
$new_password = $_POST['new_password'];
$dati = $_POST['dati'];
$i = 0;
$JsonRecovered = "";
$flag=true;
 
if ($flag) {
    foreach ($FirstJson as $field => $value) {
        if (strpos($field, $dati) !== false) {

            unset($FirstJson[$field]);
            $JsonRecovered .= '{"' . $dati . '":{';
            $counter = 0;
            foreach ($value as $key => $value2) {
                if ($counter != 4) {
                    if (strpos($key, "pass") !== false) {
                        $JsonRecovered .= '"' . $key . '": "' . $new_password . '",';
                    } else {
                        $JsonRecovered .= '"' . $key . '": "' . $value2 . '",';
                    }
                } else {
                    if (strpos($key, "pass") !== false) {
                        $JsonRecovered .= '"' . $key . '": "' . $new_password . '"}}';
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

