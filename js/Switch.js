var switchSend = 0; //Variabile per il passaggio di modalità (Reader o Annotator)

//Passaggio di modalità a Reader
function buttonReader() {
    switchSend = 0;
    var url = sessionStorage.getItem('urlDoc');
    var string = "response=" + switchSend + "&url=" + url;

    var text = "";
    if (sessionStorage.getItem('role') === 'reviewer') {
        text = "You will not be able to recover temporary annotations!";
    } else {
        text = "You will not be able to judge this paper!";
    }

    swal({
        title: "Are you sure?",
        text: text,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#50f06b",
        confirmButtonText: "Yes, go to reader mode!",
        closeOnConfirm: false
    },
            function () {

                $.ajax({
                    type: 'POST',
                    url: 'php/LockPage.php',
                    data: string,
                    dataType: 'html',
                    success: function (data) {
                        if (data == "reader") {

                            if (sessionStorage.getItem('role') == 'chair') {

                                swal({
                                    title: "You are in Reader Mode! ",
                                    type: "success",
                                    confirmButtonText: "Ok"
                                            //timer: 3000,
                                            //showConfirmButton: falso
                                },
                                        function () {
                                            if (sessionStorage.getItem('ActualLock') == '1') {

                                                sessionStorage.setItem('ActualLock', "0");

                                                //da mettere altrimenti quando c'è <img> si blocca e non continua 
                                                //perchè non trova elemento judge1 in quanto c'è judge1Image
                                                if ($('#changeButtonWithImageJudge').children().is("button")) {
                                                    document.getElementById("judge1").disabled = true;
                                                    document.getElementById("judge1").setAttribute("title", "Go to Annotator Mode");
                                                } else {
                                                    return;
                                                }
                                            }
                                        }
                                );

                            } else if (sessionStorage.getItem('role') == 'reviewer') {

                                swal({
                                    title: "You are in Reader Mode! ",
                                    type: "success",
                                    confirmButtonText: "Ok"
                                },
                                        function () {
                                            $("#showButtonAnn").toggle();
                                            sessionStorage.setItem('ActualLock', "0");

                                            //da mettere altrimenti quando c'è <img> si blocca e non continua 
                                            //perchè non trova elemento judge1 in quanto c'è judge1Image
                                            if ($('#changeButtonWithImageJudge').children().is("button")) {
                                                document.getElementById("judge1").disabled = true;
                                                document.getElementById("judge1").setAttribute("title", "Go to Annotator Mode");
                                            } else {
                                                return;
                                            }
                                            localStorage.removeItem("annotations");
                                        });
                            }
                            //Cambia funzione pulsante
                            document.getElementById("mode").setAttribute("onClick", "buttonAnnotator()");
                            //Cambio testo del pulsante da Reader Mode a Annotator Mode
                            $('#mode').text('Go to Annotator Mode');
                            $('#mode').css("background-color", "red");

                            $.ajax({//se non ci sono annotazioni carica documento da /documents se ci sono da /annotations/$document/$document.html
                                type: 'POST',
                                url: 'php/checkLoadDocument.php',
                                data: "doc=" + url,
                                dataType: 'html',
                                success: function (data) {
                                    if (data == "0") {
                                        $.ajax({
                                            url: "documents/" + url,
                                            type: "GET",
                                            cache: false,
                                            success: function (html) {
                                                $("#file").html(html);
                                            }
                                        });
                                    } else {
                                        $.ajax({
                                            url: "annotations/" + url + "/" + url,
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
                        }
                    },
                    error: function () {
                        alert("Server Error");
                    }
                });
            });
}

//Passaggio di modalità ad Annotator
function buttonAnnotator() {
    switchSend = 1;
    var url = sessionStorage.getItem('urlDoc');
    var string = "response=" + switchSend + "&url=" + url;
    $.ajax({
        type: 'POST',
        url: 'php/LockPage.php',
        data: string,
        dataType: 'html',
        success: function (data) {

            if (data == "blocked") {
                swal({
                    title: "You can't access the document! ",
                    type: "warning",
                    confirmButtonText: "Ok"
                });
                sessionStorage.setItem('ActualLock', "0");
            }

            if (data == "success") {

                if (sessionStorage.getItem('role') == 'chair') {

                    swal({
                        title: "You are in Annotator Mode! ",
                        text: "Use the button to the right to judge this paper!",
                        type: "success",
                        confirmButtonText: "Ok"
                    },
                            function () {
                                if (sessionStorage.getItem('ActualLock') == '0') {

                                    sessionStorage.setItem('ActualLock', "1");

                                    //da mettere altrimenti quando c'è <img> si blocca e non continua 
                                    //perchè non trova elemento judge1 in quanto c'è judge1Image
                                    if ($('#changeButtonWithImageJudge').children().is("button")) {
                                        document.getElementById("judge1").disabled = false;
                                        document.getElementById("judge1").setAttribute("title", "");
                                    } else {
                                        return;
                                    }
                                }
                            }
                    );

                } else if (sessionStorage.getItem('role') == 'reviewer') {

                    swal({
                        title: "You are in Annotator Mode! ",
                        text: "Use two buttons to the left to manage annotations",
                        type: "success",
                        confirmButtonText: "Ok"
                    },
                            function () {
                                $("#showButtonAnn").toggle();
                                sessionStorage.setItem('ActualLock', "1");

                                //da mettere altrimenti quando c'è <img> si blocca e non continua 
                                //perchè non trova elemento judge1 in quanto c'è judge1Image
                                if ($('#changeButtonWithImageJudge').children().is("button")) {
                                    document.getElementById("judge1").disabled = false;
                                    document.getElementById("judge1").setAttribute("title", "");
                                } else {
                                    return;
                                }
                            });
                }
                document.getElementById("mode").setAttribute("onClick", "buttonReader()");
                //Cambio testo del pulsante da Annotator Mode a Reader Mode
                $('#mode').text('Go to Reader Mode');
                $('#mode').css("background-color", "green");
            }
        },
        error: function () {
            alert("Server Error");
        }
    });
}

$('.untouch').on('click', function (evt) {
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
            success: function (data) {
                sessionStorage.setItem('ActualLock', '0');
            },
            error: function () {
                alert("Server Error");
            }
        });
        return false;//Returning false prevents the event from continuing up the chain
    }
});

window.onbeforeunload = function () {
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
            success: function (data) {
                sessionStorage.setItem('ActualLock', '0');
            },
            error: function () {
                alert("Server Error");
            }
        });
        return false;//Returning false prevents the event from continuing up the chain
    }
};
