define([
	"Nexus",
	"app/events/mainScreenDisplayed",
	'app/events/saidIt',
	'app/events/helloScreenDisplayed'
], function (Nexus, MainScreenDisplayed, SaidIt, HelloScreenDisplayed) {

	return function(){
						
		this.start = function(id, date){		
			Nexus.App.EventBus.publish(new MainScreenDisplayed.Event(id, date));
		};		
			
		this.sayHello = function(id, date){
			Nexus.App.EventBus.publish(new HelloScreenDisplayed.Event(id, date));			
		};		
		
		this.sayIt = function(id, date, text){
			Nexus.App.EventBus.publish(new SaidIt.Event(id, date, text));
		};
		
		this.applyEvent = function(evt){};
	};
	
	

});

