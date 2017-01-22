var documentiAperti = [];
var arrayListaDocumenti = [];

function verifyUserAuth() {
    if ($("#userLoggedIn span").empty()) {
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
        localStorage.removeItem("annotations");
        sessionStorage.removeItem("countId");
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
                success: function () {
                    sessionStorage.removeItem("LoggedUser");
                    localStorage.removeItem("annotations");
                    location.replace("login.html");
                },
                error: function () {
                    alert("Server Error");
                }
            });

        } else {
            sessionStorage.removeItem("LoggedUser");
            location.replace("login.html");
        }
    });
}

// funzione che al doppio click su un documento lo apre nel content dell'index principale
function openDocumentSelect(urlDocument) {
    $("#listaDocumenti div").each(function () {
        $(this).removeClass('target');
    });
    $('#' + urlDocument.replace(".", "\\.")).addClass('target');
    localStorage.removeItem("annotations");
    sessionStorage.removeItem("countId");
    var role = sessionStorage.getItem('role');
    var ActualLock = sessionStorage.getItem('ActualLock');


    if (ActualLock === "1") {

        switchSend = 0;
        var url = sessionStorage.getItem('urlDoc');
        var string = "response=" + switchSend + "&url=" + url;

        var text = "";
        var type = "";
        if (sessionStorage.getItem('role') === 'reviewer') {
            text = "You lost temporary annotations made on the previous document!";
            type = "warning";
        } else {
            text = "";
            type = "success";
        }

        $.ajax({
            type: 'POST',
            url: 'php/LockPage.php',
            data: string,
            dataType: 'html',
            success: function (data) {
                if (data == "reader") {

                    swal({
                        title: "You are in Reader Mode!",
                        text: text,
                        type: type,
                        confirmButtonText: "Ok"

                    });
                    sessionStorage.setItem('ActualLock', "0");


                    if (role === "reviewer") {
                        $("#showButtonAnn").toggle();
                    }
                }
            },
            error: function () {
                alert("Server Error");
            }
        });
        document.getElementById("mode").setAttribute("onClick", "buttonAnnotator()");
        $('#mode').text('Go to Annotator Mode');
        $('#mode').css("background-color", "red");

        //controllo se il paper è stato accettato/rifiutato dal chair altrimenti se non giudicato (notJudgement)
        //controllo se il paper può essere giudicato in base ai giudizi dei reviewers
        if (role === "chair") {

            $.ajax({
                type: 'POST',
                url: 'php/checkStatusPaperJudgeChair.php',
                data: {urlDocument: urlDocument, usermail: sessionStorage.getItem("LoggedUser")},
                dataType: 'html',
                success: function (data) {

                    if (data === "accepted") {
                        $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/accepted.png" alt="Accepted">');
                        $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized, you judged this paper!" disabled>Go to Annotator Mode</button>');

                    } else if (data === "rejected") {
                        $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/rejected.png" alt="Rejected">');
                        $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized, you judged this paper!" disabled>Go to Annotator Mode</button>');

                    } else if (data === "notJudgement") {

                        //controllo se il paper può essere giudicato dal Chair
                        $.ajax({
                            type: 'POST',
                            url: 'php/checkStatusPaperChairs.php',
                            data: {urlDocument: urlDocument, usermail: sessionStorage.getItem("LoggedUser")},
                            dataType: 'html',
                            success: function (data) {
                                if (data === "allaccepted" || data === "allrejected" || data === "alljudge") {
                                    swal({
                                        title: "All reviewers have judged this paper! Now it's your turn!",
                                        type: "info",
                                        confirmButtonText: "Ok"
                                    });
                                    $('#changeButtonWithImageJudge').html('<button type="button" id="judge1" class="btn btn-info btn-lg" data-toggle="modal" data-target="#judge" title="Go To Annotator Mode" disabled>Judge This Document!</button>');
                                    $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg">Go to Annotator Mode</button>');

                                } else if (data === "notalljudge") {
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

        if (role === "reviewer") {

            $.ajax({
                type: 'POST',
                url: 'php/checkStatusPaperReviewers.php',
                data: {urlDocument: urlDocument, usermail: sessionStorage.getItem("LoggedUser")},
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
                        $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg">Go to Annotator Mode</button>');

                    }
                },
                error: function () {
                    alert("Error in Data Recovery");
                }
            });
        }

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
                sessionStorage.setItem('urlDoc', urlDocument);
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });

    } else {
        //controllo se il paper è stato accettato/rifiutato dal chair altrimenti se non giudicato (undefined)
        //controllo se il paper può essere giudicato in base ai giudizi dei reviewers
        if (role === "chair") {

            $.ajax({
                type: 'POST',
                url: 'php/checkStatusPaperJudgeChair.php',
                data: {urlDocument: urlDocument, usermail: sessionStorage.getItem("LoggedUser")},
                dataType: 'html',
                success: function (data) {

                    if (data === "accepted") {
                        $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/accepted.png" alt="Accepted">');
                        $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized, you judged this paper!" disabled>Go to Annotator Mode</button>');

                    } else if (data === "rejected") {
                        $('#changeButtonWithImageJudge').html('<img id="judge1Image" src="img/rejected.png" alt="Rejected">');
                        $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg" title="Annotator Mode unauthorized, you judged this paper!" disabled>Go to Annotator Mode</button>');

                    } else if (data === "notJudgement") {
                        //controllo se il paper può essere giudicato dal Chair
                        $.ajax({
                            type: 'POST',
                            url: 'php/checkStatusPaperChairs.php',
                            data: {urlDocument: urlDocument, usermail: sessionStorage.getItem("LoggedUser")},
                            dataType: 'html',
                            success: function (data) {
                                if (data === "allaccepted" || data === "allrejected" || data === "alljudge") {
                                    swal({
                                        title: "All reviewers have judged this paper! Now it's your turn!",
                                        type: "info",
                                        confirmButtonText: "Ok"
                                    });
                                    $('#changeButtonWithImageJudge').html('<button type="button" id="judge1" class="btn btn-info btn-lg" data-toggle="modal" data-target="#judge" title="Go To Annotator Mode" disabled>Judge This Document!</button>');
                                    $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg">Go to Annotator Mode</button>');

                                } else if (data === "notalljudge") {
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

        if (role === "reviewer") {

            $.ajax({
                type: 'POST',
                url: 'php/checkStatusPaperReviewers.php',
                data: {urlDocument: urlDocument, usermail: sessionStorage.getItem("LoggedUser")},
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
                        $('#modeButton').html('<button type="button" onclick="buttonAnnotator()" id="mode" class="btn btn-info btn-lg">Go to Annotator Mode</button>');

                    }
                },
                error: function () {
                    alert("Error in Data Recovery");
                }
            });
        }

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
                } else if (data == "1") {
                    $.ajax({
                        url: "annotations/" + urlDocument + "/" + urlDocument,
                        type: "GET",
                        cache: false,
                        success: function (html) {
                            $("#file").html(html);
                        }
                    });
                }
                sessionStorage.setItem('urlDoc', urlDocument);
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
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
    verifyUserAuth();
    logout();
});
