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
			var givenEvent = new MainScreenDisplayed.Event(id, date); 
			var whenCommand = new SayIt.Command(id, date, text);
			var expectEvent = new SaidIt.Event(id, date, text);		
			
			var expectedOnUI = {
				template: 'saidItTemplate.html',
				placeholder: '#output'			
			};	
			
			new Nexus
				.Test('Should say hello')
					.BeforeTest()
						.Given(givenEvent)
						.When(whenCommand)
						.Then(expectEvent)
					.AfterTest()
				.Run(expectedOnUI,100);		
		};
			    
});


