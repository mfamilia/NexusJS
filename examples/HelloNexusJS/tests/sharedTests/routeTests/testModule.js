define([
	'Nexus',
	'tests/sharedTests/routeTests/errorRouteTest',
	'tests/sharedTests/routeTests/shouldGenerateErrorRouteTest'
	
],function(
	Nexus,
	errorRouteTest,
	shouldGenerateErrorRouteTest
){

	var tests = [
		errorRouteTest,
		shouldGenerateErrorRouteTest
	];
	return new Nexus.TestModule('Shared route tests', tests);	

});