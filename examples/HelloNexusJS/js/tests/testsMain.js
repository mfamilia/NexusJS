require([
	'jquery',
	'Nexus',
	'tests/app/shouldDisplayMainScreenTest',
	'tests/app/shouldSayHelloTest',
	'tests/app/shouldSayItTest'
],function(
	$,
	Nexus,
	shouldDisplayMainScreenTest,
	shouldSayHelloTest,
	shouldSayItTest
){

	$().ready(function(){
		
		$('#runTests').click(function () {	
			$('#nexus-test-runner').html('<h2>Module: All Tests</h2>');

			shouldDisplayMainScreenTest();
			shouldSayHelloTest();
			shouldSayItTest();	
			
		
		}).show();		
		
	});



});