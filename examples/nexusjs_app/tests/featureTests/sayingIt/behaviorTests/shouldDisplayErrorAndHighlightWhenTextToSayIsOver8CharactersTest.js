define([
	"Nexus"
], function (Nexus) {
		
	var id = Nexus.newId();
	var date = new Date();
	var text = '1234567890123456789012345678901234567890';
	var selector = '#thingToSay';
	var msg = 'length must be between 3 and 20 characters long';
	
	var mainScreenDisplayedEvent = {
		id: id,
		date: date,
		eventName: 'Main screen displayed'
	};		
	
	var sayItCommand = {
		selector: selector,
		date: date,
		text: text,
		commandName: 'Say it'		
	};
	
	var errorRaisedEvent = {
		msg: msg,
		eventName: 'Error raised'	
	};
	
	var highlightedEvent = {
		selector: selector,
		eventName: 'Highlighted'
	};

	return new Nexus
	.BehaviorTest('Should display error and highlight when text length is over 20 characters long',300)
		.Given(mainScreenDisplayedEvent)
		.When(sayItCommand)
		.Then([errorRaisedEvent, highlightedEvent]);
		    
});


