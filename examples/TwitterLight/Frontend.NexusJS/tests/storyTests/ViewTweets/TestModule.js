define([
	'Nexus',
	// Behavior Tests
       'tests/storyTests/ViewTweets/behaviorTests/ShouldViewTweets',
   // View Tests
    'tests/storyTests/ViewTweets/viewTests/ShouldDisplayAllTweetsView',
   // Backend Tests
   // Generate Route Tests	
    'tests/storyTests/ViewTweets/routeTests/generateRouteTests/ShouldGenerateTweetsShownRoute',
   // Resolve Route Tests
    'tests/storyTests/ViewTweets/routeTests/resolveRouteTests/ShouldResolveTweetsShownRoute'
],function(
	Nexus,
	// Behavior Tests
    ShouldViewTweets,
   // View Tests
    ShouldDisplayAllTweetsView,
   // Backend Tests
   // Generate Route Tests	
    ShouldGenerateTweetsShownRoute,
   // Resolve Route Tests
    ShouldResolveTweetsShownRoute
){

	var tests = [
		// Behavior Tests
	    ShouldViewTweets,
	   // View Tests
	    ShouldDisplayAllTweetsView,
	   // Backend Tests
	   // Generate Route Tests	
	    ShouldGenerateTweetsShownRoute,
	   // Resolve Route Tests
	    ShouldResolveTweetsShownRoute
	];
	
	return new Nexus.TestModule('View tweets Tests', tests);

});