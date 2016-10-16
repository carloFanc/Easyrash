$(document).ready(function () {
    var dati = sessionStorage.getItem("LoggedUser");

    $.ajax({
        type: 'POST',
        url: 'php/profileRequests.php',
        data: {dati: dati},
        success: function (data) {
            var res = data.split(";");
            html = "<div> Name: " + res[0] + "</br> Surname: " + res[1] + "</br> Email: " + res[2] + "</br> Password: " + res[3] + "</br> Sex: " + res[4] + "</div>";
            $("#tab1").html(html);
        },
        error: function (data) {
            alert("errore recupero dati");
        }
    });
    $("#yesremove").click(function () {
        $.ajax({
            type: 'POST',
            url: 'php/deleteProfile.php',
            data: {dati: dati},
            success: function (data) {
                if (data === "success") {
                    alert("User deleted. You will be redirected in login page.")
                    window.location.replace("login.html");
                }
            },
            error: function () {
                alert("Error");
            }

        });
    });

});