$(document).ready(function () {
    var dati = sessionStorage.getItem("LoggedUser");
 
     if($("#tab1").empty()){
         $.ajax({
        type: 'POST',
        url: 'php/profileRequests.php',
        data: {dati: dati},
        success: function (data) {
            var res = data.split(";");
            html = "<div> Name: " + res[0] + "</br> Surname: " + res[1] + "</br> Email: " + res[2] + "</br> Password: " + res[3] + "</br> Sex: " + res[4] + "</div>";
            $("#tab1").html(html);
        },
        error: function () {
            alert("errore recupero dati");
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
         var data_string = 'new_email='+ $('input[name=email]').val();
        
        $.ajax({
                type: 'POST',
                url: 'php/changeProfileEmail.php',
                data: data_string,
                dataType: 'html',
                success: function(data){
                    alert(data);
                if (data === '1'){ 
                alert("Email Sostituita!");
                } else if(data === '0'){
                alert("Errore email gia esistente!");
                    }
            },
                error: function () {
                        alert("Error");
                        }
                });
          } else{
                 alert("Error. Different input. Retry.");
      }

    });
});