///////////////////////////////////////////////////
///// Project: NexusJS ////////////////////////////
///// Source: github.com/aksharp/NexusJS //////////
///////////////////////////////////////////////////
///// Author: Alex Khotyanov //////////////////////
///// Twitter: @NexusJS ///////////////////////////
///// Email: Alex@NexusJS.com /////////////////////
///////////////////////////////////////////////////
///// License: LGPL v3 ////////////////////////////
///// * http://www.gnu.org/copyleft/lesser.html ///
///// * Please email me if you are using NexusJS //
///////////////////////////////////////////////////

var NexusJS = {
	Tests: {
		run: function(tests){
			tests.map(function(test){
				test();
			});
		}
	}
};

NexusJS.App = {
    Domain: {
        EventHandlers: {}
    },
    Events: {},
    Commands: {},
    EventHandlers: {},
    CommandHandlers: {},
    ReadModels: {},
    DTOs: {},
    UI: {},
    Services: {},
    Tests: {},
    Validators: {},
    Templates: {},
    CommandBus: '',
    EventStore: '',
    EventBus: '',
    NewId: '',
    Analytics: {
    	PostToAnalyticsServer: function(msg){},
    	EnabledForCommands: false,
    	EnabledForEvents: false,
    	Message: function(msgType, jsonMsg){
    		this.msgDate = new Date();
    		this.msgType = msgType;
    		this.msgPayload = jsonMsg;
    	},
    	Post: function(msgType, jsonEvent){    		
    		var msg = new NexusJS.App.Analytics.Message(msgType, jsonEvent);
    		NexusJS.App.Analytics.PostToAnalyticsServer(msg);
	}
    }
};

/////////////////////////////////////////////////////
///////// DEFAULTS //////////////////////////////////
/////////////////////////////////////////////////////
NexusJS.Aggregate = { isRehydrating: false };
NexusJS.isReplayingEvents = false;

/////////////////////////////////////////////////////
///////// INTERFACES ////////////////////////////////
/////////////////////////////////////////////////////
NexusJS.Interfaces = {};

// this function was borrowed from http://knol.google.com/k/programming-to-the-interface-in-javascript-yes-it-can-be-done-er-i-mean-faked#
NexusJS.Interfaces.CheckIfImplements = function(theObject, theInterface) {
    for (var member in theInterface) {
        if ( (typeof theObject[member] != typeof theInterface[member]) ) {
            return false;
        }
    }
    return true;
};

NexusJS.Interfaces.CommandBus = {
	dispatch: function() {},
	registerCommandHandler: function() {},
	unregisterAllCommandHandlers: function() {},
	registerCommandHandlers: function() {}
};

NexusJS.Interfaces.EventHandler = {
	name: '',
	handlesEvent: '',
	handle: function() {}
};

NexusJS.Interfaces.CommandHandler = {
	name: '',
	handlesCommand: '',
	handle: function() {}
};


NexusJS.Interfaces.AnalyticsEnabledEvent = {
	sentToAnalyticsService: false,
	createdOn: '',
	createdBy: ''
};

NexusJS.Interfaces.ArrayList = {
	getAll: function() {},
	count: function() {},
	add: function() {},
	getAt: function() {},
	clear: function() {},
	removeAt: function() {},
	insert: function() {},
	indexOf: function() {},
	lastIndexOf: function() {}
};

NexusJS.Interfaces.Array = {
	clear: function(){},
	concat: function(){},
	getAll: function(){},
	getAt: function(){},
	indexOf: function(){},
	join: function(){},
	lastIndexOf: function(){},
	map: function(){},	
	pop: function(){},
	push: function(){},
	reverse: function(){},
	setAt: function(){},
	shift: function(){},
	size: function(){},
	slice: function(){},
	sort: function(){},
	splice: function(){},
	toString: function(){},
	unshift: function(){},
	valueOf: function(){},
};

NexusJS.Interfaces.DB = {
	clear: function(){},
	insert: function(){},
	update: function(){},
	delete: function(){},
	getAll: function(){},
	getById: function(){}
};

NexusJS.Interfaces.EventStore = {
	setEventBus: function(){},
	saveEvent: function(){},
	replayAllEvents: function(){},
	getAllEvents: function(){},
	getAllEventsById: function(){},
	getById: function(){},
	clear: function(){}	
};

