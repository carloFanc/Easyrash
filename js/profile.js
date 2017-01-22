$(document).ready(function () {
    var dati = sessionStorage.getItem("LoggedUser");

    if ($("#tab1").empty()) {
        $.ajax({
            type: 'POST',
            url: 'php/profileRequests.php',
            data: {dati: dati},
            dataType: 'html',
            success: function (data) {
                var res = data.split(";");
                html = "<div> Name: " + res[0] + "</br> Surname: " + res[1] + "</br> Email: " + res[2] + "</br> Password: " + res[3] + "</br> Sex: " + res[4] + "</div>";
                $("#tab1").html(html);
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
    }


    $("#yesremove").click(function () {
        $.ajax({
            type: 'POST',
            url: 'php/deleteProfile.php',
            data: {dati: dati},
            success: function (data) {

                if (data === "success") {
                    swal({
                        title: "User deleted. You will be redirected in login page.",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ok",
                        closeOnConfirm: false
                    },
                            function () {
                                window.location.replace("login.html");
                            });
                }
            },
            error: function () {
                alert("Error")
            }
        });
    });

    $("#EmailSubmit").click(function () {
        var mail = $('input[name=email]').val();
        var mailconfirm = $('input[name=email_confirm]').val();


        if ((mail == 0) && (mailconfirm == 0)) {
            $("#email").effect("shake");
            $("#emailconfirm").effect("shake");
        } else
        if (mail == 0) {
            $("#email").effect("shake");

        } else
        if (mailconfirm == 0) {
            $("#emailconfirm").effect("shake");

        } else
        if ((mailconfirm != 0 && !validateEmail(mailconfirm)) && (mail != 0 && !validateEmail(mail))) {
            $("#email").effect("highlight");
            $("#emailconfirm").effect("highlight");
        } else
        if (mail != 0 && !validateEmail(mail)) {
            swal({
                title: "Error. Mail is not valid!",
                type: "warning",
                showConfirmButton: false,
                timer: 3000
            });
        } else
        if (mailconfirm != 0 && !validateEmail(mailconfirm)) {
            swal({
                title: "Error. Mail is not valid!",
                type: "warning",
                showConfirmButton: false,
                timer: 3000
            });
        } else
        if (((mail != 0 && validateEmail(mail)) && (mailconfirm != 0 && validateEmail(mailconfirm))) && mail != mailconfirm) {
            swal({
                title: "Error. Different input. Retry.",
                type: "warning",
                confirmButtonText: "Ok"
            });
        } else {

            if ($('input[name=email]').val().localeCompare($('input[name=email_confirm]').val()) === 0) {

                var data_string = 'old_email=' + dati + '&new_email=' + $('input[name=email]').val();

                $.ajax({
                    type: 'POST',
                    url: 'php/changeProfileEmail.php',
                    data: data_string,
                    dataType: 'json',
                    success: function (data) {

                        if (data == '1') {
                            swal({
                                title: "Email changed! Now you will be redirected in login page",
                                type: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Ok",
                                closeOnConfirm: false
                            },
                                    function () {
                                        location.replace("login.html");
                                    });

                        } else if (data == '0') {

                            swal({
                                title: "Error! email already used!",
                                type: "warning",
                                confirmButtonText: "Ok"
                            });
                        }
                    },
                    error: function () {
                        alert("Error");
                    }
                });

            }

        }
    });

    $("#PasswordSubmit").click(function () {
        if ($('input[name=new_password]').val().localeCompare($('input[name=new_password_confirm]').val()) === 0) {
            var data_string = 'dati=' + dati + '&new_password=' + $('input[name=new_password]').val();

            $.ajax({
                type: 'POST',
                url: 'php/changeProfilePsw.php',
                data: data_string,
                dataType: 'json',
                success: function (data) {
                    if (data == '1') {

                        swal({
                            title: "Password changed! Now you will be redirected in login page",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Ok",
                            closeOnConfirm: false
                        },
                                function () {
                                    location.replace("login.html");
                                });

                    } else if (data == '0') {

                        swal({
                            title: "Old password is wrong. Retry. ",
                            type: "warning",
                            confirmButtonText: "Ok"
                        });
                    }
                },
                error: function () {
                    alert("Error");
                }
            });

        } else {

            swal({
                title: "Error. Different input. Retry.",
                type: "warning",
                confirmButtonText: "Ok"
            });
        }
    });
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}