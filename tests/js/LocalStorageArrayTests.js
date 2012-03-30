define(['Nexus'],function(Nexus){
	Nexus.Tests.LocalStorageArrayTests = function(){
		module("Local Storage Array Tests");      	        
		
		test("testing map()", function() {
			// Arrange
			var TestClass = function(className){
				this.name = className;
				this.getName = function(){
					return this.name;
				};
			};
			
			var testObj1 = new TestClass('obj1_name');
			var testObj2 = new TestClass('obj2_name');							
			
			var lsa = Nexus.CreateLocalStorageArray('lsa_test');
			lsa.clear();
			lsa.push(testObj1);
			lsa.push(testObj2);					
			
			var expectedOutput = 'obj1_nameobj2_name';
			
			// Act
	
			var actualOutput = '';
			lsa.map(function(o){
				actualOutput += o.getName();
			});										
			
			// Assert
			equal(actualOutput, expectedOutput, "");
		});
		
		
		test("should save objects into local storage array", function() {
			// Arrange
			var someObj1 = function(){
				this.name = 'someObj1Name',
				this.handle = function(cmd){
								return cmd.id;	
							}				
			};
			
			var someObj2 = function(){
				this.name = 'someObj2Name',
				this.handle = function(cmd){
								return cmd.name;	
							}				
			};						
			
			var cmd = function(id, name){
				this.id = id;
				this.name = name;
			};												
			
			var lsa = Nexus.CreateLocalStorageArray('lsa_test');
			lsa.clear();
			lsa.push(new someObj1());
			lsa.push(new someObj2());				
			
			var expectedOutput = '123jack';
			
			// Act
			var actualOutput = '';
			lsa.map(function(o){
				actualOutput += o.handle(new cmd("123","jack"));
			});										
			
			// Assert
			equal(actualOutput, expectedOutput, "");
		});		
			
	};
return Nexus.Tests.LocalStorageArrayTests;
});

