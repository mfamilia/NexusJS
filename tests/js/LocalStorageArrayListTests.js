NexusJS.Tests.LocalStorageArrayListTests = function(){
	module("Local Storage Array List Tests");  		
	
	test("LocalStorageArrayList should implement NexusJS.Interfaces.ArrayList interface", function() {
		// Arrange/Act
		var arrList = NexusJS.CreateLocalStorageArrayList('arrList');
		// Assert
		ok(NexusJS.Interfaces.CheckIfImplements(arrList, NexusJS.Interfaces.ArrayList));
	});		
};