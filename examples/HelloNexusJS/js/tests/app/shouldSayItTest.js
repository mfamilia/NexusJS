define([
	"Nexus",
	"app/commands/sayIt",
	"app/events/saidIt",
	"app/events/mainScreenDisplayed",
	"app/domain/mainScreen"
], function (Nexus, SayIt, SaidIt, MainScreenDisplayed) {
		
	return function(){
		var id = Nexus.App.newId();
		var date = new Date();
		var text = 'hello';
		var givenEvent = MainScreenDisplayed.Event(id, date); 
		var whenCommand = SayIt.Command(id, date, text);
		var expectEvent = SaidIt.Event(id, date, text);		


		var expectedView = {
			template: 'saidItTemplate.html',
			placeholder: '#output',
			data: expectEvent,
			onLoad: function(){varcssObj={'border':'1pxsolidGray'};$(evt.selector).css(cssObj);}										
		};

		new Nexus
		.Test('Should say it')
		.Given(givenEvent)
		.When(whenCommand)
		.Then(expectEvent)
		.ExpectRenderedView(expectedView)
		.Run();					
	};
			    
});


