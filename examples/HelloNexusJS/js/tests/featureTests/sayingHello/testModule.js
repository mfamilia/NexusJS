define([
	'jquery',
	'Nexus',
	'tests/featureTests/sayingHello/behaviorTests/shouldSayHelloBehaviorTest',
	'tests/featureTests/sayingHello/viewTests/shouldDisplayHelloScreenViewTest'
],function(
	$,
	Nexus,
	shouldSayHelloBehaviorTest,
	shouldDisplayHelloScreenViewTest
){

	var tests = [
		shouldSayHelloBehaviorTest,
		shouldDisplayHelloScreenViewTest	
	];

	return new Nexus.TestModule('Saying hello', tests);	

});