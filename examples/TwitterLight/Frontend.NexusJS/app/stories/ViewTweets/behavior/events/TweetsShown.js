define(function () {

    var TweetsShown = {
        eventName:  "Tweets shown",

        Event: function(Tweets){
            return {
            	Tweets: Tweets,
                eventName: TweetsShown.eventName
            };
        }
    };

    return TweetsShown;

});
