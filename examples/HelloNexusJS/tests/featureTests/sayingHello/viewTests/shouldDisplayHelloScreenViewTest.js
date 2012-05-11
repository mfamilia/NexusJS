define([
	"Nexus",
	'app/features/sayingHello/behavior/eventHandlers/helloScreenDisplayedHandler'
], function (Nexus, helloScreenDisplayedHandler) {

	var expectedView = {
		template: 'app/features/sayingHello/ui/templates/helloTemplate.html',
		placeholder: '#output'
	};

	return new Nexus
	.ViewTest('Should display hello screen', 300)
		.GivenEventHandler(helloScreenDisplayedHandler)
		.ExpectTemplate(expectedView.template)
		.ExpectPlaceholder(expectedView.placeholder);
			   
});


