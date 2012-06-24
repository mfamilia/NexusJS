define(function () {

    var ErrorRaised = {
        eventName:  "Error raised",

        Event: function(Message){
            return {
            	Message: Message,
                eventName: ErrorRaised.eventName
            };
        }
    };

    return ErrorRaised;

});
