var documentiAperti = [];
var arrayListaDocumenti = [];

function verifyUserAuth() {
    if ($("#userLoggedIn span").empty()) {
        console.log(sessionStorage);
        $("#userLoggedIn span").append(sessionStorage.getItem("LoggedUser"));
    }
}

function verifyAuthentication() {
    if (sessionStorage.length === 0) {
        location.replace("login.html");
    }
}

function logout() {
    $("#confirmLogout").click(function () {
        var ActualLock = sessionStorage.getItem('ActualLock');
        if (ActualLock === "1") {
        switchSend = 0;
        var url = sessionStorage.getItem('urlDoc');
        var string = "response=" + switchSend + "&url=" + url;
        $.ajax({
            type: 'POST',
            url: 'php/LockPage.php',
            data: string,
            dataType: 'html',
            success: function (data) {
                sessionStorage.removeItem("LoggedUser");
                location.replace("login.html");
            },
            error: function () {
                alert("Server Error");
            }
        });

        }else{
                sessionStorage.removeItem("LoggedUser");
                location.replace("login.html");
        }
    });
}

// funzione che al doppio click su un documento lo apre nel content dell'index principale
function openDocumentSelect(urlDocument) {
    var role = sessionStorage.getItem('role');
    var ActualLock = sessionStorage.getItem('ActualLock');
    if (ActualLock === "1") {
       
        switchSend = 0;
        var url = sessionStorage.getItem('urlDoc'); 
        var string = "response=" + switchSend + "&url=" + url;
        $.ajax({
            type: 'POST',
            url: 'php/LockPage.php',
            data: string,
            dataType: 'html',
            success: function (data) {
                 if (data == "reader") {
                alert("You are in Reader Mode");
                sessionStorage.setItem('ActualLock', "0");
            }
            },
            error: function () {
                alert("Server Error");
            }
        });
        document.getElementById("mode").setAttribute("onClick", "buttonAnnotator()");
        $('#mode').text('Go to Annotator Mode');
        $('#mode').css("background-color", "red");
        
        
        //controllo se il paper è stato accettato/rifiutato oppure ancora da decidere
        if(role === "chair"){
   //controllo se il paper può essere giudicato dal Chair
    $.ajax({
            type: 'POST',
            url: 'php/checkStatusPaperChairs.php',
            data: {urlDocument: urlDocument, usermail:sessionStorage.getItem("LoggedUser")},
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
                  $("#file").load("documents/"+urlDocument);
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
    }
    if(role === "reviewer"){
    $.ajax({
            type: 'POST',
            url: 'php/checkStatusPaperReviewers.php',
            data: {urlDocument: urlDocument, usermail:sessionStorage.getItem("LoggedUser")},
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
        
    $("#file").load("documents/"+urlDocument);
    sessionStorage.setItem('urlDoc', urlDocument);
    } else {
         if(role === "chair"){
   //controllo se il paper può essere giudicato dal Chair
    $.ajax({
            type: 'POST',
            url: 'php/checkStatusPaperChairs.php',
            data: {urlDocument: urlDocument, usermail:sessionStorage.getItem("LoggedUser")},
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
    if(role === "reviewer"){
        $.ajax({
            type: 'POST',
            url: 'php/checkStatusPaperReviewers.php',
            data: {urlDocument: urlDocument, usermail:sessionStorage.getItem("LoggedUser")},
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
    $("#file").load("documents/"+urlDocument);
    sessionStorage.setItem('urlDoc', urlDocument);
    }
    
}

function cambiaContenuto(string) {   //funzione che al click di un bottone nella index apre un contenuto diverso
    if (string == "profile") {
        $("#page-container").load("pages/profile.html");
    }
    if (string == "document") {
        $("#page-container").load("pages/document.html");
    }
    if (string == "doclist") {
        $("#page-container").load("pages/doclist.html");
    }

}
$(document).ready(function () {
    verifyAuthentication();
    // docToRemove();
    verifyUserAuth();
    logout();
});
