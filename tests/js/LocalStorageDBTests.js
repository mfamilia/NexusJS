define(['Nexus'],function(Nexus){
	Nexus.Tests.LocalStorageDBTests = function(){
		module("Local Storage DB Tests"); 
							
		test("should create local storage db", function() {
			// Arrange/Act
			var lsDB = Nexus.CreateLocalStorageDB('TESTlocalStorageDB');
	
			// Assert
			ok(Nexus.Interfaces.CheckIfImplements(lsDB, Nexus.Interfaces.DB));
															
		});		
		
		test("should insert item into local storage db", function() {
			// Arrange
			var item = {
				name: 'item1',
				price: '$20'
			};
			
			var localStorageKey = 'TESTlocalStorageDB';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());	
								
			var lsDB = Nexus.CreateLocalStorageDB('TESTlocalStorageDB');
			
			//Act
			lsDB.insert(item);
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);						
	
			// Assert
			equal(arr.length, 1, "1 item should now be in local storage");
			equal(arr[0].name, 'item1', "correct item was inserted");						
															
		});			
							
		test("should clear local storage db", function() {
			// Arrange
			var item = {
				name: 'item1',
				price: '$20'
			};
			
			var localStorageKey = 'TESTlocalStorageDB';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());	
								
			var lsDB = Nexus.CreateLocalStorageDB('TESTlocalStorageDB');
			lsDB.insert(item);						
			
			//Act
			lsDB.clear();
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);						
	
			// Assert
			equal(arr.length, 0, "0 items should now be in local storage");																		
		});		
		
		test("should update item in local storage db", function() {
			// Arrange
			var id = Nexus.NewGuid();
			
			var item = {
				id: id,
				name: 'item1',
				price: '$20'
			};
			
			var itemOnSale = {
				id: id,
				name: 'item1',
				price: '$15'
			};						
			
			var localStorageKey = 'TESTlocalStorageDB';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());	
								
			var lsDB = Nexus.CreateLocalStorageDB('TESTlocalStorageDB');
			lsDB.insert(item);						
			
			//Act
			lsDB.update(itemOnSale);
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);						
	
			// Assert
			equal(arr.length, 1, "1 item should now be in local storage");	
			equal(arr[0].name, 'item1', "properties that were not updated remain the same");	
			equal(arr[0].price, '$15', "updated properties get updated to correct values");																												
		});		
		
		test("should delete item in local storage db", function() {
			// Arrange
			var id = Nexus.NewGuid();
			
			var item = {
				id: id,
				name: 'item1',
				price: '$20'
			};
			
			var localStorageKey = 'TESTlocalStorageDB';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());	
								
			var lsDB = Nexus.CreateLocalStorageDB('TESTlocalStorageDB');
			lsDB.insert(item);						
			
			//Act
			lsDB.delete(item);
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);						
	
			// Assert
			equal(arr.length, 0, "0 items should now be in local storage");																												
		});		
		
		test("should getAll items from local storage db as array", function() {
			// Arrange
			var id1 = Nexus.NewGuid();
			var id2 = Nexus.NewGuid();						
			
			var item1 = {
				id: id1,
				name: 'item1',
				price: '$20'
			};
			
			var item2 = {
				id: id2,
				name: 'item2',
				price: '$30'
			};						
			
			var localStorageKey = 'TESTlocalStorageDB';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());	
								
			var lsDB = Nexus.CreateLocalStorageDB('TESTlocalStorageDB');
			lsDB.insert(item1);						
			lsDB.insert(item2);						
									
			//Act
			var all = lsDB.getAll();
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);						
	
			// Assert
			deepEqual(all, arr, "should return underlying local storage array");	
			equal(all.length, 2, "should have 2 items in returned array");
			equal(all[1].id, id2, "should have correct objects in returned array");						
			equal(arr.length, 2, "should have 2 items in local storage array");			
			equal(arr[1].id, id2, "should have correct objects in local storage array");																																				
		});	
		
		test("should get item by id from local storage db", function() {
			// Arrange
			var id1 = Nexus.NewGuid();
			var id2 = Nexus.NewGuid();						
			
			var item1 = {
				id: id1,
				name: 'item1',
				price: '$20'
			};
			
			var item2 = {
				id: id2,
				name: 'item2',
				price: '$30'
			};							
			
			var localStorageKey = 'TESTlocalStorageDB';
			Nexus.Util.initLocalStorageArray(localStorageKey);	
								
			var lsDB = Nexus.CreateLocalStorageDB('TESTlocalStorageDB');
			lsDB.insert(item1);						
			lsDB.insert(item2);						
			
			//Act
			var result = lsDB.getById(id1);
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);						
	
			// Assert
			deepEqual(result, item1, "correct item must be returned");																											
		});		
		
		
		////////////////////////////////////////////////////////////////////	
		////////////////////////////////////////////////////////////////////	
		////////////////////////////////////////////////////////////////////	
		////////////////////////////////////////////////////////////////////
		
		
		test("should create local storage DB", function() {
			// Arrange
			var arr = Nexus.CreateLocalStorageArray('TESTlocalStorageDBKey');
		
			//Act
			var db = Nexus.CreateDB(arr);
	
			// Assert
			ok(Nexus.Interfaces.CheckIfImplements(db, Nexus.Interfaces.DB), 'should implement Nexus.Interfaces.DB');																	
		});		
		
		test("should insert into local storage DB", function() {
			// Arrange
			var localStorageKey = 'TESTlocalStorageDBKey';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());			
							
			var arr = Nexus.CreateLocalStorageArray(localStorageKey);											
			var db = Nexus.CreateDB(arr);
			
			var obj = {
				name: 'test'
			};
								
			//Act
			db.insert(obj);
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);							
			
			// Assert
			equal(arr.length, 1, 'one item should be in array');		
			equal(arr[0].name, 'test', 'correct item should have been inserted');														
		});																																																													
		test("should update obj in local storage DB", function() {
			// Arrange
			var localStorageKey = 'TESTlocalStorageDBKey';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());			
							
			var lsArr = Nexus.CreateLocalStorageArray(localStorageKey);											
			var db = Nexus.CreateDB(lsArr);
			
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
								
			//Act
			db.update(updatedObj);
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);							
			
			// Assert
			equal(arr.length, 1, 'one item should be in array');		
			equal(arr[0].name, 'updatedObj', 'item should have been updated');														
		});			
		
		test("should delete obj from local storage DB", function() {
			// Arrange					
			var localStorageKey = 'TESTlocalStorageDBKey';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());		
														
			var lsArr = Nexus.CreateLocalStorageArray(localStorageKey);	
			var db = Nexus.CreateDB(lsArr);
			
			var id = Nexus.NewGuid();
			
			var obj = {
				id: id,
				name: 'test'
			};						
			db.insert(obj);						
								
			// Act
			db.delete(obj);	
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);													
			
			// Assert
			equal(arr.length, 0, 'no items should be in array');														
		});		
	
		test("should get all from local storage DB", function() {
			// Arrange		
			var localStorageKey = 'TESTlocalStorageDBKey';
			Nexus.Util.saveArrayToLocalStorage(localStorageKey, new Array());		
																	
			var lsArr = Nexus.CreateLocalStorageArray(localStorageKey);										
			var db = Nexus.CreateDB(lsArr);
			
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
			var arr = Nexus.Util.getArrayFromLocalStorage(localStorageKey);												
			
			// Assert	
			equal(all.length, 3, '3 items should be in array');																				
		});	
	
	};
return Nexus.Tests.LocalStorageDBTests;
});

