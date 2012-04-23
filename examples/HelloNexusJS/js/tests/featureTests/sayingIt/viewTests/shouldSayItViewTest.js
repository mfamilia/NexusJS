define([
	'jquery',
	"Nexus",
	'app/eventHandlers/saidItHandler'
], function ($, Nexus, saidItHandler) {
	
	var eventToHandle = {
		selector: '#thingToSay',
		date: new Date,
		text: 'hello',
		eventName: 'Said it'		
	};
	
	var expectedView = {
		template: 'saidItTemplate.html',
		placeholder: '#output',
		data: eventToHandle,
		onLoad: 
		function(){
			$(evt.selector).removeClass().addClass('textbox');					
		}									
	};	

	return new Nexus
	.ViewTest('Should render saidItTemplate on correct placeholder with correct data and add textbox class to correct selector')
		.GivenEvent(eventToHandle)	
		.GivenEventHandler(saidItHandler)
		.ExpectTemplate(expectedView.template)
		.ExpectPlaceholder(expectedView.placeholder)
		.ExpectData(expectedView.data)
		.ExpectOnLoad(expectedView.onLoad);
			   
});
