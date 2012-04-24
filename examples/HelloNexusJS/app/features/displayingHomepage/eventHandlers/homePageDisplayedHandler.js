define([
	'jquery',
	'Nexus',
	"app/features/displayingHomepage/events/homePageDisplayed",
	'app/features/sayingHello/commands/sayHello',
	'app/features/sayingIt/commands/sayIt'
], function ($, Nexus, HomePageDisplayed, SayHello, SayIt) {
	
	return new Nexus.EventHandler(
		'Home page displayed event handler',
		HomePageDisplayed.eventName,
		function(evt){
								
			new Nexus.View({
				template: 'app/features/displayingHomepage/templates/homePageTemplate.html',
				placeholder: '#body',		
				onLoad: function(){
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
			.render();			
		}	
	);
	
});