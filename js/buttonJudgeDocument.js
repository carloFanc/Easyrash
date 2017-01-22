var title = ""; //Titolo del documento chiave primaria
var eval1; //E' accepted o rejected
var reviewer = "";
var ann_global_json = {};
var judgeBoolean;
var role = sessionStorage.getItem('role');

function buttonAccepted() {

    urlDoc = sessionStorage.getItem('urlDoc'); //Bisogna aggiungere il titolo del documento
    eval1 = "accepted";
    reviewer = sessionStorage.getItem('LoggedUser'); //login va sostituito con il nome della chiave usata per identificare l'utente loggato in sessionStorage
     
    var string = "urlDoc=" + urlDoc + "&eval=" + eval1 + "&user=" + reviewer;

    if (role === "reviewer") {

        $.ajax({
            type: 'POST',
            url: 'php/documentJudgmentReviewers.php',
            data: string,
            dataType: 'html',
            success: function (data) {
                releaseLockAfterJudgment();
                $("#showButtonAnn").toggle();
                $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/accepted.png" alt="Accepted">');
            },
            error: function () {
                alert("Server Error");
            }
        });

    } else if (role === "chair") {

        $.ajax({
            type: 'POST',
            url: 'php/documentJudgmentChairs.php',
            data: string,
            success: function () {
                releaseLockAfterJudgment();
                $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/accepted.png" alt="Accepted">');
            },
            error: function () {
                alert("Server Error");
            }
        });
    }
    var judgeValue = "judge=accepted&user="+sessionStorage.getItem('LoggedUser')+"&urlDoc="+urlDoc+"&role="+role; 
    console.log(role);
    $.ajax({ // salva il giudizio nel nomereviewer.json e quindi anche nel documento html
            type: 'POST',
            url: 'php/SaveJudgeAnnotation.php',
            data: judgeValue,
            success: function () {
                 },
            error: function () {
                alert("Server Error");
            }
        });
}

function buttonRejected() {

    urlDoc = sessionStorage.getItem('urlDoc'); //Bisogna aggiungere il titolo del documento
    eval1 = "rejected";
    reviewer = sessionStorage.getItem('LoggedUser'); //login va sostituito con il nome della chiave usata per identificare l'utente loggato in sessionStorage
     var string = "urlDoc=" + urlDoc + "&eval=" + eval1 + "&user=" + reviewer;
    if (role === "reviewer") {

        $.ajax({
            type: 'POST',
            url: 'php/documentJudgmentReviewers.php',
            data: string,
            dataType: 'html',
            success: function (data) {
                releaseLockAfterJudgment();
                $("#showButtonAnn").toggle();
                $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/rejected.png" alt="Rejected">');
            },
            error: function () {
                alert("Server Error");
            }
        });

    } else if (role === "chair") {

        $.ajax({
            type: 'POST',
            url: 'php/documentJudgmentChairs.php',
            data: string,
            success: function () {
                releaseLockAfterJudgment();
                $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/rejected.png" alt="Rejected">');
            },
            error: function () {
                alert("Server Error");
            }
        });
    }
    var judgeValue = "judge=rejected&user="+sessionStorage.getItem('LoggedUser')+"&urlDoc="+urlDoc;
    $.ajax({ // salva il giudizio nel nomereviewer.json e quindi anche nel documento html
            type: 'POST',
            url: 'php/SaveJudgeAnnotation.php',
            data: judgeValue,
            success: function () {
                 },
            error: function () {
                alert("Server Error");
            }
        });
}

function releaseLockAfterJudgment() {
    if (sessionStorage.getItem('ActualLock') == '1') {
        swal({
            title: "Thanks for giving us your judgment on this document!",
            text: "Now, you can not go to Annotator Mode!",
            imageUrl: "img/ok.jpg",
            confirmButtonText: "Ok"
        },
        function () {
            $('#modeButton').show();
            $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized, you judged this paper!" disabled>Go to Annotator Mode</button>');
        }
        );
        switchSend = 0;
        var url = sessionStorage.getItem('urlDoc');
        var string = "response=" + switchSend + "&url=" + url;
        $.ajax({
            type: 'POST',
            url: 'php/LockPage.php',
            data: string,
            dataType: 'html',
            success: function (data) {
                sessionStorage.setItem('ActualLock', '0');
                localStorage.removeItem("annotations");
            },
            error: function () {
                alert("Server Error");
            }
        });
         
    }
}