<?php

$dataEvents = file_get_contents('../json/events.json');
$dataEvents = json_decode($dataEvents, true);
$dataUser = $_POST['titledoc'];
echo $dataUser;

?>