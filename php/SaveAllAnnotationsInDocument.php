<?php
$body = $_POST['body'];
$document = $_POST['doc'];
$body = str_replace(";;;;;;;","&",$body);
 
if (!file_exists('../annotations/' . $document.'/'.$document)) { 
    copy("../documents/" . $document, "../annotations/" . $document ."/".$document);
    chmod("../annotations/" . $document ."/".$document, 0777);
    
}else{
    unlink('../annotations/' . $document.'/'.$document);
    copy("../documents/" . $document, "../annotations/" . $document ."/".$document); 
    chmod("../annotations/" . $document ."/".$document, 0777);
}

$file = "../annotations/" . $document ."/".$document;

$doc = new DOMDocument();
libxml_use_internal_errors(true);
// load the HTML string we want to strip
$doc->loadHTMLFile($file);
libxml_clear_errors();
$book = $doc->documentElement;
// get all the script tags
$size=$book->getElementsByTagName('body')->length;
if($size!=0){
 
$script_tags = $book->getElementsByTagName('body')->item(0);
    $book->removeChild($script_tags);
    
$doc->formatOutput = true;
// get the HTML string back
$doc->saveHTMLFile($file);
 
}
$dir = '../annotations/' . $document;
$files = scandir($dir, 0); 
$stringAllReviews = "";
for($i = 2; $i < count($files); $i++){
    if ($files[$i] != "id.json" && $files[$i] != $document){
    $stringAllReviews .= "<script type=”application/ld+json”>\n";
    $reviews = file_get_contents('../annotations/'.$document.'/'.$files[$i]);
    $stringAllReviews .= $reviews; 
    $stringAllReviews .= "\n</script>\n"; //stringa contenente tutte le annotations di tutti
}
} 

$ActualDocument = file_get_contents($file);
$needle = "</head>";
$new_content = $stringAllReviews."</head>\n<body>\n". $body."\n</body>";
$content = str_replace($needle, $new_content, $ActualDocument);
file_put_contents('../annotations/' . $document . '/' . $document, $content); 


?>