require([
	'jquery',
	'Nexus',
	
	'tests/sharedTests/viewTests/testModule',
	'tests/sharedTests/routeTests/testModule',
	'tests/featureTests/displayingHomepage/testModule',
	'tests/featureTests/sayingHello/testModule',
	'tests/featureTests/sayingIt/testModule',
	
	'NexusTF'
	
],function(
	$,
	Nexus,

	sharedViewTestsTestModule,
	sharedRouteTestsTestModule,
	displayingHomepageTestModule,
	sayingHelloTestModule,
	sayingItTestModule
){

	var testModules = [
		sharedViewTestsTestModule,
		sharedRouteTestsTestModule,
		displayingHomepageTestModule,
		sayingHelloTestModule,
		sayingItTestModule
	];

	$().ready(function(){
		$('#runTests').click(function () {	
			$('#nexus-test-results').html('');
			new Nexus.TestRunner('Running Tests').run(testModules);
		}).show();		
	});

});