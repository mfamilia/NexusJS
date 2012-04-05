require([
	'jquery',
	'Nexus',
	'qunit',
	'tests/app/shouldDisplayMainScreenTest',
	'tests/app/shouldSayHelloTest'	
],function(
	$,
	Nexus,
	QUnit,
	shouldDisplayMainScreenTest,
	shouldSayHelloTest
){

	$('#runTests').click(function () {
		shouldDisplayMainScreenTest();
		shouldSayHelloTest();
	});
});