/////////////////////////////////////////////////////
///////// HELPERS ///////////////////////////////////
/////////////////////////////////////////////////////
NexusJS.Helpers = {
	Validation: {
		isValid: function(validators){
			return NexusJS.Util.handleOneOrMany(
				validators,
				function(validator){
					return validator.isValid();
				},
				function(arr){
					return arr.indexOf(false) == -1;
				}
			);
		}
	}
};

/////////////////////////////////////////////////////
///////// UTIL //////////////////////////////////////
/////////////////////////////////////////////////////
NexusJS.Util = {
	isArray: function(obj){
		return ( Object.prototype.toString.call( obj ) === '[object Array]' );
	},
	
	isFunction: function(obj){
			return ( Object.prototype.toString.call( obj ) === '[object Function]' );
	},
	
	getArrayFromLocalStorage: function(key){
		var deserializedArray = eval(localStorage.getItem(key));
		return deserializedArray;
	},
			
	saveArrayToLocalStorage: function(key, arr){
		var serializedArray = NexusJS.Util.serialize(arr);
		localStorage.setItem(key, serializedArray);
	},	
	
	initLocalStorageArray: function(key){
		var serializedArray = JSON.stringify(new Array());
		localStorage.setItem(key, serializedArray);
	},		

	// this function was borrowed from JavaScript Pro book
	extend: function(subClass, superClass) {
	    var F = function() {};
	    F.prototype = superClass.prototype;
	    subClass.prototype = new F();
	    subClass.prototype.constructor = subClass;

	    subClass.superclass = superClass.prototype;
	    if(superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
	    }
	},
	handleOneOrMany: function(stuffToHandle, handlerFunction, arrResultFunction){
		if(NexusJS.Util.isArray(stuffToHandle)){
			var retval = new Array();
			stuffToHandle.map(function(eachStuff){
				var eachRetval = handlerFunction(eachStuff);
				retval.push(eachRetval);
			});
			if (arrResultFunction){
				return arrResultFunction(retval);
			}
			return retval;
		}else{
			return handlerFunction(stuffToHandle);
		}	
	},
	serialize: function(_obj)
	{
	   // Let Gecko browsers do this the easy way
	   if (typeof _obj.toSource !== 'undefined' && typeof _obj.callee === 'undefined')
	   {
	      return _obj.toSource();
	   }

	   // Other browsers must do it the hard way
	   switch (typeof _obj)
	   {
	      // numbers, booleans, and functions are trivial:
	      // just return the object itself since its default .toString()
	      // gives us exactly what we want
	      case 'number':
	      case 'boolean':
	      case 'function':
		 return _obj;
		 break;

	      // for JSON format, strings need to be wrapped in quotes
	      case 'string':
		 return '\'' + _obj + '\'';
		 break;

	      case 'object':
		 var str;
		 if (_obj.constructor === Array || typeof _obj.callee !== 'undefined')
		 {
		    str = '[';
		    var i, len = _obj.length;
		    for (i = 0; i < len-1; i++) { str += NexusJS.Util.serialize(_obj[i]) + ','; }
		    str += NexusJS.Util.serialize(_obj[i]) + ']';
		 }
		 else
		 {
		    str = '{';
		    var key;
		    for (key in _obj) { str += key + ':' + NexusJS.Util.serialize(_obj[key]) + ','; }
		    str = str.replace(/\,$/, '') + '}';
		 }
		 return str;
		 break;

	      default:
		 return 'UNKNOWN';
		 break;
	   }
	}		
};

/////////////////////////////////////////////////////
///////// ARRAY [SIMPLE] ////////////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateSimpleArray = function(){

	var SimpleArray = function(){
		this.size = function(){
			return this.length;
		};	
		
		this.getAt = function(i){
			return this[i];
		};
		
		this.getAll = function(){
			return this;
		};		
		
		this.clear = function(){
			this.splice(0,this.length);
		};
		
		this.setAt = function(index, obj){	
			this[index] = obj;
		};	
		
	};
	NexusJS.Util.extend(SimpleArray, Array);
	
	
	return new SimpleArray();
};

