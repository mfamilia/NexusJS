define(['Nexus'],function(Nexus){
	Nexus.Tests.UtilTests = function(){
		module("Util Tests");  	
		
		test("should handle one", function() {
			// Arrange
			var stuffToHandle = {
				name: 'stuffName',
				price: '$20'
			};
			
			var handlerFunction = function(stuff){
				return stuff.name;
			};
																		
			//Act
			var result = Nexus.Util.handleOneOrMany(stuffToHandle, handlerFunction);
	
			// Assert
			equal(result, 'stuffName', "should be able to handle objects as params");																		
		});		
		
		test("should handle many", function() {
			// Arrange
			var stuffToHandle = 
			[
				{
					name: 'stuffName1',
					price: '$20'
				},
				{
					name: 'stuffName2',
					price: '$20'
				}
				
			];
			
			var handlerFunction = function(stuff){
				return stuff.name;
			};
																		
			var expected = ['stuffName1','stuffName2'];
			
			//Act
			var result = Nexus.Util.handleOneOrMany(stuffToHandle, handlerFunction);
	
			// Assert
			deepEqual(result, expected, "should be able to handle arrays as params");																		
		});			
		
		test("should handle many and return single value", function() {
			// Arrange
			var stuffToHandle = 
			[
				{
					name: 'stuffName1',
					price: '$20'
				},
				{
					name: 'stuffName2',
					price: '$20'
				}
				
			];
			
			var handlerFunction = function(stuff){
				return stuff.name;
			};
			
			var resultFunction = function(res){
				return (res.indexOf('stuffName1') != -1);
			};
																		
			var expected = true;
			
			//Act
			var result = Nexus.Util.handleOneOrMany(stuffToHandle, handlerFunction, resultFunction);
	
			// Assert
			deepEqual(result, expected, "should be able to handle arrays as params");																		
		});	
	};
return Nexus.Tests.UtilTests;
});

