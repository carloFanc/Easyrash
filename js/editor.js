$(document).ready(function() {
    var urlDocument = sessionStorage.getItem('urlDoc');
    var titleConference = sessionStorage.getItem('titleConference');
    var role = sessionStorage.getItem('role');
    var usermail = sessionStorage.getItem('LoggedUser');
    $("#file").load("documents/"+urlDocument);
    $.ajax({
            type: 'POST',
            url: 'php/loadListDocumentsInsideIndexPage.php',
            data: {titleConference: titleConference, role:role,usermail:usermail},
            dataType: 'html',
            success: function (data) {
                  $("#listaDocumenti").html(data);
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
    
});