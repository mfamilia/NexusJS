require([
	"Nexus",
	"app/events/helloScreenDisplayed"
], function (Nexus, HelloScreenDisplayed) {

	Nexus.App.Domain.HelloScreen = function(id, date){
		this.id = '';
		this.date = '';
	
		Nexus.App.EventBus.publish(new HelloScreenDisplayed.Event(id, date));
		
		this.applyEvent = function(evt){
			if(evt.eventName == HelloScreenDisplayed.eventName){
				this.id = evt.id;
				this.date = evt.date;
			}
		};
	};

});

