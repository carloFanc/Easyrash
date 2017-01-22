<?php
$judge = $_POST['judge'];
$user = $_POST['user']; 
$doc = $_POST['urlDoc']; 
$role = $_POST['role']; 

if (!file_exists('../annotations/' . $doc)) {
    mkdir('../annotations/' . $doc, 0777, true);
    fopen('../annotations/' . $doc . '/' . $user . '.json', "w");
    chmod('../annotations/' . $doc . '/' . $user . '.json', 0777);
    copy('../documents/'.$doc, '../annotations/' . $doc . '/' . $doc); 
    chmod('../documents/'.$doc, '../annotations/' . $doc . '/' . $doc, 0777);

    
} else {
     if (!file_exists('../annotations/' . $doc . '/' . $user . '.json')) {
        fopen('../annotations/' . $doc . '/' . $user . '.json', "w");
        chmod('../annotations/' . $doc . '/' . $user . '.json', 0777);
        
     }
}
$ActualDocumentAuthorJsonDecoded = json_decode(file_get_contents('../annotations/' . $doc . '/' . $user . '.json'),true); 
if($role == "chair"){
$ActualDocumentAuthorJsonDecoded =  array_merge((array) $ActualDocumentAuthorJsonDecoded, array(array('@context'=>'easyrash.json', '@type' => 'FINAL DECISION','name' => $user,'document' => $doc,'judge' => $judge,'date' => date("Y-m-d H:i:s"))));    
}else{                    
$ActualDocumentAuthorJsonDecoded =  array_merge((array) $ActualDocumentAuthorJsonDecoded, array(array('@context'=>'easyrash.json', '@type' => 'decision','name' => $user,'document' => $doc,'judge' => $judge,'date' => date("Y-m-d H:i:s"))));
}
file_put_contents('../annotations/' . $doc . '/' . $user . '.json', json_encode($ActualDocumentAuthorJsonDecoded, JSON_PRETTY_PRINT));

$file = "../annotations/" . $doc ."/".$doc;

$docM = new DOMDocument();
libxml_use_internal_errors(true);
// load the HTML string we want to strip
$docM->loadHTMLFile($file);
libxml_clear_errors();
$book = $docM->documentElement;
// get all the script tags
$size=$book->getElementsByTagName('head')->length;
if($size!=0){
 
$script_tags = $book->getElementsByTagName('head')->item(0);
    $book->removeChild($script_tags);
    
$docM->formatOutput = true;
// get the HTML string back
$docM->saveHTMLFile($file);
 
}
$dir = '../annotations/' . $doc;
$files = scandir($dir, 0); 
$stringAllReviews = "";
for($i = 2; $i < count($files); $i++){
    if ($files[$i] != "id.json" && $files[$i] != $doc){
    $stringAllReviews .= "<script type=”application/ld+json”>\n";
    $reviews = file_get_contents('../annotations/'.$doc.'/'.$files[$i]);
    $stringAllReviews .= $reviews; 
    $stringAllReviews .= "\n</script>\n"; //stringa contenente tutte le annotations di tutti
}
}
$ActualDocument = file_get_contents($file);
$needle = "<body>";
$new_content = "<head>\n".$stringAllReviews."</head>\n<body>\n";
$content = str_replace($needle, $new_content, $ActualDocument);
file_put_contents('../annotations/' . $doc . '/' . $doc, $content);
?>