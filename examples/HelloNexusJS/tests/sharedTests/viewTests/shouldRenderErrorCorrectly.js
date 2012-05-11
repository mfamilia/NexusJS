define([
	'jquery',
	"Nexus",
	'app/shared/behavior/eventHandlers/errorRaisedHandler'
], function ($, Nexus, errorRaisedHandler) {
	
	var errorRaisedEvent = {
		msg: 'some error message',
		eventName: 'Error raised'	
	};
	
	var expectedView = {
		template: 'app/shared/ui/templates/errorTemplate.html',
		placeholder: '#output',
		data: errorRaisedEvent			
	};


	return new Nexus
	.ViewTest('Should render error correctly')
		.GivenEvent(errorRaisedEvent)	
		.GivenEventHandler(errorRaisedHandler)
		.ExpectTemplate(expectedView.template)
		.ExpectPlaceholder(expectedView.placeholder)
		.ExpectData(expectedView.data);
			   
});
