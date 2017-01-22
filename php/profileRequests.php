<?php
$dataFirstJson = file_get_contents ('../json/listUsers.json');
$FirstJson = json_decode($dataFirstJson, true);
$dati = $_POST['dati'];
$infoUser="";
foreach ($FirstJson as $field => $value) {
    if (strpos($field, $dati) !== false) {
        foreach ($value as $key => $value2) {
                $infoUser .= $value2 . ';';
        }
    }
}
echo $infoUser;
?>
