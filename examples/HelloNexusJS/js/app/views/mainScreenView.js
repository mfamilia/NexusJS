require([
	'jquery',
	'Nexus',
	'app/commands/sayHello',
	'app/commands/sayIt'
],function($,Nexus,SayHello, SayIt){

	$('#sayHello').click(function () {
		Nexus.App.CommandBus.dispatch(
			new SayHello.Command(Nexus.App.newId(), new Date())			
		);	
	});
	
	$('#sayIt').click(function () {
		var text = $('#thingToSay').val();
		Nexus.App.CommandBus.dispatch(
			new SayIt.Command(Nexus.App.newId(), new Date(), text)
		);		
	});	

});
