define(['Nexus'],function(Nexus){

	Nexus.Tests.HelpersTests = function(){
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
		
			var isValid = false;
		
			var validatables = [
				new Nexus.Validatable(myEmailValidator, function(){isValid=false;}),
				new Nexus.Validatable(myZipCodeValidator, function(){isValid=false;})
			];
																		
			
			//Act
			Nexus.Validate(validatables, function(){isValid = true;});
	
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
			
			var isValid = false;			
			var validatable = new Nexus.Validatable(myEmailValidator, function(){isValid=false;})
		
			//Act
			Nexus.Validate(validatable, function(){isValid = true;});
				
			// Assert
			equal(isValid, true, "should be valid since email contains @");
															
		});	
	};

return Nexus.Tests.HelpersTests;
});

