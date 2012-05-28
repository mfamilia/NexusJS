define([
	'jquery',
	'Nexus',
	'tests/featureTests/sayingHello/behaviorTests/shouldSayHelloBehaviorTest',
	'tests/featureTests/sayingHello/viewTests/shouldDisplayHelloScreenViewTest',
    	'tests/featureTests/sayingHello/backendTests/shouldSendHelloToBackend'

],function(
	$,
	Nexus,
	shouldSayHelloBehaviorTest,
	shouldDisplayHelloScreenViewTest,
    	shouldSendHelloToBackend
){

	var tests = [
		shouldSayHelloBehaviorTest,
		shouldDisplayHelloScreenViewTest,
        	shouldSendHelloToBackend
	];

	return new Nexus.TestModule('Saying hello', tests);	

});