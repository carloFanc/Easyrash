<?php
$document = $_POST['doc'];

if (file_exists('../annotations/' . $document . '/'. $document)) {
    echo "1";
}else{
    echo "0";
} 
?>