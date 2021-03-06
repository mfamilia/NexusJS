define(['Nexus'],function(Nexus){
	Nexus.Tests.SimpleCommandBusTests = function(){
		module("Simple Command Bus Tests");  	
		
		test("should create simple command bus", function() {
			// Arrange/Act
			Nexus.CommandBus = Nexus.CreateSimpleCommandBus();
	
			// Assert
			ok(Nexus.Interfaces.CheckIfImplements(Nexus.CommandBus, Nexus.Interfaces.CommandBus));
			ok(Nexus.CommandBus.commandHandlers.count);																		
		});		
		
		test("should register single command handler on simple command bus", function() {
			// Arrange
			Nexus.CommandBus = Nexus.CreateSimpleCommandBus();
			
			var cmdHandlerName = Nexus.NewGuid();
			var testCommandHandler = new Nexus.CommandHandler(cmdHandlerName, "cmd", function(cmd){/*do stuff*/});					
			
			var expected = cmdHandlerName;
								
			// Act
			Nexus.CommandBus.registerCommandHandler(testCommandHandler);
	
			// Assert
			equal(Nexus.CommandBus.commandHandlers.getAt(0).name, expected, "command handler with " + cmdHandlerName + " name should be registered");	
			equal(Nexus.CommandBus.commandHandlers.count(), 1, "should have 1 registered command handler");					
								
		});			
	
		test("should register multiple command handlers on simple command bus", function() {
			// Arrange
			Nexus.CommandBus = Nexus.CreateSimpleCommandBus();
			
			var cmdHandler1Name = Nexus.NewGuid();
			var cmdHandler2Name = Nexus.NewGuid();						
			var testCommandHandler1 = new Nexus.CommandHandler(cmdHandler1Name, "cmd1", function(cmd){});		
			var testCommandHandler2 = new Nexus.CommandHandler(cmdHandler2Name, "cmd2", function(cmd){});											
								
			// Act
			Nexus.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);	
			var actualFirstCommandHandler = Nexus.CommandBus.commandHandlers.getAt(0);
			var actualSecondCommandHandler = Nexus.CommandBus.commandHandlers.getAt(1);					
	
			// Assert
			equal(actualFirstCommandHandler.name, cmdHandler1Name, "first command handler should be registered with correct name");	
			equal(actualFirstCommandHandler.handlesCommand, 'cmd1', "first command handler handles correct command");							
			equal(actualSecondCommandHandler.name, cmdHandler2Name, "second command handler should be registered with correct name");						
			equal(actualSecondCommandHandler.handlesCommand, 'cmd2', "second command handler handles correct command");		
			equal(Nexus.CommandBus.commandHandlers.count(), 2, "should have 2 registered command handlers");					
								
		});		
		
		test("should unregisterAllCommandHandlers on simple command bus", function() {
			// Arrange
			Nexus.CommandBus = Nexus.CreateSimpleCommandBus();
			
			var cmdHandler1Name = Nexus.NewGuid();
			var cmdHandler2Name = Nexus.NewGuid();						
			var testCommandHandler1 = new Nexus.CommandHandler(cmdHandler1Name, "cmd1", function(cmd){});		
			var testCommandHandler2 = new Nexus.CommandHandler(cmdHandler2Name, "cmd2", function(cmd){});		
			
			Nexus.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);		
			equal(Nexus.CommandBus.commandHandlers.count(), 2, "2 command handlers should have been registered during arrange stage");														
								
			// Act
			Nexus.CommandBus.unregisterAllCommandHandlers();											
	
			// Assert
			equal(Nexus.CommandBus.commandHandlers.count(), 0, "no command handlers should exist");					
								
		});		
		
		test("should dispatch command on simple command bus", function() {
			// Arrange
			Nexus.CommandBus = Nexus.CreateSimpleCommandBus();
			
			Nexus.Domain = {};

			Nexus.Domain.TestAggregate = function(name, age){
				this.name = name;
				this.age = age;
			};
			
			Nexus.Domain.Result = {};
			
			var cmd1Name = 'cmd1';
			var cmd2Name = 'cmd2';
			var cmdHandler1Name = Nexus.NewGuid();
			var cmdHandler2Name = Nexus.NewGuid();						
			var testCommandHandler1 = new Nexus.CommandHandler(cmdHandler1Name, cmd1Name, function(cmd){});		
			var testCommandHandler2 = new Nexus.CommandHandler(
				cmdHandler2Name, 
				cmd2Name, 
				function(cmd){
					Nexus.Domain.Result = new Nexus.Domain.TestAggregate(cmd.name, cmd.age);
			});	
			
			Nexus.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);		
			equal(Nexus.CommandBus.commandHandlers.count(), 2, "2 command handlers should have been registered during arrange stage");												
			
			Nexus.Commands = {};

			Nexus.Commands.TestCommands = {
				// command names
				SomeCommandName: cmd2Name,
				
				// commands	
				SomeCommand: function(name, age){
					this.name = name;
					this.age = age;
					this.commandName = Nexus.Commands.TestCommands.SomeCommandName;
				}
			};
			
			var command = new Nexus.Commands.TestCommands.SomeCommand('kate',20);					
								
			// Act
			Nexus.CommandBus.dispatch(command);						
	
			// Assert
			equal(Nexus.Domain.Result.name, 'kate', "1st property set correctly");
			equal(Nexus.Domain.Result.age, 20, "2nd property set correctly");											
								
		});	
		
	};
return Nexus.Tests.SimpleCommandBusTests;
});

