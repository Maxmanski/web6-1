$(document).ready(function(){
		
		var newlyOpened = true;
		$("input[type='submit']").attr("disabled", "disabled");
		
		// checks if the username is valid
		function validateUser(){
			var username = $("#username").val();
			if(username=="" || username.length <4 || username.length >8){
				$("#username").addClass("wrong");
				return false;
			}else{
				$("#username").removeClass("wrong");
			}
			return true;
		}
		
		// checks if the password is valid
		function validatePassword(){
			var password = $("#password").val();
			
			if(password==""|| password.length <4 || password.length >8){
				$("#password").addClass("wrong");
				return false;
			}else{
				$("#password").removeClass("wrong");
			}
			return true;
		}
		
		// checks if the birthday is valid
		function validateBirthday(){
			var inDate = getNormalizedDateString("#birthday");
			
			// check against regex
			if(inDate != "" && inDate.match(/^\d{1,2}.\d{1,2}.(\d{2}|\d{4})$/i) == null){
				// did not match
				$("#birthday").addClass("wrong");
				return false;
			}
			$("#birthday").removeClass("wrong");
			return true;
		}
		
		// checks if the form is submittable (valid)
		// and enables/disables the submit button accordingly
		function checkSubmittable(){
			if(!newlyOpened){
				if(validateUser() && validatePassword() && validateBirthday()){
					$("input[type='submit']").removeAttr("disabled");
				}else{
					$("input[type='submit']").attr("disabled", "disabled");
				}
			}
			newlyOpened = false;
		}
		
		// set up keyUp actions for any textual input fields
		$("input[type='text']").keyup(checkSubmittable);
		$("input[type='password']").keyup(checkSubmittable);
		$("input[type='date']").keyup(checkSubmittable);
		
		// Validation on Submit
		// if TRUE is returned, submit will take place
		// else, submit will be cancelled
		$("#register").submit(function(event){
		event.preventDefault();
			
			if(!hasFormValidation()){
				var usrOk, pwOk, bdOk;
				// must validate everything via JavaScript
				usrOk = validateUser();
				pwOk = validatePassword();
				bdOk = validateBirthday();
				
				if(!pwOk && !usrOk && !bdOk){
					$("#errormsg").html("Benutzername, Passwort und Geburtstag sind nicht gueltig.");
					return false;
				}else if(!usrOk && !pwOk){
					$("#errormsg").html("Benutzername und Passwort sind nicht gueltig.");
					return false;
				}else if(!usrOk && !bdOk){
					$("#errormsg").html("Benutzername und Geburtstag sind nicht gueltig.");
					return false;
				}else if(!pwOk && !bdOk){
					$("#errormsg").html("Passwort und Geburtstag sind nicht gueltig.");
					return false;
				}else if(!usrOk){
					$("#errormsg").html("Benutzername ist nicht gueltig.");
					return false;
				}else if(!pwOk){
					$("#errormsg").html("Passwort ist nicht gueltig.");
					return false;
				}else if(!bdOk){
					$("#errormsg").html("Geburtstag ist nicht gueltig.");
					return false;
				}
				
			}else{
	
				if(!hasNativeDateInput()){
					// must validate 
					if(!validateBirthday()){
						return false;
					}
				}
			}
	
			alert("Form validation success");
			
			return true;
		});
});
