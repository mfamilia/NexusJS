define([
	"Nexus",
	'app/features/sayingHello/eventHandlers/helloScreenDisplayedHandler'
], function (Nexus, helloScreenDisplayedHandler) {

	var expectedView = {
		template: 'app/features/sayingHello/templates/helloTemplate.html',
		placeholder: '#output'
	};

	return new Nexus
	.ViewTest('Should display hello screen', 300)
		.GivenEventHandler(helloScreenDisplayedHandler)
		.ExpectTemplate(expectedView.template)
		.ExpectPlaceholder(expectedView.placeholder);
			   
});


