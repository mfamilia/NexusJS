require([
	'jquery',
	'Nexus',
	'tests/app/shouldDisplayMainScreenTest',
	'tests/app/shouldSayHelloTest',
	'tests/app/shouldSayItTest',
	'tests/app/shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest',
	'tests/app/shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest'
],function(
	$,
	Nexus,
	shouldDisplayMainScreenTest,
	shouldSayHelloTest,
	shouldSayItTest,
	shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
	shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest
){

	$().ready(function(){
		
		$('#runTests').click(function () {	
			$('#nexus-test-runner').html('<h2>Module: All Tests</h2>');

			shouldDisplayMainScreenTest();
			shouldSayHelloTest();
			shouldSayItTest();	
			shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest();
			shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest();
			
		
		}).show();		
		
	});



});