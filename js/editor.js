$(document).ready(function() {
    var urlDocument = sessionStorage.getItem('urlDoc');
    var titleConference = sessionStorage.getItem('titleConference');
    var role = sessionStorage.getItem('role');
    var usermail = sessionStorage.getItem('LoggedUser');
    $("#file").load("documents/"+urlDocument);
    //crea lista documenti riferiti a quella conferenza e al ruolo avuto
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
    if(role === "reviewer"){
    //controllo se il paper è stato accettato/rifiutato oppure ancora da decidere
    $.ajax({
            type: 'POST',
            url: 'php/checkStatusPaperReviewers.php',
            data: {urlDocument: urlDocument, usermail:usermail},
            dataType: 'html',
            success: function (data) {
               
                  if(data === "accepted"){
                      $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/accepted.png" alt="Accepted">');
                  }else if(data==="rejected"){
                      $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/rejected.png" alt="Rejected">');
                  }else if(data==="undefined"){
                      $('#changeButtonWithImageJudge').html('<button type="button" id="judge1" class="btn btn-info btn-lg" data-toggle="modal" data-target="#judge">Judge This Document!</button>');
                  }
                  
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
    }
    if(role === "chair"){
   //controllo se il paper può essere giudicato dal Chair
    $.ajax({
            type: 'POST',
            url: 'php/checkStatusPaperChairs.php',
            data: {urlDocument: urlDocument, usermail:usermail},
            dataType: 'html',
            success: function (data) {
                  if(data === "allaccepted"){
                      alert("All reviewers accepted this paper! Now it's your turn! ")
                      $('#changeButtonWithImageJudge').html('<button type="button" id="judge1" class="btn btn-info btn-lg" data-toggle="modal" data-target="#judge">Judge This Document!</button>');
                  }else if(data==="allrejected"){
                      alert("All reviewers rejected this paper! Now it's your turn! ")
                      $('#changeButtonWithImageJudge').html('<button type="button" id="judge1" class="btn btn-info btn-lg" data-toggle="modal" data-target="#judge">Judge This Document!</button>');
                  }else if(data==="notalljudge"){
                      $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/UnderReview.png" alt="UnderReview">');
                  }else if(data==="undefined"){
                      $('#changeButtonWithImageJudge').html('');
                  }
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
    }
});