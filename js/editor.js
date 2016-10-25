$(document).ready(function() {
    var url = sessionStorage.getItem('urlDoc');
    $("#file").load("documents/"+url);
});