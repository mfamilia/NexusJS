define([
	"Nexus",
	"app/commands/displayMainScreen",
	"app/events/mainScreenDisplayed"
], function (Nexus, DisplayMainScreen, MainScreenDisplayed) {

	return function () {	
		// setup for behavior tests
		var id = Nexus.App.newId();
		var date = new Date();
		var whenCommand = new DisplayMainScreen.Command(id, date);
		var expectEvents = new MainScreenDisplayed.Event(id, date);

		// setup for ui						
		var expectedOnUI = {
			template: 'mainScreen.html', // template to be rendered
			placeholder: '#body' // where should it be rendered
		};			

		new Nexus
			// test name that will show up in the qunit runner
			.Test('Should display main screen')
				// any additional setup that would run before test
				.BeforeTest()
					//tests behavior (given events happend, when command is executed, expect events to have happened)
					.Given()
					.When(whenCommand)
					.Then(expectEvents)
				// any tear down that should run after test
				.AfterTest()
			// runs and tests ui
			.Run(expectedOnUI);		
	};
			    
});