/////////////////////////////////////////////////////
///////// ARRAY [LOCAL STORAGE] /////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateLocalStorageArray = function(localStorageKey){

	// implements NexusJS.Interfaces.Array
	var LocalStorageArray = function(localStorageKey){
		var self = this;
		self.localStorageKey = localStorageKey;	
		
		self.getArrayFromLocalStorage = function(){
			return NexusJS.Util.getArrayFromLocalStorage(self.localStorageKey);
		};
			
		self.saveArrayToLocalStorage = function(arr){
			NexusJS.Util.saveArrayToLocalStorage(self.localStorageKey, arr);
		};	
		
		self.clear = function(){
			NexusJS.Util.saveArrayToLocalStorage(self.localStorageKey, new Array());		
		};
		
		self.concat = function(obj){
			var arr = self.getArrayFromLocalStorage();
			var retval = arr.concat(obj);
			self.saveArrayToLocalStorage(arr);
			return retval;
		};	
		
		self.getAt = function(index){
			var arr = self.getArrayFromLocalStorage();		
			return arr[index];
		};
		
		self.getAll = function(){
			var arr = self.getArrayFromLocalStorage();		
			return arr;
		};		
				
		self.indexOf = function(element, start){
			var arr = self.getArrayFromLocalStorage();
			return arr.indexOf(element, start);
		};
		
		self.join = function(separator){
			var arr = self.getArrayFromLocalStorage();
			return arr.join(separator);			
		};
		
		self.lastIndexOf = function(element, start){
			var arr = self.getArrayFromLocalStorage();
			return arr.lastIndexOf(element, start);
		};	
		
		self.map = function(fun /*, thisp*/){
			var arr = self.getArrayFromLocalStorage();

			var len = arr.length;
			if (typeof fun != "function")
			  throw new TypeError();
			
			var res = new Array(len);
			var thisp = arguments[1];
			for (var i = 0; i < len; i++)
			{
			  if (i in arr)
			    res[i] = fun.call(thisp, arr[i], i, arr);
			}
			
			return res;
		};	
		
		self.pop = function(){
			var arr = self.getArrayFromLocalStorage();
			var retval = arr.pop();
			self.saveArrayToLocalStorage(arr);
			return retval;
		};
		
		self.push = function(obj){
			var arr = self.getArrayFromLocalStorage();
			var retval = arr.push(obj);
			self.saveArrayToLocalStorage(arr);
			return retval;
		};		
		
		self.reverse = function(){
			var arr = self.getArrayFromLocalStorage();
			arr.reverse();
			self.saveArrayToLocalStorage(arr);
		};	
		
		self.setAt = function(index, obj){
			var arr = self.getArrayFromLocalStorage();		
			arr[index] = obj;
			self.saveArrayToLocalStorage(arr);			
		};		
		
		self.shift = function(){
			var arr = self.getArrayFromLocalStorage();
			var retval = arr.shift();
			self.saveArrayToLocalStorage(arr);
			return retval;
		};	
		
		self.size = function(){
			var arr = self.getArrayFromLocalStorage();
			return arr.length;
		};					
		
		self.slice = function(start, end){
			var arr = self.getArrayFromLocalStorage();
			var retval = arr.slice(start, end);
			self.saveArrayToLocalStorage(arr);
			return retval;
		};			
		
		self.sort = function(sortfunction){
			var arr = self.getArrayFromLocalStorage();
			var retval = arr.sort(sortfunction);
			self.saveArrayToLocalStorage(arr);
			return retval;
		};		
		
		self.splice = function(index, howmany){
			var arr = self.getArrayFromLocalStorage();
			var retval = arr.splice(index, howmany);
			self.saveArrayToLocalStorage(arr);
			return retval;
		};		
		
		self.toString = function(){
			var arr = self.getArrayFromLocalStorage();
			return arr.toString();
		};		
		
		self.unshift = function(obj){
			var arr = self.getArrayFromLocalStorage();
			var retval = arr.unshift(obj);
			self.saveArrayToLocalStorage(arr);
			return retval;
		};		
		
		self.valueOf = function(){
			var arr = self.getArrayFromLocalStorage();
			return arr.valueOf();
		};						
	};

	if (!localStorage[localStorageKey] || !NexusJS.Util.isArray(NexusJS.Util.getArrayFromLocalStorage(localStorageKey))){
		NexusJS.Util.initLocalStorageArray(localStorageKey);
	}
	
	var localStorageArray = new LocalStorageArray(localStorageKey);
	
	if (NexusJS.Interfaces.CheckIfImplements(localStorageArray, NexusJS.Interfaces.Array)){
		return localStorageArray; 
	}else{
		throw 'NexusJS.CreateLocalStorageArray() must implement NexusJS.Interfaces.Array interface';
	}
};

