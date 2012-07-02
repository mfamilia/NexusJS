define([
	"Nexus",
], function (Nexus) {

	var id = Nexus.newId();
	var date = new Date();
			
	var homePageDisplayedEvent = {
		id: id,
		date: date,
		eventName: 'Home page displayed'
	};
	
	var displayHomePageCommand = {
		id: id,
		date: date,
		commandName: "Display home page"
	};		

	return new Nexus
	.BehaviorTest('Should load home page', 500) // 500 is # of milliseconds to wait before asserting (for async tests) … this one doesn't need it but it's here as an example
		.Given()
		.When(displayHomePageCommand)
		.Then(homePageDisplayedEvent);
			    
});


