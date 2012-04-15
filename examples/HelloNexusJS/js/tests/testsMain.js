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
			$('#nexus-test-runner').html('<h2>Module: All Tests</h2>');

			var tests = [
				shouldDisplayHomePageTest,
				shouldSayHelloTest,
				shouldSayItTest,	
				shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
				shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest,
				shouldRequireToEnterSomethingToSayTest
			];
		
			new Nexus.TestRunner('module 1').run(tests);
		
		}).show();		
		
	});



});