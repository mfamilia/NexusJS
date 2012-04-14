define([
	"jquery",
	"Nexus",
	"app/events/highlighted"
], function ($, Nexus, Highlighted) {
	
	return new Nexus.EventHandler(
		'Highlighted event handler',
		Highlighted.eventName,
		function(evt){	
		
			new Nexus.View({
				onLoad: function(){
					$(evt.selector).addClass('highlighted'); 
				}				
			})
			.render();		
			
		}	
	);
	
});
