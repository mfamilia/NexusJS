define([
	"Nexus",
	"app/events/saidIt"
], function (Nexus, SaidIt) {
	
	return new Nexus.EventHandler(
		'Said it event handler',
		SaidIt.eventName,
		function(evt){
			$('#output').text(evt.text);
		}	
	);
	
});
