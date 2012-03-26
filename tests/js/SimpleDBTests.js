NexusJS.Tests.SimpleDBTests = function(){
	module("Simple DB Tests"); 
						
	
	test("should create simple DB when correct arr is passed", function() {
		// Arrange
		var arr = NexusJS.CreateSimpleArray();
	
		//Act
		var db = NexusJS.CreateDB(arr);

		// Assert
		ok(NexusJS.Interfaces.CheckIfImplements(db, NexusJS.Interfaces.DB), 'should implement NexusJS.Interfaces.DB');						
		
														
	});	

	test("should insert into simple DB", function() {
		// Arrange
		var arr = NexusJS.CreateSimpleArray();											
		var db = NexusJS.CreateDB(arr);
		
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
		var arr = NexusJS.CreateSimpleArray();											
		var db = NexusJS.CreateDB(arr);
		
		var id = NexusJS.NewGuid();
		
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
		var arr = NexusJS.CreateSimpleArray();											
		var db = NexusJS.CreateDB(arr);
		
		var id = NexusJS.NewGuid();
		
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
		var arr = NexusJS.CreateSimpleArray();											
		var db = NexusJS.CreateDB(arr);
		
		var id1 = NexusJS.NewGuid();
		var id2 = NexusJS.NewGuid();
		var id3 = NexusJS.NewGuid();												
		
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