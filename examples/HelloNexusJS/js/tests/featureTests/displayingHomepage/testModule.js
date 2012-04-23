define([
	'jquery',
	'Nexus',
	'tests/featureTests/displayingHomepage/behaviorTests/shouldDisplayHomePageBehaviorTest',
	'tests/featureTests/displayingHomepage/viewTests/shouldDisplayHomePageViewTest'
],function(
	$,
	Nexus,
	shouldDisplayHomePageBehaviorTest,
	shouldDisplayHomePageViewTest
){

	var displayingHomePageTests = new Array();

	var addBehaviorTests = function(){
		displayingHomePageTests.push(
			shouldDisplayHomePageBehaviorTest
		);
	};
	
	var addViewTests = function(){
		displayingHomePageTests.push(
			shouldDisplayHomePageViewTest
		);
	};	
	
	addBehaviorTests();
	addViewTests();
	return new Nexus.TestModule('Displaying Homepage', displayingHomePageTests);	

});