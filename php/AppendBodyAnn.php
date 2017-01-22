<?php
$id = $_POST['id'];
$doc = $_POST['doc'];
$string_append = "";
if (file_exists('../annotations/'.$doc.'/'.'id.json')) {
$idfile = file_get_contents('../annotations/'.$doc.'/'.'id.json');
$idJson = json_decode($idfile, true);
$reviewer ="";
$array = array();
foreach($idJson as $field => $value) {
    if($field == $id){
            $reviewer = $value;
    }
} 
if($reviewer != ""){
$revfile = file_get_contents('../annotations/'.$doc.'/'.$reviewer.'.json');
$revfileJson = json_decode($revfile, true);
for($i=0;$i<count($revfileJson);$i++){
    if($revfileJson[$i]["@type"] == "comment"){
    if($id == $revfileJson[$i]["@id"]){
        $array[0]=$revfileJson[$i]["author"];
        $array[1]=$revfileJson[$i]["annotation"];
        $array[2]="<h4 style=\"float:left;\">Date:</h4><h4 style=\"float:right;\"><div class=\"label label-primary\">" . $revfileJson[$i]["date"] . "</div></h4>";
        $array[3]="<h4 style=\"float:left;\">Title:</h4><h4 style=\"float:right;\"><div class=\"label label-primary\">" . $revfileJson[$i]["title"] . "</div></h4>";
    }
    }
}
}
echo json_encode($array);
}else{
    echo json_encode("nada");
}
?>