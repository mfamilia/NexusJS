require([
	'jquery',
	'Nexus',
	'app/commands/sayHello'
],function($,Nexus,SayHello){

	$('#sayHello').click(function () {

		Nexus.App.CommandBus.dispatch(
			new SayHello.Command(Nexus.App.newId(), new Date())
			
		);	

	});
});
