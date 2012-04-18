require([
	'jquery',
	'Nexus',
	'tests/behavior/shouldDisplayHomePageTest',
	'tests/behavior/shouldSayHelloTest',
	'tests/behavior/shouldSayItTest',
	'tests/behavior/shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest',
	'tests/behavior/shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest',
	'tests/behavior/shouldRequireToEnterSomethingToSayTest',
	
	'tests/views/shouldDisplayHelloScreenTest',
	'tests/views/shouldDisplayHomePageTest'
],function(
	$,
	Nexus,
	shouldDisplayHomePageTest,
	shouldSayHelloTest,
	shouldSayItTest,
	shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
	shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest,
	shouldRequireToEnterSomethingToSayTest,
	
	shouldDisplayHelloScreenTest,
	shouldDisplayHomePageViewTest
){

	$().ready(function(){
		
		$('#runTests').click(function () {	
		
			$('#nexus-test-results').html('');
		
			var testModules = [
		
	
		
/*
				new Nexus.TestModule('Hello NexusJS - Behavior Tests',
				[
					shouldDisplayHomePageTest,
					shouldSayHelloTest,
					shouldSayItTest,	
					shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
					shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest,
					shouldRequireToEnterSomethingToSayTest
				]),
*/
				
				new Nexus.TestModule('Hello NexusJS - View Tests',
				[
					shouldDisplayHomePageViewTest,				
					shouldDisplayHelloScreenTest

				])					

			
			];
			
			new Nexus.TestRunner('TEST RUNNER').run(testModules);
		
		}).show();		
		
	});



});