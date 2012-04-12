define([
	"jquery",
	"Nexus",
	"app/events/saidIt"
], function ($, Nexus, SaidIt) {
	
	
	return new Nexus.EventHandler(
		'Said it event handler',
		SaidIt.eventName,
		function(evt){
			Nexus.View
			.forTemplate('saidItTemplate.html')
			.withData(evt)
			.renderOn('#output')
			.execute(function(){
				$().ready(function(){
					var cssObj = {
						'border' : '1px solid Gray'
					};
					$(evt.selector).css(cssObj);
				});					
			});		
		}	
	);
	
});
