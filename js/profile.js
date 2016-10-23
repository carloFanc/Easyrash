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
                    alert("User deleted. You will be redirected in login page.")
                    window.location.replace("login.html");
                }
            },
            error: function () {
                alert("Error")
            }
        });
    });

    $("#EmailSubmit").click(function () {
        if ($('input[name=email]').val().localeCompare($('input[name=email_confirm]').val()) === 0) {
            var data_string = 'old_email=' + dati + '&new_email=' + $('input[name=email]').val();

            $.ajax({
                type: 'POST',
                url: 'php/changeProfileEmail.php',
                data: data_string,
                dataType: 'json',
                success: function (data) {
                 
                     if (data == '1') {
                        alert("Email changed! Now you will be redirected in login page ");
                        location.replace("login.html");
                    } else if (data == '0') {
                        alert("Error! email already used!");
                    } 
                },
                error: function () {
                    alert("Error");
                }
            });
        } else {
            alert("Error. Different input. Retry.");
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
                        alert("Password changed! Now you will be redirected in login page ");
                        location.replace("login.html");
                    }else if(data == '0'){
                        alert("Old password is wrong. Retry. ");
                    }
                },
                error: function () {
                    alert("Error");
                }
            });
        } else {
            alert("Error. Different input. Retry.");
        }
    });
});
 