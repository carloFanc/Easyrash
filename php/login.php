<?php
    $email = $_POST['email'];
    $psw = $_POST['psw'];
    $dataFirstJson = file_get_contents('../json/listUsers.json');
    $FirstJson = json_decode($dataFirstJson, true);
    $flag=false;
    foreach ($FirstJson as $field => $value) { // controllo se in entrambi i json risulta già l'email in input 
        if ((strcmp($value['email'], $email) == 0)&& (strcmp($value['pass'], $psw) == 0)) {
            $flag = true;
        }
    }
    if($flag){
        echo "1";
    }else{
        echo "0";
    }
?>