require([
	'jquery',
	'Nexus',
       'tests/storyTests/TwitterLightHomepage/testModule',	
    'tests/storyTests/ViewTweets/testModule',	
    'tests/storyTests/PostATweet/testModule',	
	'NexusTF'	
],function(
	$,
	Nexus,
    TwitterLightHomepage,	
    ViewTweets,	
    PostATweet	
){

	var testModules = [
	    TwitterLightHomepage,	
	    ViewTweets,	
	    PostATweet	
	];

	$().ready(function(){
		$('#runTests').click(function () {	
			$('#nexus-test-results').html('');
			new Nexus.TestRunner('Running Tests').run(testModules);
		}).show();		
	});

});