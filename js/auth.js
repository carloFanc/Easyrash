function main(){
	login();
	signup();
	reset();
}

function login() {
	$("#checkUser").click(function() {
		var email = $("#email").val();
		var password = $("#psw").val();
		var findUser = false;
		if ((email==0) && (password==0)){
			$("#email").effect("shake");
			// $("#email").css("border","1px solid rgba(255,0,0,0.9)");
			$("#psw").effect("shake");
			// $("#psw").css("border","1px solid rgba(255,0,0,0.9)");
			// alert("credenziali mancanti");
		} else if(password==0){
			$("#psw").effect("shake");
			// $("#psw").css("border","1px solid rgba(255,0,0,0.9)");
		} else if(email==0){
			$("#email").effect("shake");
			// $("#email").css("border","1px solid rgba(255,0,0,0.9)");
		} else if(!validateEmail(email)){
			$("#email").effect("pulsate");
		}
		else {			
			$.getJSON("json/listUsers.json", function(result){
		    	$.each(result, function(i, field){
		    		if((email==field.email) && (password==field.pass)){
		    			sessionStorage.setItem("LoggedUser", i);
			    		location.replace("index.html");
			    		findUser = true;
			    		return false;
		    		}
		    		else {
		    			return true;
		    		}

			        console.log(field);

		    	});
	    	if(findUser===false){
		    		$(".login").html("<div class='alert alert-danger'><a href='javascript:window.location.href=window.location.href' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Utente inesistente!</strong> Riprova inserendo le credenziali corrette</div>");
	    			 
	    		}
			});
			 
		}
	});
}

function signup() {
	$("#checkSignUp").click(function(){
		var name = $("#nameNewUser").val();
		var lastName = $("#lastnameNewUser").val();
		var email = $("#emailNewUser").val();
		var password = $("#pswNewUser").val(); 
		var confirmPsw = $("#confirmpsw").val();
		var genders = document.getElementsByName('gender');
		 
		for(var i = 0; i < genders.length; i++){
        									if(genders[i].checked){
                             									 var sex = genders[i].value;
                             									}
    										   }
		 
		var data_string = 'name='+ name +'&lastName='+ lastName+'&email='+ email+'&lastName='+ lastName+'&password='+ password+'&sex='+ sex;
		 
		if(password != confirmPsw){
			$("#confirmpsw").effect("highlight");
		}
		if(name == 0){
			$("#nameNewUser").effect("highlight");
		}
		if(lastName == 0){
			$("#lastnameNewUser").effect("highlight");
		}
		if(email == 0){
			$("#emailNewUser").effect("highlight");
		}
		if(password == 0){
			$("#pswNewUser").effect("highlight");
		}
		if(confirmPsw == 0){
			$("#confirmpsw").effect("highlight");
		}
		if($("#divGender input:radio:checked").length == 0){
			$("#divGender input:radio").effect("pulsate");
		}
		if(!validateEmail(email) && email != 0){
			$("#emailNewUser").effect("pulsate");
		}
		
		if((password == confirmPsw) && (name != 0) && (lastName != 0) && (validateEmail(email)) && (password != 0) && (confirmPsw != 0) && ($("#divGender input:radio:checked").length > 0)) {
			 $.ajax({                    
  						type: 'POST',
  						url: 'php/registration.php',  
  						data : data_string,
  						dataType: 'html',                   
  						success: function(data){
 							 if(data == '1'){
    							    $(".modal-body").html("<div class='alert alert-success'><strong>Creazione nuovo utente effettuata! Attendi email di verifica.</strong></div>");
   							 }else if(data == '0'){
    							    alert("Errore email gia esistente!");
   							 }
         										}, 
  						error: function(){
  							  alert("Errore invio dati!"); 
  							 	}
					});
		} 

	});
}
function reset(){
	$("#resetField").click(function(){
		$("#nameNewUser").val("");
		$("#lastnameNewUser").val("");
		$("#emailNewUser").val("");
		$("#pswNewUser").val("");
		$("#confirmpsw").val("");
	});
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(function() {
	main();
});
