require([
	'jquery',
	'Nexus',
	'tests/behavior/shouldDisplayHomePageTest',
	'tests/behavior/shouldSayHelloTest',
	'tests/behavior/shouldSayItTest',
	'tests/behavior/shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest',
	'tests/behavior/shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest',
	'tests/behavior/shouldRequireToEnterSomethingToSayTest'
],function(
	$,
	Nexus,
	shouldDisplayHomePageTest,
	shouldSayHelloTest,
	shouldSayItTest,
	shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
	shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest,
	shouldRequireToEnterSomethingToSayTest
){

	$().ready(function(){
		
		$('#runBehaviorTests').click(function () {	
		
			$('#nexus-test-results').html('');
		
			var testModules = [
		
				new Nexus.TestModule('Hello NexusJS - Behavior Tests [Home Page & Hello Module]',
				[
					shouldDisplayHomePageTest,
					shouldSayHelloTest
				]),
				
				new Nexus.TestModule('Hello NexusJS - Behavior Tests [Should Say It Module]',
				[
					shouldSayItTest,	
					shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
					shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest,
					shouldRequireToEnterSomethingToSayTest
				])									

			];
			
			new Nexus.TestRunner('BEHAVIOR TEST RUNNER').run(testModules);
		
		}).show();		
		
	});



});