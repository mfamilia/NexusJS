NexusJS.Tests.HelpersTests = function(){
	module("Helpers Tests");  	
	
	test("should validate multiple validators", function() {
		// Arrange
		var EmailValidator = function(email){
			this.email = email;
			this.isValid = function(){
				return (this.email.indexOf('@') != -1);
			};
		};
		
		var ZipCodeValidator = function(zip){
			this.zip = zip;
			this.isValid = function(){
				return (this.zip.toString().length == 5);
			};
		};						
		
		var myEmailValidator = new EmailValidator('test@test.com');
		var myZipCodeValidator = new ZipCodeValidator(123);
		
		var validators = [myEmailValidator, myZipCodeValidator];
																	
		
		//Act
		var isValid = NexusJS.Helpers.Validation.isValid(validators);

		// Assert
		equal(isValid, false, "should be invalid since zip code is invalid");
														
	});			
	
	
	test("should validate single validator", function() {
		// Arrange
		var EmailValidator = function(email){
			this.email = email;
			this.isValid = function(){
				return (this.email.indexOf('@') != -1);
			};
		};					
		
		var myEmailValidator = new EmailValidator('test@test.com');
	
		//Act
		var isValid = NexusJS.Helpers.Validation.isValid(myEmailValidator);

		// Assert
		equal(isValid, true, "should be valid since email contains @");
														
	});	
};