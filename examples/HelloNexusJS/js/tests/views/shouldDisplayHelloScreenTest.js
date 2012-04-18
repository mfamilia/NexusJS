define([
	"Nexus",
	'app/eventHandlers/helloScreenDisplayedHandler'
], function (Nexus, helloScreenDisplayedHandler) {

	var expectedView = {
		template: 'helloTemplate.html',
		placeholder: '#output'
	};

	return new Nexus
	.ViewTest('Should display hello screen')
		.GivenEventHandler(helloScreenDisplayedHandler)
		.ExpectTemplate(expectedView.tmplate)
		.ExpectPlaceholder(expectedView.placeholder);
			   
});


