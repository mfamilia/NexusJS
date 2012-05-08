define([
	'Nexus',
	'tests/sharedTests/routeTests/errorRouteTest'		
],function(
	Nexus,
	errorRouteTest
){

	var tests = [
		errorRouteTest
	];
	return new Nexus.TestModule('Shared route tests', tests);	

});