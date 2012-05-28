define([
	'jquery',
	"Nexus",
	"app/features/sayingIt/behavior/events/saidIt",
	'app/features/sayingIt/behavior/eventHandlers/saidItHandler'
], function ($, Nexus, SaidIt, saidItHandler) {
	
	var givenEvent = SaidIt.Event('#thingToSay', new Date, 'hello');
	
	var expectedView = new Nexus.View({
		template: 'app/features/sayingIt/ui/templates/saidItTemplate.html',
		placeholder: '#output',
		data: givenEvent,
		onLoad: 
		function(){
			$(evt.selector).removeClass().addClass('textbox');					
		}									
	});	

	return new Nexus
	.ViewTest('Should render saidItTemplate on correct placeholder with correct data and add textbox class to correct selector')
		.GivenEvent(givenEvent)	
		.WhenHandledBy(saidItHandler)
		.ThenExpectView(expectedView);
			   
});
