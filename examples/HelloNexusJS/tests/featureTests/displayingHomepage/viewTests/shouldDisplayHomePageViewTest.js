define([
	'jquery',
	"Nexus",
	"app/features/displayingHomepage/behavior/events/homePageDisplayed",
	'app/features/displayingHomepage/behavior/eventHandlers/homePageDisplayedHandler',
	'app/features/sayingHello/behavior/commands/sayHello',
	'app/features/sayingIt/behavior/commands/sayIt'
], function ($, Nexus, HomePageDisplayed, homePageDisplayedHandler, SayHello, SayIt) {


	var givenEvent = HomePageDisplayed.Event();

	var expectedView = 
		new Nexus.View({
			template: 'app/features/displayingHomepage/ui/templates/homePageTemplate.html', // template to be rendered
			placeholder: '#body', // where should it be rendered
			onLoad: // what should execute on view load
			function(){
				$('#sayHello').click(function () {
					Nexus.CommandBus.dispatch(
						SayHello.Command(Nexus.newId(), new Date)		
					);	
				});
				$('#sayIt').click(function () {
					var text = $('#thingToSay').val();
					Nexus.CommandBus.dispatch(
						SayIt.Command('#thingToSay', new Date, text)
					);		
				});						
			}	

		})


	return new Nexus
	.ViewTest('Should display home page', 200)
		.GivenEvent(givenEvent)
		.WhenHandledBy(homePageDisplayedHandler)
		.ThenExpectView(expectedView);
			   
});