/////////////////////////////////////////////////////
///////// ARRAY LIST [CREATE] ///////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateArrayList = function(array){

	var ArrayList = function(array){
		var self = this;
		self.arr = array;
					
		self.getAll = function(){
			return self.arr;
		};		
		
		self.count = function(){
			return self.arr.size();
		};
		
		self.add = function(obj){
			self.arr.push(obj);
		};
		
		self.getAt = function(index){
			if( index > -1 && index < self.arr.size() )
				return self.arr.getAt(index);
			else
				return undefined; 
		};
		
		self.clear = function(){
			self.arr.clear();
		};
		
		self.removeAt = function(index){
			var m_count = self.arr.size();

			if ( m_count > 0 && index > -1 && index < self.arr.size() ){
				switch( index ){
					case 0:
						self.arr.shift();
						break;
					case m_count - 1:
						self.arr.pop();
						break;
					default:
						var head   = self.arr.slice(0, index);
						var tail   = self.arr.slice(index + 1);
						self.arr = head.concat(tail);
						break;
				}
			}
		};
		
		self.insert = function(object, index){
			var m_count       = self.arr.size();
			var m_returnValue = -1;

			if ( index > -1 && index <= m_count ){
				switch(index){
					 case 0:
						self.arr.unshift(object);
						m_returnValue = 0;
						break;
					 case m_count:
						self.arr.push(object);
						m_returnValue = m_count;
						break;
					 default:
						var head      = self.arr.slice(0, index - 1);
						var tail      = self.arr.slice(index);
						this.aList    = self.arr.concat(tail.unshift(object));
						m_returnValue = index;
						break;
				}
			}
			return m_returnValue;		
		};
		
		self.indexOf = function(object, startIndex){
			var m_count       = self.arr.size();
			var m_returnValue = - 1;

			if(startIndex > -1 && startIndex < m_count){
				var i = startIndex;

				while(i < m_count){
					if(self.arr.getAt(i) == object){
						m_returnValue = i;
						break;
					}
					i++;
				}
			}

			return m_returnValue;		
		};
		
		self.lastIndexOf = function(object, startIndex){
			var m_count       = self.arr.size();
			var m_returnValue = - 1;

			if(startIndex > -1 && startIndex < m_count){
				var i = m_count - 1;

				while(i >= startIndex){
					if (self.arr.getAt(i) == object){
						m_returnValue = i;
						break;
					}
					i--;
				}
			}

			return m_returnValue;		
		};		
	};
	
	var arrayList = new ArrayList(array);
	
	if (NexusJS.Interfaces.CheckIfImplements(arrayList, NexusJS.Interfaces.ArrayList)){
		return arrayList; 
	}else{
		throw 'NexusJS.CreateArrayList() must implement NexusJS.Interfaces.ArrayList interface';
	}	
};

/////////////////////////////////////////////////////
///////// ARRAY LIST [SIMPLE] ///////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateSimpleArrayList = function(){
	return NexusJS.CreateArrayList(NexusJS.CreateSimpleArray());
};

/////////////////////////////////////////////////////
///////// ARRAY LIST [LOCAL STORAGE] ////////////////
/////////////////////////////////////////////////////
NexusJS.CreateLocalStorageArrayList = function(localStorageKey){	
	var localStorageArray = NexusJS.CreateLocalStorageArray(localStorageKey);
	return NexusJS.CreateArrayList(localStorageArray);	
};

/////////////////////////////////////////////////////
///////// DB [CREATE] ///////////////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateDB = function(arr){
	var DB = function(arr){
		var self = this;
		self.arr = arr;
	
		self.insert = function(obj){
			self.arr.push(obj);
		},
		
		self.update = function(obj){
			for(var index=0;index<self.arr.size();index++){
				if(obj.id == self.arr.getAt(index).id){
					self.arr.setAt(index, obj);
					return;
				}
			}		
		},
		
		self.delete = function(obj){	
			for(index=0;index<self.arr.size();index++){
				if(obj.id == self.arr.getAt(index).id){
					self.arr.splice(index, 1);
					return;
				}
			}
		},
		
		self.getAll = function(){
			return self.arr.getAll();
		},
		
		self.getById = function(id){
			for(index=0;index<self.arr.size();index++){
				if(id == self.arr.getAt(index).id){
					return self.arr.getAt(index);
				}
			}
			return undefined;
		},
		
		self.clear = function(){
			self.arr.splice(0,self.arr.size());			
		}		
									
	};

	if (NexusJS.Interfaces.CheckIfImplements(arr, NexusJS.Interfaces.Array)){
		return new DB(arr); 
	}else{
		throw new Error('arr must implement NexusJS.Interfaces.Array interface');
	}	
};

