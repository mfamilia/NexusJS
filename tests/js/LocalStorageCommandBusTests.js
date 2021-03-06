define(['Nexus'],function(Nexus){
	Nexus.Tests.LocalStorageCommandBusTests = function(){
		module("Local Storage Command Bus Tests");  	
		
		test("should create command bus with local storage for command handlers", function() {
			// Arrange/Act
			Nexus.CommandBus = Nexus.CreateLocalStorageCommandBus('TESTLocalStorageCommandBus');
	
			// Assert
			ok(Nexus.Interfaces.CheckIfImplements(Nexus.CommandBus, Nexus.Interfaces.CommandBus));
			ok(Nexus.CommandBus.commandHandlers.count);																		
		});		
		
		test("should register single command handler on LocalStorageCommandBus", function() {
			// Arrange
			var localStorageKey = 'TESTLocalStorageCommandBus';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());
			Nexus.CommandBus = Nexus.CreateLocalStorageCommandBus(localStorageKey);
			
			var cmdHandlerName = Nexus.NewGuid();
			var testCommandHandler = new Nexus.CommandHandler(cmdHandlerName, "cmd", function(cmd){/*do stuff*/});					
			
			var expected = cmdHandlerName;
								
			// Act
			Nexus.CommandBus.registerCommandHandler(testCommandHandler);
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);
			var actual = arr[arr.length - 1].name;
	
			// Assert
			equal(actual, expected, "command handler with " + cmdHandlerName + " name should be registered");	
			equal(arr.length, 1, "local storage array should have 1 registered command handler");					
								
		});			
		
		test("should register multiple command handlers on LocalStorageCommandBus", function() {
			// Arrange
			var localStorageKey = 'TESTLocalStorageCommandBus';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());
			Nexus.CommandBus = Nexus.CreateLocalStorageCommandBus(localStorageKey);
			
			var cmdHandler1Name = Nexus.NewGuid();
			var cmdHandler2Name = Nexus.NewGuid();						
			var testCommandHandler1 = new Nexus.CommandHandler(cmdHandler1Name, "cmd1", function(cmd){/*do stuff*/});		
			var testCommandHandler2 = new Nexus.CommandHandler(cmdHandler2Name, "cmd2", function(cmd){/*do stuff*/});											
								
			// Act
			Nexus.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);	
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);
			var actualFirstCommandHandler = arr[arr.length - 2];
			var actualSecondCommandHandler = arr[arr.length - 1];						
	
			// Assert
			equal(actualFirstCommandHandler.name, cmdHandler1Name, "first command handler should be registered with correct name");	
			equal(arr[arr.length - 2].handlesCommand, 'cmd1', "first command handler handles correct command");							
			equal(actualSecondCommandHandler.name, cmdHandler2Name, "second command handler should be registered with correct name");						
			equal(arr[arr.length - 1].handlesCommand, 'cmd2', "second command handler handles correct command");		
			equal(arr.length, 2, "local storage array should have 2 registered command handlers");					
								
		});		
		
		test("should unregisterAllCommandHandlers on LocalStorageCommandBus", function() {
			// Arrange
			var localStorageKey = 'TESTLocalStorageCommandBus';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());
			Nexus.CommandBus = Nexus.CreateLocalStorageCommandBus(localStorageKey);
			
			var cmdHandler1Name = Nexus.NewGuid();
			var cmdHandler2Name = Nexus.NewGuid();						
			var testCommandHandler1 = new Nexus.CommandHandler(cmdHandler1Name, "cmd1", function(cmd){/*do stuff*/});		
			var testCommandHandler2 = new Nexus.CommandHandler(cmdHandler2Name, "cmd2", function(cmd){/*do stuff*/});		
			
			Nexus.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);		
			equal(Nexus.Util.getArrayFromLocalStorage(localStorageKey).length, 2, "2 command handlers should have been registered during arrange stage");														
								
			// Act
			Nexus.CommandBus.unregisterAllCommandHandlers();											
	
			// Assert
			equal(Nexus.Util.getArrayFromLocalStorage(localStorageKey).length, 0, "command handlers array on local storage should be empty");					
								
		});		
		
		test("should dispatch command on LocalStorageCommandBus", function() {
			// Arrange
			var localStorageKey = 'TESTLocalStorageCommandBus';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());
			Nexus.CommandBus = Nexus.CreateLocalStorageCommandBus(localStorageKey);
			
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
			var testCommandHandler1 = new Nexus.CommandHandler(cmdHandler1Name, cmd1Name, function(cmd){/*do stuff*/});		
			var testCommandHandler2 = new Nexus.CommandHandler(
				cmdHandler2Name, 
				cmd2Name, 
				function(cmd){
					Nexus.Domain.Result = new Nexus.Domain.TestAggregate(cmd.name, cmd.age);
			});	
			
			Nexus.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);		
			equal(Nexus.Util.getArrayFromLocalStorage(localStorageKey).length, 2, "2 command handlers should have been registered during arrange stage");												
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
return Nexus.Tests.LocalStorageCommandBusTests;
});

