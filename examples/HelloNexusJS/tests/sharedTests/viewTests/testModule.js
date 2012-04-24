define([
	'jquery',
	'Nexus',
	'tests/sharedTests/viewTests/shouldHighlightCorrectSelector',
	'tests/sharedTests/viewTests/shouldRenderErrorCorrectly'		
	
	
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