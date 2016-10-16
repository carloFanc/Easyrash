<?php
$updatedData = $_POST['newData'];
$upData = (json_decode($updatedData));
file_put_contents('../json/listUsers.json',json_encode($upData, JSON_PRETTY_PRINT));
?>