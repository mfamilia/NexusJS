define([
	"Nexus"
], function (Nexus) {
		
	var id = Nexus.App.newId();
	var date = new Date();
	var selector = '#thingToSay';
	var msg = 'this field is required';
	var mainScreenDisplayedEvent = {
		id: id,
		date: date,
		eventName: 'Main screen displayed'
	};		
	var sayItCommand = {
		selector: selector,
		date: date,
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
	.BehaviorTest('Should require to enter something to say',300)
		.Given(mainScreenDisplayedEvent)
		.When(sayItCommand)
		.Then([errorRaisedEvent, highlightedEvent]);
			    
});


