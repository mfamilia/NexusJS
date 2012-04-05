require([
	"Nexus",
	"app/events/mainScreenDisplayed"
], function (Nexus, MainScreenDisplayed) {

	Nexus.App.Domain.MainScreen = function(id, date){
		this.id = '';
		this.date = '';
	
		Nexus.App.EventBus.publish(new MainScreenDisplayed.Event(id, date));
		
		this.applyEvent = function(evt){
			if(evt.eventName == MainScreenDisplayed.eventName){
				this.id = evt.id;
				this.date = evt.date;
			}
		};
	};

});

