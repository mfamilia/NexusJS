define([
	'jquery',
	"Nexus",
	'app/eventHandlers/homePageDisplayedHandler',
	'app/commands/sayHello',
	'app/commands/sayIt'
], function ($, Nexus, homePageDisplayedHandler, SayHello, SayIt) {


	var expectedView = {
		template: 'homePageTemplate.html', // template to be rendered
		placeholder: '#body', // where should it be rendered
		onLoad: // what should execute on view load
		function(){
			$('#sayHello').click(function () {
				Nexus.App.CommandBus.dispatch(
					SayHello.Command(Nexus.App.newId(), new Date)		
				);	
			});
			$('#sayIt').click(function () {
				var text = $('#thingToSay').val();
				Nexus.App.CommandBus.dispatch(
					SayIt.Command('#thingToSay', new Date, text)
				);		
			});						
		}	
			  				
	};


	return new Nexus
	.ViewTest('Should display home page',500)
		.GivenEventHandler(homePageDisplayedHandler)
		.ExpectTemplate(expectedView.template)
		.ExpectPlaceholder(expectedView.placeholder)
		.ExpectOnLoad(expectedView.onLoad);
			   
});


