define([
    'jquery',
    'Nexus',
    "app/features/sayingHello/events/helloScreenDisplayed"
], function ($, Nexus, HelloScreenDisplayed) {

    return new Nexus.EventHandler(
        'Hello sent to backend event handler',
        HelloScreenDisplayed.eventName,
        function(evt){

            var payload = {
                url: 'http://192.168.0.134:3000',
                data: {'text':'HELLO'},
                success: function(){console.log('POSTED COMPLETE')}
            };

            Nexus.jsonPOST(payload);
        }
    );

});
