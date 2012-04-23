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

	var sayingHelloTests = new Array();

	var addBehaviorTests = function(){
		sayingHelloTests.push(
			shouldSayHelloBehaviorTest
		);
	};
	
	var addViewTests = function(){
		sayingHelloTests.push(
			shouldDisplayHelloScreenViewTest
		);
	};	
	
	addBehaviorTests();
	addViewTests();
	return new Nexus.TestModule('Saying hello', sayingHelloTests);	

});