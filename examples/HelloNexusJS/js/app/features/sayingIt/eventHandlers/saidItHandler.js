define([
	"jquery",
	"Nexus",
	"app/features/sayingIt/events/saidIt"
], function ($, Nexus, SaidIt) {
	
	
	return new Nexus.EventHandler(
		'Said it event handler',
		SaidIt.eventName,
		function(evt){
			
			new Nexus.View({
				template: 'app/features/sayingIt/templates/saidItTemplate.html',
				placeholder: '#output',
				data: evt,
				onLoad: function(){
					$(evt.selector).removeClass().addClass('textbox');						
				}				
			})
			.render();

		}	
	);
	
});
