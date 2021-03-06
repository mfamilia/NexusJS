define(['Nexus'],function(Nexus){
	Nexus.Tests.SimpleArrayTests = function(){
									
		module("Simple Array Tests");  	
		
		test("should create simple array", function() {
			// Arrange/Act
			var arr = Nexus.CreateSimpleArray();
	
			// Assert
			ok(arr.push, 'should extend array correctly');
			ok(Nexus.Interfaces.CheckIfImplements(arr, Nexus.Interfaces.Array), 'should implement Nexus.Interfaces.Array');
															
		});			
		
		test("should clear simple array", function() {
			// Arrange
			var item = {
				name: 'item1',
				price: '$20'
			};
													
			var arr = Nexus.CreateSimpleArray();
			arr.push(item);						
			
			// Act
			arr.clear();					
	
			// Assert
			equal(arr.length, 0, "0 items should now be in local storage");																		
		});			
		
		test("should getAt from simple array", function() {
			// Arrange
			var item = {
				name: 'item1',
				price: '$20'
			};
													
			var arr = Nexus.CreateSimpleArray();
			arr.push(item);						
			
			//Act
			var result = arr.getAt(0);					
	
			// Assert
			deepEqual(result, item, "should getAt correct item");																		
		});		
		
		test("should setAt to simple array", function() {
			// Arrange
			var item = {
				name: 'item1',
				price: '$20'
			};
			
			var updatedItem = {
				name: 'updatedItem',
				price: '$30'
			};						
													
			var arr = Nexus.CreateSimpleArray();
			arr.push(item);						
			
			// Act
			arr.setAt(0,updatedItem);					
	
			// Assert
			deepEqual(arr.getAt(0).name, 'updatedItem', "should setAt correctly");																		
		});						
		
		test("should get size of simple array", function() {
			// Arrange
			var item = {
				name: 'item1',
				price: '$20'
			};
													
			var arr = Nexus.CreateSimpleArray();
			arr.push(item);						
			
			// Act
			var result = arr.size();					
	
			// Assert
			deepEqual(result, 1, "should get correct size");																		
		});	
	};
return Nexus.Tests.SimpleArrayTests;
});


