$(document).ready(function(){
		
		$("input[type='submit']").attr("disabled", "disabled");
		
		// checks if the username and password are valid
		function validateUserAndPassword(){
			var username = $("#username").val();
			var password = $("#password").val();
			if(username=="" || username.length <4 || username.length >8){
				$("#username").addClass("wrong");
				return false;
			}else{
				$("#username").removeClass("wrong");
			}
			
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
			var inDate = $("#birthday").val();
			
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
			if(validateUserAndPassword() && validateBirthday()){
				$("input[type='submit']").removeAttr("disabled");
			}else{
				$("input[type='submit']").attr("disabled", "disabled");
			}
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
				// must validate everything via JavaScript
				var success = validateUserAndPassword();
				success = success && validateBirthday();
				if(!success){
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