/////////////////////////////////////////////////////
///////// CREATE DB [SIMPLE] ////////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateSimpleDB = function(){
	var arr = NexusJS.CreateSimpleArray();	
	return NexusJS.CreateDB(arr); 
};

/////////////////////////////////////////////////////
///////// CREATE DB [LOCAL STORAGE] /////////////////
/////////////////////////////////////////////////////
NexusJS.CreateLocalStorageDB = function(localStorageKey){
	var arr = NexusJS.CreateLocalStorageArray(localStorageKey);	
	return NexusJS.CreateDB(arr); 
};

/////////////////////////////////////////////////////
///////// NEW GUID //////////////////////////////////
/////////////////////////////////////////////////////
// this function was borrowed from another open source project
NexusJS.NewGuid = function() {
        var S4 = function() {
	        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        var separator = "_";
        return (S4()+S4()+separator+S4()+separator+S4()+separator+S4()+separator+S4()+S4()+S4());
};

//TODO: create tests, rewrite and have cachable extend this one
/////////////////////////////////////////////////////
///////// EVENT STORE [SIMPLE] //////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateSimpleEventStore = function(){

	var EventStore = function(){
		var self = this;
		var evtBus = '';
	
		self.eventRepo = new Array();
		
		self.setEventBus = function(evtBus){
			self.evtBus = evtBus;
		};

		self.saveEvent = function(evt){
			if(!NexusJS.Aggregate.isRehydrating && !NexusJS.isReplayingEvents){
			      self.eventRepo.push(evt);
			}
		};
		
		self.replayAllEvents = function(){
			NexusJS.isReplayingEvents = true;
			self.getAllEvents().map(function(evt){
				
				self.evtBus.publish(evt);
			});
			NexusJS.isReplayingEvents = false;
		};		

		self.getAllEvents = function(){
            		return self.eventRepo;	
		};	

		self.getAllEventsById = function(id){
			var eventsById = new Array();

			self.eventRepo.map(function(evt){
				if (evt.id == id){
					eventsById.push(evt);
				}
			});

			return eventsById;	
		};		

		self.getById = function(id, className){

			NexusJS.Aggregate.isRehydrating = true;
			
			if (className.indexOf(".") == -1){
				var obj = new window[className]();
			}else{
				var namespace = className.split('.');
				var w = "new window";
				for (var i=0; i<namespace.length; i++){
					w += "['" + namespace[i] + "']";
				}
				var obj = eval(w);
			}

			self.eventRepo.map(function(evt){
				if (evt.id == id){
					obj.applyEvent(evt);
				}
			});

			NexusJS.Aggregate.isRehydrating = false;

			return obj;
		};		
	}

	return new EventStore();
};	

