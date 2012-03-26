NexusJS.Tests.SimpleCommandBusTests = function(){
	module("Simple Command Bus Tests");  	
	
	test("should create simple command bus", function() {
		// Arrange/Act
		NexusJS.App.CommandBus = NexusJS.CreateSimpleCommandBus();

		// Assert
		ok(NexusJS.Interfaces.CheckIfImplements(NexusJS.App.CommandBus, NexusJS.Interfaces.CommandBus));
		ok(NexusJS.App.CommandBus.commandHandlers.count);																		
	});		
	
	test("should register single command handler on simple command bus", function() {
		// Arrange
		NexusJS.App.CommandBus = NexusJS.CreateSimpleCommandBus();
		
		var cmdHandlerName = NexusJS.NewGuid();
		var testCommandHandler = new NexusJS.CommandHandler(cmdHandlerName, "cmd", function(cmd){/*do stuff*/});					
		
		var expected = cmdHandlerName;
							
		// Act
		NexusJS.App.CommandBus.registerCommandHandler(testCommandHandler);

		// Assert
		equal(NexusJS.App.CommandBus.commandHandlers.getAt(0).name, expected, "command handler with " + cmdHandlerName + " name should be registered");	
		equal(NexusJS.App.CommandBus.commandHandlers.count(), 1, "should have 1 registered command handler");					
							
	});			

	test("should register multiple command handlers on simple command bus", function() {
		// Arrange
		NexusJS.App.CommandBus = NexusJS.CreateSimpleCommandBus();
		
		var cmdHandler1Name = NexusJS.NewGuid();
		var cmdHandler2Name = NexusJS.NewGuid();						
		var testCommandHandler1 = new NexusJS.CommandHandler(cmdHandler1Name, "cmd1", function(cmd){});		
		var testCommandHandler2 = new NexusJS.CommandHandler(cmdHandler2Name, "cmd2", function(cmd){});											
							
		// Act
		NexusJS.App.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);	
		var actualFirstCommandHandler = NexusJS.App.CommandBus.commandHandlers.getAt(0);
		var actualSecondCommandHandler = NexusJS.App.CommandBus.commandHandlers.getAt(1);					

		// Assert
		equal(actualFirstCommandHandler.name, cmdHandler1Name, "first command handler should be registered with correct name");	
		equal(actualFirstCommandHandler.handlesCommand, 'cmd1', "first command handler handles correct command");							
		equal(actualSecondCommandHandler.name, cmdHandler2Name, "second command handler should be registered with correct name");						
		equal(actualSecondCommandHandler.handlesCommand, 'cmd2', "second command handler handles correct command");		
		equal(NexusJS.App.CommandBus.commandHandlers.count(), 2, "should have 2 registered command handlers");					
							
	});		
	
	test("should unregisterAllCommandHandlers on simple command bus", function() {
		// Arrange
		NexusJS.App.CommandBus = NexusJS.CreateSimpleCommandBus();
		
		var cmdHandler1Name = NexusJS.NewGuid();
		var cmdHandler2Name = NexusJS.NewGuid();						
		var testCommandHandler1 = new NexusJS.CommandHandler(cmdHandler1Name, "cmd1", function(cmd){});		
		var testCommandHandler2 = new NexusJS.CommandHandler(cmdHandler2Name, "cmd2", function(cmd){});		
		
		NexusJS.App.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);		
		equal(NexusJS.App.CommandBus.commandHandlers.count(), 2, "2 command handlers should have been registered during arrange stage");														
							
		// Act
		NexusJS.App.CommandBus.unregisterAllCommandHandlers();											

		// Assert
		equal(NexusJS.App.CommandBus.commandHandlers.count(), 0, "no command handlers should exist");					
							
	});		
	
	test("should dispatch command on simple command bus", function() {
		// Arrange
		NexusJS.App.CommandBus = NexusJS.CreateSimpleCommandBus();
		
		NexusJS.App.Domain.TestAggregate = function(name, age){
			this.name = name;
			this.age = age;
		};
		
		NexusJS.App.Domain.Result = {};
		
		var cmd1Name = 'cmd1';
		var cmd2Name = 'cmd2';
		var cmdHandler1Name = NexusJS.NewGuid();
		var cmdHandler2Name = NexusJS.NewGuid();						
		var testCommandHandler1 = new NexusJS.CommandHandler(cmdHandler1Name, cmd1Name, function(cmd){});		
		var testCommandHandler2 = new NexusJS.CommandHandler(
			cmdHandler2Name, 
			cmd2Name, 
			function(cmd){
				NexusJS.App.Domain.Result = new NexusJS.App.Domain.TestAggregate(cmd.name, cmd.age);
		});	
		
		NexusJS.App.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);		
		equal(NexusJS.App.CommandBus.commandHandlers.count(), 2, "2 command handlers should have been registered during arrange stage");												
		
		NexusJS.App.Commands.TestCommands = {
			// command names
			SomeCommandName: cmd2Name,
			
			// commands	
			SomeCommand: function(name, age){
				this.name = name;
				this.age = age;
				this.commandName = NexusJS.App.Commands.TestCommands.SomeCommandName;
			}
		};
		
		var command = new NexusJS.App.Commands.TestCommands.SomeCommand('kate',20);					
							
		// Act
		NexusJS.App.CommandBus.dispatch(command);						

		// Assert
		equal(NexusJS.App.Domain.Result.name, 'kate', "1st property set correctly");
		equal(NexusJS.App.Domain.Result.age, 20, "2nd property set correctly");											
							
	});	
	
};