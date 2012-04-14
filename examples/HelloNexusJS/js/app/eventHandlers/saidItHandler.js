define([
	"jquery",
	"Nexus",
	"app/events/saidIt"
], function ($, Nexus, SaidIt) {
	
	
	return new Nexus.EventHandler(
		'Said it event handler',
		SaidIt.eventName,
		function(evt){
			
			new Nexus.View({
				template: 'saidItTemplate.html',
				placeholder: '#output',
				data: evt,
				onLoad: function(){
					$(evt.selector).removeClass('highlighted').addClass('textbox');						
				}				
			})
			.render();

		}	
	);
	
});
