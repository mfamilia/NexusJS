define([
	"Nexus"
], function (Nexus) {
		
	return function(){
		// Arrange
		var id = Nexus.App.newId();
		var date = new Date();
		var text = 'hi';
		var selector = '#thingToSay';
		var msg = 'length must be between 3 and 8 characters long';
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
		var expectedView = {
			onLoad: 
			function(){
				var cssObj = {
					'border':'5px solid red'
				};
				$(evt.selector).css(cssObj); 
			}									
		};

		// Act/Assert
		new Nexus
		.Test('Should display error and highlight when text length is under 3 characters long')
		// Behavior
		.Given(mainScreenDisplayedEvent)
		.When(sayItCommand)
		.Then([errorRaisedEvent, highlightedEvent])
		// UI
		.ExpectView(expectedView)
		.Run();					
	};
			    
});


