$(document).ready(function() {
	var dati = "dati="+sessionStorage.getItem("LoggedUser");

$.ajax({
	    type: "POST",
		url: "php/profileRequests.php",
		data: dati,
		dataType: "json",
	    success : function (data) {

		alert(data);
		/*namesurname = data.given_name + " " + data.family_name;
		$(".card-title#profileTitle").html( namesurname);
		$mailsex = $( "<p>Email: " + data.email + "</p><p>Sex: " + data.sex + "</p>");
		$("#profileInfo").html( $mailsex);
*/   },
	     error: function (data) {
		
		//	$err = $("<h2>" + jqXHR.status + " Error: " + textStatus + "</h2>");
		 alert(data);
			/*$err.css({"text-align":"center"});
			$("#profileContainer").html( $err);
			*/
	}
});
});