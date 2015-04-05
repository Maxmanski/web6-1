
$(document).ready(function(){
	$("#register").submit(function(event){
    event.preventDefault();
        
		if(!hasFormValidation()){
			// must validate everything via JavaScript
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
		}else{

			if(!hasNativeDateInput()){
				// must validate 
				var inDate = $("#birthday").val();
				if(inDate != "" && inDate.match(/^\d{1,2}.\d{1,2}.(\d{2}|\d{4})$/i) == null){
					// did not match
					$("#birthday").addClass("wrong");
					return false;
				}
			}
		}

		alert("Form validation success");
		/*var name = "You";
		name = $("#firstName").val();
		alert(name);*/

		/* TRIGGER SUBMIT HERE*/
		return true;
	});
});