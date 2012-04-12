define([
	"Nexus",
	"app/events/mainScreenDisplayed",
	'app/events/saidIt',
	'app/events/helloScreenDisplayed',
	'app/validators/lengthValidator',
	'app/events/errorRaised',
	'app/events/highlighted'
], function (Nexus, MainScreenDisplayed, SaidIt, HelloScreenDisplayed, LengthValidator, ErrorRaised, Highlighted) {

	return function(){
			
		this.thingToSay = '';
			
		this.start = function(id, date){			
			Nexus.App.EventBus.publish(new MainScreenDisplayed.Event(id, date));
		};		
			
		this.sayHello = function(id, date){
			Nexus.App.EventBus.publish(new HelloScreenDisplayed.Event(id, date));			
		};		
		
		this.sayIt = function(selector, date, text){
			// rules to pass to validators
			var validData = {
				minLengthOfText: 3,
				maxLengthOfText: 8
			};
			
			// Nexus.Validatable is created using 3 parameters. 
				// 1) instance of validator 
				// 2) fail function (what to do if validation fails) 
				// 3) fail funciton params [optional]
			var lengthValidatable = new Nexus.Validatable(
				new LengthValidator(text, validData.minLengthOfText, validData.maxLengthOfText), 
				function(){
					var msg = 'say it must be between ' + validData.minLengthOfText + ' and ' + validData.maxLengthOfText + ' characters long';
					Nexus.App.EventBus.publish(new ErrorRaised.Event(msg));
					Nexus.App.EventBus.publish(new Highlighted.Event(selector));					
				}
			);
			
			// validatables is an array of Nexus.Validatable instances (if you validating for more than one thing
			/*
			var validatables = [
				lengthValidatable				
			];
			*/
		
			// Nexus.Validate expects 
				// 1) array of validatables or single validatable 
				// 2) pass function (what to do if all validations pass)
				// 3) pass function params [optional]
			Nexus.Validate(
				lengthValidatable, 
				function(passFunctionParams){						
					Nexus.App.EventBus.publish(new SaidIt.Event(selector, date, text));
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

