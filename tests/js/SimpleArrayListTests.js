NexusJS.Tests.SimpleArrayListTests = function(){
	module("Simple Array List Tests");  		

	test("SimpleArrayList should implement NexusJS.Interfaces.ArrayList interface", function() {
		// Arrange/Act
		var arrList = NexusJS.CreateSimpleArrayList();
		// Assert
		ok(NexusJS.Interfaces.CheckIfImplements(arrList, NexusJS.Interfaces.ArrayList));

	});
};