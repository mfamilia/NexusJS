define([
	"Nexus",
	'app/eventHandlers/helloScreenDisplayedHandler'
], function (Nexus, helloScreenDisplayedHandler) {

	var expectedView = {
		template: 'helloTemplate.html',
		placeholder: '#output'
	};

	return new Nexus
	.ViewTest('Should display hello screen', 300)
		.GivenEventHandler(helloScreenDisplayedHandler)
		.ExpectTemplate(expectedView.template)
		.ExpectPlaceholder(expectedView.placeholder);
			   
});


