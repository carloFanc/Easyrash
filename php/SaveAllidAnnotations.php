<?php
//non salva solamente gli id in id.json ma anche l'annotazione dentro il nomereviewer.json
$id = explode(",", $_POST['id']);
$text = explode(",", $_POST['text']);
$title = explode(",", $_POST['title']);
$annotation = explode(",", $_POST['annotation']);
$author = explode(",", $_POST['author']);
$date = explode(",", $_POST['date']);
$doc = $_POST['doc'];
if (!file_exists('../annotations/' . $doc)) {
    mkdir('../annotations/' . $doc, 0777, true);
    fopen('../annotations/' . $doc . '/' . $author[0] . '.json', "w");
    fopen('../annotations/' . $doc . '/id.json', "w");
    chmod('../annotations/' . $doc . '/' . $author[0] . '.json', 0777);
    chmod('../annotations/' . $doc . '/id.json', 0777);
} else {
     if (!file_exists('../annotations/' . $doc . '/' . $author[0] . '.json')) {
        fopen('../annotations/' . $doc . '/' . $author[0] . '.json', "w");
        chmod('../annotations/' . $doc . '/' . $author[0] . '.json', 0777);
    }
    if (!file_exists('../annotations/' . $doc . '/id.json')) {
        fopen('../annotations/' . $doc . '/id.json', "w");
        chmod('../annotations/' . $doc . '/id.json', 0777);
    }
}

$ActualDocumentIdJson = json_decode(file_get_contents('../annotations/' . $doc . '/id.json'));

if ($ActualDocumentIdJson == null) {
    foreach ($id as $item) {
        $ActualDocumentIdJson->{$item} = $author[0];
     }
} else {
    foreach ($id as $item) { 
        $ActualDocumentIdJson->{$item} = $author[0];
        
    }
}
file_put_contents('../annotations/' . $doc . '/id.json', json_encode($ActualDocumentIdJson, JSON_PRETTY_PRINT));

//fin qua vengono agggiunti gli id nel file id.json
//ora si aggiunge l'annotazione nel file #autore.json

$ActualDocumentAuthorJsonDecoded = json_decode(file_get_contents('../annotations/' . $doc . '/' . $author[0] . '.json'),true); 
 
      for($i=0;$i<count($id);$i++){                        
      $ActualDocumentAuthorJsonDecoded =  array_merge((array) $ActualDocumentAuthorJsonDecoded, array(array('@context'=>'easyrash.json', '@type' => 'comment', '@id' => $id[$i],'title' => $title[$i],'text' => $text[$i],'annotation' => $annotation[$i], 'author' => $author[$i],'date' => $date[$i])));
     
    }

file_put_contents('../annotations/' . $doc . '/' . $author[0] . '.json', json_encode($ActualDocumentAuthorJsonDecoded, JSON_PRETTY_PRINT));
?>