//TODO: get rid of getById and use rehydrate instead
/////////////////////////////////////////////////////
///////// CACHABLE EVENT STORE [CREATE] /////////////
/////////////////////////////////////////////////////
NexusJS.CreateCachableEventStore = function(arrList){
	var CachableEventStore = function(arrList){
		var self = this;
		self.eventBus = '';
		self.events = arrList;
		self.cache = new Array();

		self.setEventBus = function(eventBus){
			self.eventBus = eventBus;
		};		
				
		self.saveEvent = function(evt){
			if(!NexusJS.Aggregate.isRehydrating && !NexusJS.isReplayingEvents){
				self.events.add(evt);
			}
		};
		
		self.clear = function(){
			self.events.clear();
		};
		
		self.getAllEvents = function(){
            return self.events.getAll();	
		};		
		
		self.replayAllEvents = function(){
			NexusJS.isReplayingEvents = true;
			self.getAllEvents().map(function(evt){
				self.eventBus.publish(evt);
			});
			NexusJS.isReplayingEvents = false;
		};
		
		self.rehydrate = function(id, fullyQualifiedClassName){

			// return from cache (by id) if there is one there
			for(var j=0;j<self.cache.length;j++){
				if (id == self.cache[j].id){
					return self.cache[j];
				}                
			}

			NexusJS.Aggregate.isRehydrating = true;
			
			if (fullyQualifiedClassName.indexOf(".") == -1){
				var obj = new window[fullyQualifiedClassName]();
			}else{
				var namespace = fullyQualifiedClassName.split('.');
				var w = "new window";
				for (var i=0; i<namespace.length; i++){
					w += "['" + namespace[i] + "']";
				}
				var obj = eval(w);
			}

			self.events.getAll().map(function(evt){
				if (evt.id == id){
					obj.applyEvent(evt); //TODO: make sure event interface has this method
				}
			});

			NexusJS.Aggregate.isRehydrating = false;
            
            // cache object
            self.cache.push(obj);

			return obj;
		};		
		
		self.getAllEventsById = function(id){
			var eventsById = new Array();
			self.events.getAll().map(function(evt){
				if(evt.id == id){
					eventsById.push(evt);
				}
			});
			return eventsById;
		};
		
		self.getById = function(id, className){
			return self.rehydrate(id, className);
		};
	}
	
	if (NexusJS.Interfaces.CheckIfImplements(arrList, NexusJS.Interfaces.ArrayList)){
		return new CachableEventStore(arrList); 
	}else{
		throw new Error('arrList must implement NexusJS.Interfaces.ArrayList interface');
	}	
};

/////////////////////////////////////////////////////
///////// CREATE CACHABLE EVENT STORE [SIMPLE] //////
/////////////////////////////////////////////////////
NexusJS.CreateSimpleCachableEventStore = function(){
	var simpleArrayList = NexusJS.CreateSimpleArrayList();
	return NexusJS.CreateCachableEventStore(simpleArrayList);
};

/////////////////////////////////////////////////////
//// CREATE CACHABLE EVENT STORE [LOCAL STORAGE] ////
/////////////////////////////////////////////////////
NexusJS.CreateLocalStorageCachableEventStore = function(localStorageKey){
	var localStorageArrayList = NexusJS.CreateLocalStorageArrayList(localStorageKey);
	return NexusJS.CreateCachableEventStore(localStorageArrayList);
};

/////////////////////////////////////////////////////
///////// COMMAND HANDLER ///////////////////////////
/////////////////////////////////////////////////////
NexusJS.CommandHandler = function(commandHandlerName, commandNameToHandle, handleMethod){
	this.name = commandHandlerName;
	this.handlesCommand = commandNameToHandle;
	this.handle = handleMethod;							
};	

/////////////////////////////////////////////////////
///////// COMMAND BUS [CREATE] //////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateCommandBus = function(arr){
	if (!NexusJS.Interfaces.CheckIfImplements(arr, NexusJS.Interfaces.ArrayList)){
		throw 'NexusJS.CreateCommandBus "arr" parameter must implement NexusJS.Interfaces.ArrayList interface';
	}
	
	var CommandBus = function(arr){
		var self = this;
		self.commandHandlers = arr;
		
		self.dispatch = function(command){
			// Analytics
			if (NexusJS.App.Analytics.EnabledForCommands && !NexusJS.Aggregate.isRehydrating ){  
				NexusJS.App.Analytics.Post('COMMAND', JSON.stringify(command));
			}	
			
			var cmdHandlersCount = self.commandHandlers.count();
			
			for( var i = 0; i < cmdHandlersCount; i++ ){
				var commandHandler = self.commandHandlers.getAt(i);
				if (commandHandler.handlesCommand == command.commandName){
					commandHandler.handle(command);
					return;
				}
			}			
		};
		
		self.registerCommandHandler = function(commandHandler){
			if (!NexusJS.Interfaces.CheckIfImplements(commandHandler, NexusJS.Interfaces.CommandHandler)){
				throw 'Invalid CommandHandler (' + commandHandler.name + '). CommandHandler must implement (NexusJS.Interfaces.CommandHandler) interface';
			}

			var alreadyRegistered = false;
			
			self.commandHandlers.getAll().map(function(registeredCommandHandler){
				if(commandHandler.name == registeredCommandHandler.name){
					alreadyRegistered = true;
				}
			});			

			if (!alreadyRegistered){
				self.commandHandlers.add(commandHandler);	
			}
		};
		
		self.unregisterAllCommandHandlers = function(){
			self.commandHandlers.clear();
		};	
		
		self.registerCommandHandlers = function(commandHandlers){
			commandHandlers.map(function(commandHandler){
				self.registerCommandHandler(commandHandler);
			});	
		};		
	};
	
	return new CommandBus(arr);
	
};	

