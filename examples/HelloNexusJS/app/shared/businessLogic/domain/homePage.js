define([
	"Nexus",
	'app/shared/businessLogic/config/errorMessages',	
	'app/shared/businessLogic/validators/lengthValidator',
	'app/shared/businessLogic/validators/requiredValidator',
			
	"app/features/displayingHomepage/behavior/events/homePageDisplayed",
	'app/features/sayingIt/events/saidIt',
	'app/features/sayingHello/behavior/events/helloScreenDisplayed',
	'app/shared/behavior/events/errorRaised',
	'app/shared/behavior/events/highlighted'

], function (
	Nexus, 
	ErrorMessages,
	LengthValidator, 	
	RequiredValidator,
	
	HomePageDisplayed, 
	SaidIt, 
	HelloScreenDisplayed, 
	ErrorRaised, 
	Highlighted 
	) {

	return function(){
			
		this.thingToSay = '';
			
		this.load = function(id, date){			
			Nexus.EventBus.publish(HomePageDisplayed.Event(id, date));
		};		
			
		this.sayHello = function(id, date){
			Nexus.EventBus.publish(HelloScreenDisplayed.Event(id, date));			
		};		
		
		this.sayIt = function(selector, date, text){
			// rules to pass to validators
			var validData = {
				minLengthOfText: 3,
				maxLengthOfText: 20
			};
			
			// Nexus.Validatable is created using 3 parameters. 
				// 1) instance of validator 
				// 2) fail function (what to do if validation fails) 
				// 3) fail funciton params [optional]
			var lengthValidatable = new Nexus.Validatable(
				new LengthValidator(text, validData.minLengthOfText, validData.maxLengthOfText), 
				function(){
					var msg = ErrorMessages.EM001(validData.minLengthOfText, validData.maxLengthOfText); 
					Nexus.EventBus.publish(ErrorRaised.Event(msg));
					Nexus.EventBus.publish(Highlighted.Event(selector));					
				}
			);
			
			var requiredValidatable = new Nexus.Validatable(
				new RequiredValidator(text),
				function(){
					var msg = ErrorMessages.EM002;
					Nexus.EventBus.publish(ErrorRaised.Event(msg));
					Nexus.EventBus.publish(Highlighted.Event(selector));							
				}
			);
		
			// Nexus.Validate expects 
				// 1) array of validatables or single validatable 
				// 2) pass function (what to do if all validations pass)
				// 3) pass function params [optional]
			Nexus.Validate(
				[lengthValidatable, requiredValidatable],
				function(){						
					Nexus.EventBus.publish(SaidIt.Event(selector, date, text));
				}
			);
		};
		
		this.applyEvent = function(evt){
			if (evt.eventName == SaidIt.eventName){
				this.thingToSay = evt.text;				
			}
		};		
		
	};
	
	

});

