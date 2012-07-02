define([
	'jquery',
	'Nexus',
	'tests/featureTests/displayingHomepage/behaviorTests/shouldDisplayHomePageBehaviorTest',
	'tests/featureTests/displayingHomepage/viewTests/shouldDisplayHomePageViewTest',
	'tests/featureTests/displayingHomepage/backendTests/shouldCallBackend'
],function(
	$,
	Nexus,
	shouldDisplayHomePageBehaviorTest,
	shouldDisplayHomePageViewTest,
	shouldCallBackend
){

	var tests = [
		shouldDisplayHomePageBehaviorTest,
		shouldDisplayHomePageViewTest,
		shouldCallBackend
	];
	
	return new Nexus.TestModule('Displaying Homepage', tests);	

});