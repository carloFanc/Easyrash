$(document).ready(function () {

    var urlDocument = sessionStorage.getItem('urlDoc');
    var titleConference = sessionStorage.getItem('titleConference');
    var role = sessionStorage.getItem('role');
    var usermail = sessionStorage.getItem('LoggedUser');

    $.ajax({//se non ci sono annotazioni carica documento da /documents se ci sono da /annotations/$document/$document.html
        type: 'POST',
        url: 'php/checkLoadDocument.php',
        data: "doc=" + urlDocument,
        dataType: 'html',
        success: function (data) {
            if (data == "0") {
                $.ajax({
                    url: "documents/" + urlDocument,
                    type: "GET",
                    cache: false,
                    success: function (html) {
                        $("#file").html(html);
                    }
                });
            } else {
                $.ajax({
                    url: "annotations/" + urlDocument + "/" + urlDocument,
                    type: "GET",
                    cache: false,
                    success: function (html) {
                        $("#file").html(html);
                    }
                });
            }
        },
        error: function () {
            alert("Error in Data Recovery");
        }
    });

    if (role === "chair" || role === "reviewer") {
        $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized" disabled>Go to Annotator Mode</button>');
    } else if (role === "author") {
        $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized for the author" disabled>Go to Annotator Mode</button>');
    }

    if (role === "chair") {
        $('#judgmentsReviewers').html('<button type="button" id="verification" onclick="verificationChair()" class="btn btn-info btn-lg" data-toggle="modal" data-target="#verificationChairJudgmentsReviewers">Verify judgments Reviewers</button>');
    }

    //crea lista documenti riferiti a quella conferenza e al ruolo avuto
    $.ajax({
        type: 'POST',
        url: 'php/loadListDocumentsInsideIndexPage.php',
        data: {titleConference: titleConference, role: role, usermail: usermail},
        dataType: 'html',
        success: function (data) {
            $("#listaDocumenti").html(data);
            $('#' + urlDocument.replace(".", "\\.")).addClass('target');
        },
        error: function () {
            alert("Error in Data Recovery");
        }
    });

    if (role === "reviewer") {
        //controllo se il paper è stato accettato/rifiutato oppure ancora da decidere
        $.ajax({
            type: 'POST',
            url: 'php/checkStatusPaperReviewers.php',
            data: {urlDocument: urlDocument, usermail: usermail},
            dataType: 'html',
            success: function (data) {

                if (data === "accepted") {
                    $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/accepted.png" alt="Accepted">');
                    $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized, you judged this paper!" disabled>Go to Annotator Mode</button>');

                } else if (data === "rejected") {
                    $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/rejected.png" alt="Rejected">');
                    $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized, you judged this paper!" disabled>Go to Annotator Mode</button>');

                } else if (data === "undefined") {
                    $('#changeButtonWithImageJudge').html('<button type="button" id="judge1" class="btn btn-info btn-lg" data-toggle="modal" data-target="#judge" title="Go To Annotator Mode" disabled>Judge This Document!</button>');
                    $('#modeButton').show();
                    $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg">Go to Annotator Mode</button>');

                }
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
    }

    if (role === "chair") {
        //controllo se il paper è stato accettato/rifiutato dal chair altrimenti se non giudicato (notJudgement)
        //controllo se il paper può essere giudicato in base ai giudizi dei reviewers

        $.ajax({
            type: 'POST',
            url: 'php/checkStatusPaperJudgeChair.php',
            data: {urlDocument: urlDocument, usermail: usermail},
            dataType: 'html',
            success: function (data) {

                if (data === "accepted") {
                    $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/accepted.png" alt="Accepted">');
                    $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized, you judged this paper!" disabled>Go to Annotator Mode</button>');

                } else if (data === "rejected") {
                    $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/rejected.png" alt="Rejected">');
                    $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized, you judged this paper!" disabled>Go to Annotator Mode</button>');

                } else if (data === "notJudgement") {
                    $.ajax({
                        type: 'POST',
                        url: 'php/checkStatusPaperChairs.php',
                        data: {urlDocument: urlDocument, usermail: usermail},
                        dataType: 'html',
                        success: function (data) {
                            if (data === "allaccepted" || data === "allrejected" || data === "alljudge") {
                                swal({
                                    title: "All reviewers have judged this paper! Now it's your turn! ",
                                    type: "info",
                                    confirmButtonText: "Ok"
                                });
                                $('#changeButtonWithImageJudge').html('<button type="button" id="judge1" class="btn btn-info btn-lg" data-toggle="modal" data-target="#judge" title="Go To Annotator Mode" disabled>Judge This Document!</button>');
                                $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg">Go to Annotator Mode</button>');

                            } else if (data === "notalljudge") {
                                $('#changeButtonWithImageJudge').show();
                                $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/UnderReview.png" alt="UnderReview">');
                                $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized" disabled>Go to Annotator Mode</button>');


                            } else if (data === "undefined") {
                                $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/UnderReview.png" alt="UnderReview">');
                                $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized" disabled>Go to Annotator Mode</button>');


                            }
                        },
                        error: function () {
                            alert("Error in Data Recovery");
                        }
                    });
                }
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
    }
});

function verificationChair() {
    var urlDocument = sessionStorage.getItem('urlDoc');
    var usermail = sessionStorage.getItem('LoggedUser');
    $.ajax({
        type: 'POST',
        url: 'php/verifyJudgmentsReviewers.php',
        data: {urlDocument: urlDocument, usermail: usermail},
        dataType: 'html',
        success: function (data) {

            if (data !== "error") {
                $('#resultVerification').html(data);
            } else {
                $('#resultVerification').html('<div align="center"><b>Nessun reviwers ha ancora giudicato!<b></div>');
            }
        },
        error: function () {
            alert("Error in Data Recovery");
        }
    });
}