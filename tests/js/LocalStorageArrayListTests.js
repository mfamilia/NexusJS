define(['Nexus'],function(Nexus){
	Nexus.Tests.LocalStorageArrayListTests = function(){
		module("Local Storage Array List Tests");  		
		
		test("LocalStorageArrayList should implement Nexus.Interfaces.ArrayList interface", function() {
			// Arrange/Act
			var arrList = Nexus.CreateLocalStorageArrayList('arrList');
			// Assert
			ok(Nexus.Interfaces.CheckIfImplements(arrList, Nexus.Interfaces.ArrayList));
		});		
	};
return Nexus.Tests.LocalStorageArrayListTests;
});

