require([
	'jquery',
	'Nexus',	
	'tests/sharedViewTests/testModule',		
	'tests/featureTests/displayingHomepage/testModule',
	'tests/featureTests/sayingHello/testModule',
	'tests/featureTests/sayingIt/testModule'
],function(
	$,
	Nexus,	
	sharedViewTestsTestModule,	
	displayingHomepageTestModule,
	sayingHelloTestModule,
	sayingItTestModule
){

	var testModules = [
		sharedViewTestsTestModule,
		displayingHomepageTestModule,
		sayingHelloTestModule,
		sayingItTestModule
	];

	$().ready(function(){
		$('#runTests').click(function () {	
			$('#nexus-test-results').html('');
			new Nexus.TestRunner('Hello NexusJS Tests').run(testModules);
		}).show();		
	});

});