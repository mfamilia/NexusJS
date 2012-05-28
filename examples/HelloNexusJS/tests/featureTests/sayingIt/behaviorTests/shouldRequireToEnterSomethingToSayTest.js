define([
	"Nexus",
	"app/features/displayingHomepage/behavior/events/homePageDisplayed",
	"app/features/sayingIt/behavior/commands/sayIt",
	"app/shared/behavior/events/errorRaised",
	"app/shared/behavior/events/highlighted"
], function (Nexus, HomePageDisplayed, SayIt, ErrorRaised, Highlighted) {
		
	var id = Nexus.newId();
	var date = new Date();
	var selector = '#thingToSay';
	var msg = 'this field is required';
	
	var givenEvent = HomePageDisplayed.Event(id, date);
	
	var command = SayIt.Command(selector, date); // text is not passed
		
	var expectEvents = [
		ErrorRaised.Event(msg),
		Highlighted.Event(selector)
	];

	return new Nexus
	.BehaviorTest('Should require to enter something to say',300)
		.Given(givenEvent)
		.When(command)
		.Then(expectEvents);
			    
});


