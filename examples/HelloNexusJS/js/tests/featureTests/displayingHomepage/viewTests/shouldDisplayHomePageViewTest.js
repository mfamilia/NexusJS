define([
	'jquery',
	"Nexus",
	'app/features/displayingHomepage/eventHandlers/homePageDisplayedHandler',
	'app/features/sayingHello/commands/sayHello',
	'app/features/sayingIt/commands/sayIt'
], function ($, Nexus, homePageDisplayedHandler, SayHello, SayIt) {


	var expectedView = {
		template: 'app/features/displayingHomepage/templates/homePageTemplate.html', // template to be rendered
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
			  				
	};


	return new Nexus
	.ViewTest('Should display home page', 200)
		.GivenEventHandler(homePageDisplayedHandler)
		.ExpectTemplate(expectedView.template)
		.ExpectPlaceholder(expectedView.placeholder)
		.ExpectOnLoad(expectedView.onLoad);
			   
});


