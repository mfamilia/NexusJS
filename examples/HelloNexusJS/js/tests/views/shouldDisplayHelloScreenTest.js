define([
	"Nexus",
	'app/eventHandlers/helloScreenDisplayedHandler'
], function (Nexus, helloScreenDisplayedHandler) {

	return new Nexus
	.ViewTest('Should display hello screen',300)
		.GivenEventHandler(helloScreenDisplayedHandler)
		.ExpectTemplate('helloTemplate.html')
		.ExpectPlaceholder('#output');
			   
});


