define(['Nexus'],function(Nexus){
	Nexus.Tests.SimpleDBTests = function(){
		module("Simple DB Tests"); 
							
		
		test("should create simple DB when correct arr is passed", function() {
			// Arrange
			var arr = Nexus.CreateSimpleArray();
		
			//Act
			var db = Nexus.CreateDB(arr);
	
			// Assert
			ok(Nexus.Interfaces.CheckIfImplements(db, Nexus.Interfaces.DB), 'should implement Nexus.Interfaces.DB');						
			
															
		});	
	
		test("should insert into simple DB", function() {
			// Arrange
			var arr = Nexus.CreateSimpleArray();											
			var db = Nexus.CreateDB(arr);
			
			var obj = {
				name: 'test'
			};
								
			// Act
			db.insert(obj);					
			
			// Assert
			equal(arr.length, 1, 'one item should be in array');		
			equal(arr[0].name, 'test', 'correct item should have been inserted');														
		});		
		
		test("should update obj in simple DB", function() {
			// Arrange										
			var arr = Nexus.CreateSimpleArray();											
			var db = Nexus.CreateDB(arr);
			
			var id = Nexus.NewGuid();
			
			var obj = {
				id: id,
				name: 'test'
			};
			var updatedObj = {
				id: id,
				name: 'updatedObj'
			};						
			db.insert(obj);						
								
			// Act
			db.update(updatedObj);						
			
			// Assert
			equal(arr.length, 1, 'one item should be in array');		
			equal(arr[0].name, 'updatedObj', 'item should have been updated');														
		});		
		
		test("should delete obj from simple DB", function() {
			// Arrange										
			var arr = Nexus.CreateSimpleArray();											
			var db = Nexus.CreateDB(arr);
			
			var id = Nexus.NewGuid();
			
			var obj = {
				id: id,
				name: 'test'
			};						
			db.insert(obj);						
								
			// Act
			db.delete(obj);						
			
			// Assert
			equal(arr.length, 0, 'no items should be in array');														
		});				
			
		test("should get all from simple DB", function() {
			// Arrange										
			var arr = Nexus.CreateSimpleArray();											
			var db = Nexus.CreateDB(arr);
			
			var id1 = Nexus.NewGuid();
			var id2 = Nexus.NewGuid();
			var id3 = Nexus.NewGuid();												
			
			var obj1 = {
				id: id1,
				name: 'test1'
			};		
			var obj2 = {
				id: id2,
				name: 'test2'
			};		
			var obj3 = {
				id: id3,
				name: 'test3'
			};																
			db.insert(obj1);
			db.insert(obj2);
			db.insert(obj3);																		
								
			// Act
			var all = db.getAll();						
			
			// Assert
			equal(all.length, 3, '3 items should be in array');																				
		});
	
	};
return Nexus.Tests.SimpleDBTests;
});

