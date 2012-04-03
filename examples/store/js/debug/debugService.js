define(['jquery','Nexus'], function($,Nexus){
	Nexus.App.Services.DebugService = {
	
		DisplayEventRepo: function(divId){
	            var str = '';
	
	            Nexus.App.EventStore.getAllEvents().map(function (evt) {
	                str += JSON.stringify(evt) + '<br />';
	            });
	
	            $('#' + divId).html(str);	
		},
		DisplayEventRepoById: function(divId, id){
	            var arrById = Nexus.App.EventStore.getAllEventsById(id);
	
	            var str = '';
	
	            arrById.map(function (evt) {
	                str += JSON.stringify(evt) + '<br />';
	            });
	
	            $('#' + divId).html(str);	
		},	
	
		DisplayAllRegisteredEventHandlers: function(divId){
			var str = '';
	            
			for( var i = 0; i < Nexus.App.EventBus.eventHandlers.count(); i++ ){
				var eventHandler = Nexus.App.EventBus.eventHandlers.getAt(i);
				str += '<b>event handler</b> ' + 
					eventHandler.name + 
					' <b>handles</b> ' + 
					eventHandler.handlesEvent + 
					'<br />';
			}
	
			$('#' + divId).html(str);	
		},
		
		UnregisterAllEventHandlers: function(divId){
			Nexus.App.EventBus.unregisterAllEventHandlers();
			$('#' + divId).html('');
		},
		UnregisterAllCommandHandlers: function(divId){
			Nexus.App.CommandBus.unregisterAllCommandHandlers();
			$('#' + divId).html('');
		},	
		DisplayAllRegisteredCommandHandlers: function(divId){
	            	var str = '';
	            
			for( var i = 0; i < Nexus.App.CommandBus.commandHandlers.count(); i++ ){
				var commandHandler = Nexus.App.CommandBus.commandHandlers.getAt(i);
				str += '<b>command handler</b> ' + commandHandler.name + ' <b>handles</b> ' + commandHandler.handlesCommand + '<br />';
			}            
	
	            	$('#' + divId).html(str);	
		},
			
		Clear: function(clearFunction, divId){
			clearFunction();
			$('#' + divId).html('');
		}
	
	};
return Nexus.App.Services.DebugService;
});

