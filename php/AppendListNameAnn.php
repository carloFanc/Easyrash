<?php
$listid = explode(",",$_POST['ListId']);
$doc = $_POST['doc'];
$string_append = "";
$contas=0;
if (file_exists('../annotations/'.$doc.'/'.'id.json')) {
$id = file_get_contents('../annotations/'.$doc.'/'.'id.json');
$idJson = json_decode($id, true);

foreach($idJson as $field => $value) {

    for($i=0;$i<count($listid);$i++){
    if($field == $listid[$i]){
        
        $string_append.='<li class="list-group-item hovermouse" onclick="visualizeBodyAnnotation(' .$field. ');">' .$value. '</li>';
    } 
    }
}
 
echo $string_append;
    }
?>

