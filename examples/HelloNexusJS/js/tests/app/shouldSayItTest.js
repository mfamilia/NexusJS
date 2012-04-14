define([
	"Nexus"
], function (Nexus) {
		
	return function(){
		// Arrange
		var id = Nexus.App.newId();
		var date = new Date();
		var text = 'hello';
		var selector = '#thingToSay';
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
		var saidItEvent = {
			selector: selector,
			date: date,
			text: text,
			eventName: 'Said it'		
		};
		var expectedView = {
			template: 'saidItTemplate.html',
			placeholder: '#output',
			data: saidItEvent,
			onLoad: 
			function(){
				$(evt.selector).removeClass().addClass('textbox');					
			}									
		};

		// Act/Assert
		new Nexus
		.Test('Should say it')
		// Behavior
		.Given(mainScreenDisplayedEvent)
		.When(sayItCommand)
		.Then(saidItEvent)
		// UI
		.ExpectView(expectedView)
		.Run();					
	};
			    
});