/////////////////////////////////////////////////////
///////// COMMAND BUS [SIMPLE] //////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateSimpleCommandBus = function(){
	return new NexusJS.CreateCommandBus(new NexusJS.CreateSimpleArrayList());
};	

/////////////////////////////////////////////////////
///////// COMMAND BUS [LOCAL STORAGE]//////////////////
/////////////////////////////////////////////////////
NexusJS.CreateLocalStorageCommandBus = function(localStorageKey){
	return new NexusJS.CreateCommandBus(new NexusJS.CreateLocalStorageArrayList(localStorageKey))
};

/////////////////////////////////////////////////////
///////// EVENT HANDLER /////////////////////////////
/////////////////////////////////////////////////////
NexusJS.EventHandler = function(eventHandlerName, eventNameToHandle, handleMethod){
	this.name = eventHandlerName;
	this.handlesEvent = eventNameToHandle;
	this.handle = handleMethod;							
};	

/////////////////////////////////////////////////////
///////// EVENT BUS [CREATE] ////////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateEventBus = function(eventStore, arr){
	if (!NexusJS.Interfaces.CheckIfImplements(arr, NexusJS.Interfaces.ArrayList)){
		throw 'NexusJS.CreateEventBus "arr" parameter must implement NexusJS.Interfaces.ArrayList interface';
	}	

	var EventBus = function(eventStore, arr){
		//TODO: check eventStore to satisfy interface
		var self = this;
		self.eventStore = eventStore;
		self.eventHandlers = arr;
		self.eventStore.setEventBus(self);

		self.publish = function(evt){
			// Analytics
			if (NexusJS.App.Analytics.EnabledForEvents && !NexusJS.Aggregate.isRehydrating ){  
				NexusJS.App.Analytics.Post('EVENT', JSON.stringify(evt));
			}

			self.eventStore.saveEvent(evt);
			
			var evtHandlersCount = self.eventHandlers.count();

			for(var i = 0; i < evtHandlersCount; i++){
				var eventHandler = self.eventHandlers.getAt(i);
				if (eventHandler.handlesEvent == evt.eventName){
					if (!NexusJS.Aggregate.isRehydrating){   
						eventHandler.handle(evt);
					}
				}
			}			
		};

		self.registerEventHandler = function(eventHandler){
			if (!NexusJS.Interfaces.CheckIfImplements(eventHandler, NexusJS.Interfaces.EventHandler)){
				throw 'Invalid EventHandler (' + eventHandler.name + '). EventHandler must implement (NexusJS.Interfaces.EventHandler) interface';
			}	
			
			var alreadyRegistered = false;
			
			self.eventHandlers.getAll().map(function(registeredEventHandler){
				if(eventHandler.name == registeredEventHandler.name){
					alreadyRegistered = true;
				}
			});

			if (!alreadyRegistered){
				self.eventHandlers.add(eventHandler);	
			}
		};
		
		self.registerEventHandlers = function(eventHandlers){
			eventHandlers.map(function(eventHandler){
				self.registerEventHandler(eventHandler);
			});	
		};

		self.unregisterEventHandler = function(eventHandler){
			if (!NexusJS.Interfaces.CheckIfImplements(eventHandler, NexusJS.Interfaces.EventHandler)){
				throw 'Invalid EventHandler. EventHandler must implement (NexusJS.Interfaces.EventHandler) interface';
			}

			self.eventHandlers.removeAt(self.eventHandlers.indexOf(eventHandler,0));		
		};
		
		self.unregisterAllEventHandlers = function(){
			self.eventHandlers.clear();
		};
	};
	
	return new EventBus(eventStore, arr);
};

/////////////////////////////////////////////////////
///////// EVENT BUS [SIMPLE]/////////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateSimpleEventBus = function(eventStore){
	return new NexusJS.CreateEventBus(eventStore, new NexusJS.CreateSimpleArrayList());
};

