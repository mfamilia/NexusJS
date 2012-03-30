define(['Nexus'],function(Nexus){
	Nexus.Tests.SimpleArrayListTests = function(){
		module("Simple Array List Tests");  		
	
		test("SimpleArrayList should implement Nexus.Interfaces.ArrayList interface", function() {
			// Arrange/Act
			var arrList = Nexus.CreateSimpleArrayList();
			// Assert
			ok(Nexus.Interfaces.CheckIfImplements(arrList, Nexus.Interfaces.ArrayList));
	
		});
	};
return Nexus.Tests.SimpleArrayListTests;
});

