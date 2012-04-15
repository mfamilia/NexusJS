require([
	'jquery',
	'Nexus',
	'tests/app/shouldDisplayHomePageTest',
	'tests/app/shouldSayHelloTest',
	'tests/app/shouldSayItTest',
	'tests/app/shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest',
	'tests/app/shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest',
	'tests/app/shouldRequireToEnterSomethingToSayTest'
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
		
		$('#runTests').click(function () {	
		
			$('#nexus-test-runner').html('');
		
			var tests = [
				shouldDisplayHomePageTest,
				shouldSayHelloTest,
				shouldSayItTest,	
				shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
				shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest,
				shouldRequireToEnterSomethingToSayTest
			];
		
			new Nexus.TestRunner('Hello NexusJS Test Module').run(tests);
		
		}).show();		
		
	});



});