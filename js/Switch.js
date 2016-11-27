var switchSend = 0;
var switchResponse = 0;//Variabile per il passaggio di modalità (Reader o Annotator)

//Passaggio di modalità a Reader
function buttonReader() {
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

    //Cambia funzione pulsante
    document.getElementById("mode").setAttribute("onClick", "buttonAnnotator()");
    //Cambio testo del pulsante da Reader Mode a Annotator Mode
    $('#mode').text('Go to Annotator Mode');
    $('#mode').css("background-color", "red");
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
                alert("you can not access the document");
                sessionStorage.setItem('ActualLock', "0");
            }
            if (data == "success") {
                alert("You are in Annotator Mode");
                sessionStorage.setItem('ActualLock', "1");
            }
        },
        error: function () {
            alert("Server Error");
        }
    });
    document.getElementById("mode").setAttribute("onClick", "buttonReader()");
    //Cambio testo del pulsante da Annotator Mode a Reader Mode
    $('#mode').text('Go to Reader Mode');
    $('#mode').css("background-color", "green");


}

$('.untouch').on('click', function (evt) {
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

            },
            error: function () {
                alert("Server Error");
            }
        }); 
        return false;//Returning false prevents the event from continuing up the chain
    }
});

window.onbeforeunload = function () {
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

            },
            error: function () {
                alert("Server Error");
            }
        }); 
        return false;//Returning false prevents the event from continuing up the chain
    }
};