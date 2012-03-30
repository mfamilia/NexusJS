NexusJS.Tests.LocalStorageCommandBusTests = function(){
	module("Local Storage Command Bus Tests");  	
	
	test("should create command bus with local storage for command handlers", function() {
		// Arrange/Act
		NexusJS.App.CommandBus = NexusJS.CreateLocalStorageCommandBus('TESTLocalStorageCommandBus');

		// Assert
		ok(NexusJS.Interfaces.CheckIfImplements(NexusJS.App.CommandBus, NexusJS.Interfaces.CommandBus));
		ok(NexusJS.App.CommandBus.commandHandlers.count);																		
	});		
	
	test("should register single command handler on LocalStorageCommandBus", function() {
		// Arrange
		var localStorageKey = 'TESTLocalStorageCommandBus';
		NexusJS.Util.saveArrayToLocalStorage(localStorageKey, new Array());
		NexusJS.App.CommandBus = NexusJS.CreateLocalStorageCommandBus(localStorageKey);
		
		var cmdHandlerName = NexusJS.NewGuid();
		var testCommandHandler = new NexusJS.CommandHandler(cmdHandlerName, "cmd", function(cmd){/*do stuff*/});					
		
		var expected = cmdHandlerName;
							
		// Act
		NexusJS.App.CommandBus.registerCommandHandler(testCommandHandler);
		var arr = NexusJS.Util.getArrayFromLocalStorage(localStorageKey);
		var actual = arr[arr.length - 1].name;

		// Assert
		equal(actual, expected, "command handler with " + cmdHandlerName + " name should be registered");	
		equal(arr.length, 1, "local storage array should have 1 registered command handler");					
							
	});			
	
	test("should register multiple command handlers on LocalStorageCommandBus", function() {
		// Arrange
		var localStorageKey = 'TESTLocalStorageCommandBus';
		NexusJS.Util.saveArrayToLocalStorage(localStorageKey, new Array());
		NexusJS.App.CommandBus = NexusJS.CreateLocalStorageCommandBus(localStorageKey);
		
		var cmdHandler1Name = NexusJS.NewGuid();
		var cmdHandler2Name = NexusJS.NewGuid();						
		var testCommandHandler1 = new NexusJS.CommandHandler(cmdHandler1Name, "cmd1", function(cmd){/*do stuff*/});		
		var testCommandHandler2 = new NexusJS.CommandHandler(cmdHandler2Name, "cmd2", function(cmd){/*do stuff*/});											
							
		// Act
		NexusJS.App.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);	
		var arr = NexusJS.Util.getArrayFromLocalStorage(localStorageKey);
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
		NexusJS.Util.saveArrayToLocalStorage(localStorageKey, new Array());
		NexusJS.App.CommandBus = NexusJS.CreateLocalStorageCommandBus(localStorageKey);
		
		var cmdHandler1Name = NexusJS.NewGuid();
		var cmdHandler2Name = NexusJS.NewGuid();						
		var testCommandHandler1 = new NexusJS.CommandHandler(cmdHandler1Name, "cmd1", function(cmd){/*do stuff*/});		
		var testCommandHandler2 = new NexusJS.CommandHandler(cmdHandler2Name, "cmd2", function(cmd){/*do stuff*/});		
		
		NexusJS.App.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);		
		equal(NexusJS.Util.getArrayFromLocalStorage(localStorageKey).length, 2, "2 command handlers should have been registered during arrange stage");														
							
		// Act
		NexusJS.App.CommandBus.unregisterAllCommandHandlers();											

		// Assert
		equal(NexusJS.Util.getArrayFromLocalStorage(localStorageKey).length, 0, "command handlers array on local storage should be empty");					
							
	});		
	
	test("should dispatch command on LocalStorageCommandBus", function() {
		// Arrange
		var localStorageKey = 'TESTLocalStorageCommandBus';
		NexusJS.Util.saveArrayToLocalStorage(localStorageKey, new Array());
		NexusJS.App.CommandBus = NexusJS.CreateLocalStorageCommandBus(localStorageKey);
		
		NexusJS.App.Domain.TestAggregate = function(name, age){
			this.name = name;
			this.age = age;
		};
		
		NexusJS.App.Domain.Result = {};
		
		var cmd1Name = 'cmd1';
		var cmd2Name = 'cmd2';
		var cmdHandler1Name = NexusJS.NewGuid();
		var cmdHandler2Name = NexusJS.NewGuid();						
		var testCommandHandler1 = new NexusJS.CommandHandler(cmdHandler1Name, cmd1Name, function(cmd){/*do stuff*/});		
		var testCommandHandler2 = new NexusJS.CommandHandler(
			cmdHandler2Name, 
			cmd2Name, 
			function(cmd){
				NexusJS.App.Domain.Result = new NexusJS.App.Domain.TestAggregate(cmd.name, cmd.age);
		});	
		
		NexusJS.App.CommandBus.registerCommandHandlers([testCommandHandler1, testCommandHandler2]);		
		equal(NexusJS.Util.getArrayFromLocalStorage(localStorageKey).length, 2, "2 command handlers should have been registered during arrange stage");												
		
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