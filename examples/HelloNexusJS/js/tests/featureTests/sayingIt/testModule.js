define([
	'jquery',
	'Nexus',
	'tests/featureTests/sayingIt/behaviorTests/shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest',
	'tests/featureTests/sayingIt/behaviorTests/shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest',
	'tests/featureTests/sayingIt/behaviorTests/shouldRequireToEnterSomethingToSayTest',
	'tests/featureTests/sayingIt/behaviorTests/shouldSayItTest',
				
	'tests/featureTests/sayingIt/viewTests/shouldSayItViewTest'
	
	
],function(
	$,
	Nexus,
	shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest,
	shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
	shouldRequireToEnterSomethingToSayTest,
	shouldSayItTest,
	
	shouldSayItViewTest
){

	var tests = [
		shouldDisplayErrorAndHighlightWhenTextToSayIsOver8CharactersTest,
		shouldDisplayErrorAndHighlightWhenTextToSayIsUnder3CharactersTest,
		shouldRequireToEnterSomethingToSayTest,
		shouldSayItTest,
		
		shouldSayItViewTest
	];
	return new Nexus.TestModule('Saying It', tests);	

});