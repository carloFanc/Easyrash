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
    //ann_global_json = {"title":title, "eval":eval, "reviewer":reviewer};
    //localStorage.setItem(title,JSON.stringify(ann_global_json));
    var string = "urlDoc=" + urlDoc + "&eval=" + eval1 + "&user=" + reviewer;
    if (role === "reviewer") {
        $.ajax({
            type: 'POST',
            url: 'php/documentJudgmentReviewers.php',
            data: string,
            dataType: 'html',
            success: function (data) {
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
            dataType: 'html',
            success: function (data) {
                $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/accepted.png" alt="Accepted">');
            },
            error: function () {
                alert("Server Error");
            }
        });
    }
}

function buttonRejected() {

    urlDoc = sessionStorage.getItem('urlDoc'); //Bisogna aggiungere il titolo del documento
    eval1 = "rejected";
    reviewer = sessionStorage.getItem('LoggedUser'); //login va sostituito con il nome della chiave usata per identificare l'utente loggato in sessionStorage
    //ann_global_json = {"title":title, "eval":eval, "reviewer":reviewer};
    //localStorage.setItem(title,JSON.stringify(ann_global_json));
    var string = "urlDoc=" + urlDoc + "&eval=" + eval1 + "&user=" + reviewer;
    if (role === "reviewer") {
        $.ajax({
            type: 'POST',
            url: 'php/documentJudgmentReviewers.php',
            data: string,
            dataType: 'html',
            success: function (data) {
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
            dataType: 'html',
            success: function (data) {
                $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/rejected.png" alt="Rejected">');
            },
            error: function () {
                alert("Server Error");
            }
        });
    }

}