define([
    'jquery',
    'Nexus',
    "app/features/sayingHello/behavior/events/helloScreenDisplayed"
], function ($, Nexus, HelloScreenDisplayed) {

    return new Nexus.EventHandler(
        'Hello sent to backend event handler',
        HelloScreenDisplayed.eventName,
        function(evt){
		
			Nexus.BackendCall(new Nexus.BackendCall({
				type: 'POST',
				url: 'http://192.168.0.134:3000',
                data: {'text':'HELLO'}
			}))
			.perform();
        }
    );

});
