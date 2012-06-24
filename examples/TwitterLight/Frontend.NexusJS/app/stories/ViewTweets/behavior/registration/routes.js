define([
	"Nexus",
       'app/stories/ViewTweets/behavior/events/TweetsShown'
], function (Nexus,
		    TweetsShown
) {

	return {
		register: function(){
		    Nexus.Router.registerRoute('#ViewTweets/TweetsShown',[TweetsShown.Event()]);
		}
	};
	
});
