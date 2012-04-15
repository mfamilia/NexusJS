require([
	'jquery',
	'Nexus',
	'tests/behavior/shouldDisplayHomePageTest',
	'tests/behavior/shouldSayHelloTest',
	'tests/behavior/shouldSayItTest',
	'tests/behavior/shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest',
	'tests/behavior/shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest',
	'tests/behavior/shouldRequireToEnterSomethingToSayTest',
	
	'tests/views/shouldDisplayHelloScreenTest'
],function(
	$,
	Nexus,
	shouldDisplayHomePageTest,
	shouldSayHelloTest,
	shouldSayItTest,
	shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
	shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest,
	shouldRequireToEnterSomethingToSayTest,
	
	shouldDisplayHelloScreenTest
){

	$().ready(function(){
		
		$('#runTests').click(function () {	
		
			$('#nexus-test-runner').html('');
		
			new Nexus.TestRunner('Hello NexusJS - Behavior Tests').run([
				shouldDisplayHomePageTest,
				shouldSayHelloTest,
				shouldSayItTest,	
				shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
				shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest,
				shouldRequireToEnterSomethingToSayTest
			]);
			
			new Nexus.TestRunner('Hello NexusJS - View Tests')
			.run([
				shouldDisplayHelloScreenTest
			]);
		
		}).show();		
		
	});



});