/////////////////////////////////////////////////////
///////// EVENT BUS [LOCAL STORAGE]//////////////////
/////////////////////////////////////////////////////
NexusJS.CreateLocalStorageEventBus = function(eventStore, localStorageKey){
	return new NexusJS.CreateEventBus(eventStore, new NexusJS.CreateLocalStorageArrayList(localStorageKey));
};

/////////////////////////////////////////////////////
///////// READ MODEL [SIMPLE]////////////////////////
/////////////////////////////////////////////////////
NexusJS.CreateSimpleReadModel = function(){
	return NexusJS.CreateSimpleDB();
};

/////////////////////////////////////////////////////
///////// READ MODEL [LOCAL STORAGE]/////////////////
/////////////////////////////////////////////////////
NexusJS.CreateLocalStorageReadModel = function(localStorageKey){
    return NexusJS.CreateLocalStorageDB(localStorageKey);
};

/////////////////////////////////////////////////////
///////// TEST - [QUNIT] ////////////////////////////
/////////////////////////////////////////////////////
NexusJS.Test = function(testName){
    
	var fixture = this;
	fixture.givenEvents = '';
	fixture.whenCommand = '';
	fixture.expectedEvents = '';
	fixture.beforeTest = '';
	fixture.afterTest = '';
	
	// test uses fake event store so not to write to real one
	var BACKUP = {
		EVENT_STORE: NexusJS.App.EventStore
	};

	// before test
	this.BeforeTest = function(beforeTest){
		fixture.beforeTest = beforeTest;

			// given
			this.Given = function(givenEvents){
				fixture.givenEvents = givenEvents;

				// when
				this.When = function(whenCommand){
					fixture.whenCommand = whenCommand;

					// then
					this.Then = function(thenEvents){
						fixture.expectedEvents = thenEvents;
						
						this.AfterTest = function(afterTest){
							fixture.afterTest = afterTest;
							// run test
							this.Run = function(){

								NexusJS.Aggregate.isRehydrating = false;
								var finalGivenEvent = 'final_given_event';

								// before test
								NexusJS.App.EventStore = NexusJS.CreateSimpleEventStore();
								NexusJS.App.EventBus.eventStore = NexusJS.App.EventStore;
								NexusJS.App.EventStore.setEventBus(NexusJS.App.EventBus);								
								if (NexusJS.Util.isFunction(fixture.beforeTest)){
									fixture.beforeTest();
								}

								// given
								if (fixture.givenEvents){
									NexusJS.Util.handleOneOrMany(
										fixture.givenEvents, 
										function(evt){
											NexusJS.App.EventBus.publish(evt);
										}
									);									
								}
								NexusJS.App.EventStore.saveEvent(finalGivenEvent);

								// when
								NexusJS.App.CommandBus.dispatch(fixture.whenCommand); // single command only! by design!

								// then
								var expectedEvents =
								NexusJS.Util.handleOneOrMany(
									fixture.expectedEvents, 
									function(evt){								
										return JSON.stringify(evt);
									}, 
									function(arr){
										return arr.join('');
									}
								);
								var actualEvents = '';
								var startWritingToActualEvents = false;

								NexusJS.App.EventStore.getAllEvents().map(function (evt) {
								if (startWritingToActualEvents){
									actualEvents += JSON.stringify(evt);
								}
								if (evt == finalGivenEvent){
									startWritingToActualEvents = true;
								}
								});

								// QUnit integration
								test(testName, function() {
									deepEqual( actualEvents, expectedEvents, 'expectedEvents, actualEvents are different');
								})
								
								// after test
								NexusJS.App.EventStore = BACKUP.EVENT_STORE;
								NexusJS.App.EventBus.eventStore = NexusJS.App.EventStore;
								NexusJS.App.EventStore.setEventBus(NexusJS.App.EventBus);	
								if (NexusJS.Util.isFunction(fixture.afterTest)){
									fixture.afterTest();
								}
								
							// run test
							};														
							return this; // return after test
						// after test
						}
						return this; // return then
					// then						
					};
					return this; // return when
				// when					
				};			
				return this; // return given
			// given				
			};			
		return this; // return before test
	// before test	    		
	};
	return this; // return NexusJS.Test
// NexusJS.Test	
};

