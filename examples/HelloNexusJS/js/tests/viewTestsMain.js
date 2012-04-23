require([
	'jquery',
	'Nexus',
	'tests/viewTests/shouldDisplayHelloScreenViewTest',
	'tests/viewTests/shouldDisplayHomePageViewTest',
	'tests/viewTests/shouldSayItViewTest'
],function(
	$,
	Nexus,
	shouldDisplayHelloScreenViewTest,
	shouldDisplayHomePageViewTest,
	shouldSayItViewTest
){

	$().ready(function(){
		
		$('#runViewTests').click(function () {	
		
			$('#nexus-test-results').html('');
		
			var testModules = [
				
				new Nexus.TestModule('Hello NexusJS - View Tests',
				[
					shouldDisplayHomePageViewTest,				
					shouldDisplayHelloScreenViewTest,
					shouldSayItViewTest
				])					
			
			];
			
			new Nexus.TestRunner('VIEW TEST RUNNER').run(testModules);
		
		}).show();		
		
	});

});