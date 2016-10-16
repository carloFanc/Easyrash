<?php

$dataFirstJson = file_get_contents('../json/listUsers.json');
$FirstJson = json_decode($dataFirstJson, true);
$dati = $_POST['dati'];
foreach ($FirstJson as $field => $value) {

    if (strpos($field, $dati) !== false) {

        unset($FirstJson[$field]);
    }
}
$FirstJson = json_encode($FirstJson, JSON_PRETTY_PRINT);

$file = fopen('../json/listUsers.json', 'w');
fwrite($file, $FirstJson);
fclose($file);
echo "success";
?>