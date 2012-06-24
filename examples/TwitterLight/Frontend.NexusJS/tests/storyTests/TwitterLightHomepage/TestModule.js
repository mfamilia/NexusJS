define([
    'Nexus',
    // Behavior Tests
    'tests/storyTests/TwitterLightHomepage/behaviorTests/ShouldNavigateToHomepage',
    // View Tests
    'tests/storyTests/TwitterLightHomepage/viewTests/ShouldDisplayViewAndPostTweetsOnHomepageView',
    // Generate Route Tests	
    'tests/storyTests/TwitterLightHomepage/routeTests/generateRouteTests/ShouldGenerateHomepageShownRoute',
    // Resolve Route Tests
    'tests/storyTests/TwitterLightHomepage/routeTests/resolveRouteTests/ShouldResolveHomepageShownRoute'
],function(
    Nexus,
    // Behavior Tests
    ShouldNavigateToHomepage,
    // View Tests
    ShouldDisplayViewAndPostTweetsOnHomepageView,
    // Generate Route Tests	
    ShouldGenerateHomepageShownRoute,
    // Resolve Route Tests
    ShouldResolveHomepageShownRoute
){
	var tests = [
		// Behavior Tests
		ShouldNavigateToHomepage,
		// View Tests
		ShouldDisplayViewAndPostTweetsOnHomepageView,
		// Backend Tests
		// Generate Route Tests	
		ShouldGenerateHomepageShownRoute,
		// Resolve Route Tests
		ShouldResolveHomepageShownRoute
	];
	
	return new Nexus.TestModule('Twitter Light Homepage Tests', tests);

});