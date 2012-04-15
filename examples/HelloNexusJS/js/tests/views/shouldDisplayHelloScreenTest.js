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
		.ExpectTemplate('helloTemplate.html')
		.ExpectPlaceholder('#output');
			   
});


