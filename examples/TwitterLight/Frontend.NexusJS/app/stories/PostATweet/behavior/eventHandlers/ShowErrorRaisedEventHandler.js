define([
    'jquery',
    'Nexus',			
    'app/stories/PostATweet/behavior/events/ErrorRaised'
], function ($, Nexus, ErrorRaised) {

    return new Nexus.EventHandler(
        'Error raised event handler',
        ErrorRaised.eventName,
        function(evt){
			new Nexus.View({
			    template: 'app/stories/PostATweet/ui/templates/Error.html',
			    placeholder: '#error',

			data: {
			    message: evt.Message
			},

			onLoad: function(){
			}
									
			})
			.render();			
        }
    );

});
