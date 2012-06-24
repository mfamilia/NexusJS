define([
	'Nexus',
	// Behavior Tests
       'tests/storyTests/PostATweet/behaviorTests/ShouldLetUserPostATweet',
    'tests/storyTests/PostATweet/behaviorTests/ShouldFillOutTheFormAndPostATweet',
    'tests/storyTests/PostATweet/behaviorTests/ShouldNotPostEmptyTweet',
    'tests/storyTests/PostATweet/behaviorTests/ShouldValidateMinimumTweetLength',
    
    
   // View Tests
    'tests/storyTests/PostATweet/viewTests/ShouldShowPostATweetFormView',
    'tests/storyTests/PostATweet/viewTests/ShouldShowThanksForYourTweetView',
    'tests/storyTests/PostATweet/viewTests/ShouldShowPostTweetErrorView',
    
   // Backend Tests
    'tests/storyTests/PostATweet/backendTests/ShouldCallSaveTweetAPI',
   // Generate Route Tests	
    'tests/storyTests/PostATweet/routeTests/generateRouteTests/ShouldGenerateThanksForYourTweetPageShownRoute',
    'tests/storyTests/PostATweet/routeTests/generateRouteTests/ShouldGeneratePostATweetFormShownRoute',
    'tests/storyTests/PostATweet/routeTests/generateRouteTests/ShouldGenerateSaveTweetRoute',
   // Resolve Route Tests
    'tests/storyTests/PostATweet/routeTests/resolveRouteTests/ShouldResolveThanksForYourTweetPageShownRoute',
    'tests/storyTests/PostATweet/routeTests/resolveRouteTests/ShouldResolvePostATweetFormShownRoute',
    'tests/storyTests/PostATweet/routeTests/resolveRouteTests/ShouldResolveSaveTweetRoute'
],function(
	Nexus,
	// Behavior Tests
    ShouldLetUserPostATweet,
    ShouldFillOutTheFormAndPostATweet,
    ShouldNotPostEmptyTweet,
    ShouldValidateMinimumTweetLength,
   // View Tests
    ShouldShowPostATweetFormView,
    ShouldShowThanksForYourTweetView,
    ShouldShowPostTweetErrorView,
   // Backend Tests
    ShouldCallSaveTweetAPI,
   // Generate Route Tests	
    ShouldGenerateThanksForYourTweetPageShownRoute,
    ShouldGeneratePostATweetFormShownRoute,
    ShouldGenerateSaveTweetRoute,
   // Resolve Route Tests
    ShouldResolveThanksForYourTweetPageShownRoute,
    ShouldResolvePostATweetFormShownRoute,
    ShouldResolveSaveTweetRoute
    
){

	var tests = [
		// Behavior Tests
	    ShouldLetUserPostATweet,
	    ShouldFillOutTheFormAndPostATweet,
	    ShouldNotPostEmptyTweet,
	    ShouldValidateMinimumTweetLength,
	   // View Tests
	    ShouldShowPostATweetFormView,
	    ShouldShowThanksForYourTweetView,
	    ShouldShowPostTweetErrorView,
	   // Backend Tests
	    ShouldCallSaveTweetAPI,
	   // Generate Route Tests	
	    ShouldGenerateThanksForYourTweetPageShownRoute,
	    ShouldGeneratePostATweetFormShownRoute,
	    //ShouldGenerateSaveTweetRoute,
	   // Resolve Route Tests
	    ShouldResolveThanksForYourTweetPageShownRoute,
	    ShouldResolvePostATweetFormShownRoute
	    //ShouldResolveSaveTweetRoute
	];
	
	return new Nexus.TestModule('Post a tweet Tests', tests);

});