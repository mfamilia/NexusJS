define(function () {

    var HomepageShown = {
        eventName:  "Homepage shown",

        Event: function(){
            return {
                eventName: HomepageShown.eventName
            };
        }
    };

    return HomepageShown;

});
