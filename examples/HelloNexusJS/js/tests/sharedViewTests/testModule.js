define([
	'jquery',
	'Nexus',
	'tests/sharedViewTests/shouldHighlightCorrectSelector',
	'tests/sharedViewTests/shouldRenderErrorCorrectly'		
	
	
],function(
	$,
	Nexus,
	shouldHighlightCorrectSelector,
	shouldRenderErrorCorrectly
){

	var tests = [
		shouldHighlightCorrectSelector,
		shouldRenderErrorCorrectly		
	];
	return new Nexus.TestModule('Shared view tests', tests);	

});