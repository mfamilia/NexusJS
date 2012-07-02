define([
	'Nexus',
	'tests/sharedTests/routeTests/shouldResolveErrorRouteTest',
	'tests/sharedTests/routeTests/shouldGenerateErrorRouteTest'
	
],function(
	Nexus,
	shouldResolveErrorRouteTest,
	shouldGenerateErrorRouteTest
){

	var tests = [
		shouldResolveErrorRouteTest,
		shouldGenerateErrorRouteTest
	];
	return new Nexus.TestModule('Shared route tests', tests);	

});