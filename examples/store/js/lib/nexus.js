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


define(function(){

var Nexus = {
	Tests: {
		run: function(tests){
			tests.map(function(test){
				test();
			});
		}
	}
};

Nexus.App = {
    Domain: {},
    Events: {},
    Commands: {},
    EventHandlers: {},
    CommandHandlers: {},
    ReadModels: {},
    DTOs: {},
    UI: {
    	Path: {
    		Require: {
	    		jquery: 'jquery',
	    		mustache: 'mustache'    			
    		},
    		templates: 'app/templates'
    	},
		renderView: function(evt, templatePath, placeholder){
			require([
				Nexus.App.UI.Path.Require.jquery,
				Nexus.App.UI.Path.Require.mustache,
				"text!" + Nexus.App.UI.Path.templates + "/" + templatePath
			], function($, Mustache, tpl) {
				$(placeholder).html(Mustache.to_html(tpl, evt));						
			});    	
		}
    },
    Services: {},
    Tests: {},
    Validators: {},
    Templates: {},
    CommandBus: '',
    EventStore: '',
    EventBus: '',
    newId: 'assign id generator strategy function here',
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
    		var msg = new Nexus.App.Analytics.Message(msgType, jsonEvent);
    		Nexus.App.Analytics.PostToAnalyticsServer(msg);
	}
    }
};

/////////////////////////////////////////////////////
///////// DEFAULTS //////////////////////////////////
/////////////////////////////////////////////////////
Nexus.Aggregate = { isRehydrating: false };
Nexus.isReplayingEvents = false;

/////////////////////////////////////////////////////
///////// INTERFACES ////////////////////////////////
/////////////////////////////////////////////////////
Nexus.Interfaces = {};

// this function was borrowed from http://knol.google.com/k/programming-to-the-interface-in-javascript-yes-it-can-be-done-er-i-mean-faked#
Nexus.Interfaces.CheckIfImplements = function(theObject, theInterface) {
    for (var member in theInterface) {
        if ( (typeof theObject[member] != typeof theInterface[member]) ) {
            return false;
        }
    }
    return true;
};

Nexus.Interfaces.CommandBus = {
	dispatch: function() {},
	registerCommandHandler: function() {},
	unregisterAllCommandHandlers: function() {},
	registerCommandHandlers: function() {}
};

Nexus.Interfaces.EventHandler = {
	name: '',
	handlesEvent: '',
	handle: function() {}
};

Nexus.Interfaces.CommandHandler = {
	name: '',
	handlesCommand: '',
	handle: function() {}
};


Nexus.Interfaces.AnalyticsEnabledEvent = {
	sentToAnalyticsService: false,
	createdOn: '',
	createdBy: ''
};

Nexus.Interfaces.ArrayList = {
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

Nexus.Interfaces.Array = {
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

Nexus.Interfaces.DB = {
	clear: function(){},
	insert: function(){},
	update: function(){},
	delete: function(){},
	getAll: function(){},
	getById: function(){}
};

Nexus.Interfaces.EventStore = {
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
Nexus.Helpers = {
	Validation: {
		isValid: function(validators){
			return Nexus.Util.handleOneOrMany(
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
Nexus.Util = {
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
		var serializedArray = Nexus.Util.serialize(arr);
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
		if(Nexus.Util.isArray(stuffToHandle)){
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
		    for (i = 0; i < len-1; i++) { str += Nexus.Util.serialize(_obj[i]) + ','; }
		    str += Nexus.Util.serialize(_obj[i]) + ']';
		 }
		 else
		 {
		    str = '{';
		    var key;
		    for (key in _obj) { str += key + ':' + Nexus.Util.serialize(_obj[key]) + ','; }
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
Nexus.CreateSimpleArray = function(){

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
	Nexus.Util.extend(SimpleArray, Array);
	
	
	return new SimpleArray();
};

/////////////////////////////////////////////////////
///////// ARRAY [LOCAL STORAGE] /////////////////////
/////////////////////////////////////////////////////
Nexus.CreateLocalStorageArray = function(localStorageKey){

	// implements Nexus.Interfaces.Array
	var LocalStorageArray = function(localStorageKey){
		var self = this;
		self.localStorageKey = localStorageKey;	
		
		self.getArrayFromLocalStorage = function(){
			return Nexus.Util.getArrayFromLocalStorage(self.localStorageKey);
		};
			
		self.saveArrayToLocalStorage = function(arr){
			Nexus.Util.saveArrayToLocalStorage(self.localStorageKey, arr);
		};	
		
		self.clear = function(){
			Nexus.Util.saveArrayToLocalStorage(self.localStorageKey, new Array());		
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

	if (!localStorage[localStorageKey] || !Nexus.Util.isArray(Nexus.Util.getArrayFromLocalStorage(localStorageKey))){
		Nexus.Util.initLocalStorageArray(localStorageKey);
	}
	
	var localStorageArray = new LocalStorageArray(localStorageKey);
	
	if (Nexus.Interfaces.CheckIfImplements(localStorageArray, Nexus.Interfaces.Array)){
		return localStorageArray; 
	}else{
		throw 'Nexus.CreateLocalStorageArray() must implement Nexus.Interfaces.Array interface';
	}
};

/////////////////////////////////////////////////////
///////// ARRAY LIST [CREATE] ///////////////////////
/////////////////////////////////////////////////////
Nexus.CreateArrayList = function(array){

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
	
	if (Nexus.Interfaces.CheckIfImplements(arrayList, Nexus.Interfaces.ArrayList)){
		return arrayList; 
	}else{
		throw 'Nexus.CreateArrayList() must implement Nexus.Interfaces.ArrayList interface';
	}	
};

/////////////////////////////////////////////////////
///////// ARRAY LIST [SIMPLE] ///////////////////////
/////////////////////////////////////////////////////
Nexus.CreateSimpleArrayList = function(){
	return Nexus.CreateArrayList(Nexus.CreateSimpleArray());
};

/////////////////////////////////////////////////////
///////// ARRAY LIST [LOCAL STORAGE] ////////////////
/////////////////////////////////////////////////////
Nexus.CreateLocalStorageArrayList = function(localStorageKey){	
	var localStorageArray = Nexus.CreateLocalStorageArray(localStorageKey);
	return Nexus.CreateArrayList(localStorageArray);	
};

/////////////////////////////////////////////////////
///////// DB [CREATE] ///////////////////////////////
/////////////////////////////////////////////////////
Nexus.CreateDB = function(arr){
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

	if (Nexus.Interfaces.CheckIfImplements(arr, Nexus.Interfaces.Array)){
		return new DB(arr); 
	}else{
		throw new Error('arr must implement Nexus.Interfaces.Array interface');
	}	
};

/////////////////////////////////////////////////////
///////// CREATE DB [SIMPLE] ////////////////////////
/////////////////////////////////////////////////////
Nexus.CreateSimpleDB = function(){
	var arr = Nexus.CreateSimpleArray();	
	return Nexus.CreateDB(arr); 
};

/////////////////////////////////////////////////////
///////// CREATE DB [LOCAL STORAGE] /////////////////
/////////////////////////////////////////////////////
Nexus.CreateLocalStorageDB = function(localStorageKey){
	var arr = Nexus.CreateLocalStorageArray(localStorageKey);	
	return Nexus.CreateDB(arr); 
};

/////////////////////////////////////////////////////
///////// NEW GUID //////////////////////////////////
/////////////////////////////////////////////////////
// this function was borrowed from another open source project
Nexus.NewGuid = function() {
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
Nexus.CreateSimpleEventStore = function(){

	var EventStore = function(){
		var self = this;
		var evtBus = '';
	
		self.eventRepo = new Array();
		
		self.setEventBus = function(evtBus){
			self.evtBus = evtBus;
		};

		self.saveEvent = function(evt){
			if(!Nexus.Aggregate.isRehydrating && !Nexus.isReplayingEvents){
			      self.eventRepo.push(evt);
			}
		};
		
		self.replayAllEvents = function(){
			Nexus.isReplayingEvents = true;
			self.getAllEvents().map(function(evt){
				
				self.evtBus.publish(evt);
			});
			Nexus.isReplayingEvents = false;
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

			Nexus.Aggregate.isRehydrating = true;
			
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

			Nexus.Aggregate.isRehydrating = false;

			return obj;
		};		
	}

	return new EventStore();
};	

//TODO: get rid of getById and use rehydrate instead
/////////////////////////////////////////////////////
///////// CACHABLE EVENT STORE [CREATE] /////////////
/////////////////////////////////////////////////////
Nexus.CreateCachableEventStore = function(arrList){
	var CachableEventStore = function(arrList){
		var self = this;
		self.eventBus = '';
		self.events = arrList;
		self.cache = new Array();

		self.setEventBus = function(eventBus){
			self.eventBus = eventBus;
		};		
				
		self.saveEvent = function(evt){
			if(!Nexus.Aggregate.isRehydrating && !Nexus.isReplayingEvents){
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
			Nexus.isReplayingEvents = true;
			self.getAllEvents().map(function(evt){
				self.eventBus.publish(evt);
			});
			Nexus.isReplayingEvents = false;
		};
		
		self.rehydrate = function(id, fullyQualifiedClassName){

			// return from cache (by id) if there is one there
			for(var j=0;j<self.cache.length;j++){
				if (id == self.cache[j].id){
					return self.cache[j];
				}                
			}

			Nexus.Aggregate.isRehydrating = true;
			
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

			Nexus.Aggregate.isRehydrating = false;
            
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
	
	if (Nexus.Interfaces.CheckIfImplements(arrList, Nexus.Interfaces.ArrayList)){
		return new CachableEventStore(arrList); 
	}else{
		throw new Error('arrList must implement Nexus.Interfaces.ArrayList interface');
	}	
};

/////////////////////////////////////////////////////
///////// CREATE CACHABLE EVENT STORE [SIMPLE] //////
/////////////////////////////////////////////////////
Nexus.CreateSimpleCachableEventStore = function(){
	var simpleArrayList = Nexus.CreateSimpleArrayList();
	return Nexus.CreateCachableEventStore(simpleArrayList);
};

/////////////////////////////////////////////////////
//// CREATE CACHABLE EVENT STORE [LOCAL STORAGE] ////
/////////////////////////////////////////////////////
Nexus.CreateLocalStorageCachableEventStore = function(localStorageKey){
	var localStorageArrayList = Nexus.CreateLocalStorageArrayList(localStorageKey);
	return Nexus.CreateCachableEventStore(localStorageArrayList);
};

/////////////////////////////////////////////////////
///////// COMMAND HANDLER ///////////////////////////
/////////////////////////////////////////////////////
Nexus.CommandHandler = function(commandHandlerName, commandNameToHandle, handleMethod){
	this.name = commandHandlerName;
	this.handlesCommand = commandNameToHandle;
	this.handle = handleMethod;							
};	

/////////////////////////////////////////////////////
///////// COMMAND BUS [CREATE] //////////////////////
/////////////////////////////////////////////////////
Nexus.CreateCommandBus = function(arr){
	if (!Nexus.Interfaces.CheckIfImplements(arr, Nexus.Interfaces.ArrayList)){
		throw 'Nexus.CreateCommandBus "arr" parameter must implement Nexus.Interfaces.ArrayList interface';
	}
	
	var CommandBus = function(arr){
		var self = this;
		self.commandHandlers = arr;
		
		self.dispatch = function(command){
			// Analytics
			if (Nexus.App.Analytics.EnabledForCommands && !Nexus.Aggregate.isRehydrating ){  
				Nexus.App.Analytics.Post('COMMAND', JSON.stringify(command));
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
			if (!Nexus.Interfaces.CheckIfImplements(commandHandler, Nexus.Interfaces.CommandHandler)){
				throw 'Invalid CommandHandler (' + commandHandler.name + '). CommandHandler must implement (Nexus.Interfaces.CommandHandler) interface';
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
Nexus.CreateSimpleCommandBus = function(){
	return new Nexus.CreateCommandBus(new Nexus.CreateSimpleArrayList());
};	

/////////////////////////////////////////////////////
///////// COMMAND BUS [LOCAL STORAGE]//////////////////
/////////////////////////////////////////////////////
Nexus.CreateLocalStorageCommandBus = function(localStorageKey){
	return new Nexus.CreateCommandBus(new Nexus.CreateLocalStorageArrayList(localStorageKey))
};

/////////////////////////////////////////////////////
///////// EVENT HANDLER /////////////////////////////
/////////////////////////////////////////////////////
Nexus.EventHandler = function(eventHandlerName, eventNameToHandle, handleMethod){
	this.name = eventHandlerName;
	this.handlesEvent = eventNameToHandle;
	this.handle = handleMethod;							
};	

/////////////////////////////////////////////////////
///////// EVENT BUS [CREATE] ////////////////////////
/////////////////////////////////////////////////////
Nexus.CreateEventBus = function(eventStore, arr){
	if (!Nexus.Interfaces.CheckIfImplements(arr, Nexus.Interfaces.ArrayList)){
		throw 'Nexus.CreateEventBus "arr" parameter must implement Nexus.Interfaces.ArrayList interface';
	}	

	var EventBus = function(eventStore, arr){
		//TODO: check eventStore to satisfy interface
		var self = this;
		self.eventStore = eventStore;
		self.eventHandlers = arr;
		self.eventStore.setEventBus(self);

		self.publish = function(evt){
			// Analytics
			if (Nexus.App.Analytics.EnabledForEvents && !Nexus.Aggregate.isRehydrating ){  
				Nexus.App.Analytics.Post('EVENT', JSON.stringify(evt));
			}

			self.eventStore.saveEvent(evt);
			
			var evtHandlersCount = self.eventHandlers.count();

			for(var i = 0; i < evtHandlersCount; i++){
				var eventHandler = self.eventHandlers.getAt(i);
				if (eventHandler.handlesEvent == evt.eventName){
					if (!Nexus.Aggregate.isRehydrating){   
						eventHandler.handle(evt);
					}
				}
			}			
		};

		self.registerEventHandler = function(eventHandler){
			if (!Nexus.Interfaces.CheckIfImplements(eventHandler, Nexus.Interfaces.EventHandler)){
				throw 'Invalid EventHandler (' + eventHandler.name + '). EventHandler must implement (Nexus.Interfaces.EventHandler) interface';
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
			if (!Nexus.Interfaces.CheckIfImplements(eventHandler, Nexus.Interfaces.EventHandler)){
				throw 'Invalid EventHandler. EventHandler must implement (Nexus.Interfaces.EventHandler) interface';
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
Nexus.CreateSimpleEventBus = function(eventStore){
	return new Nexus.CreateEventBus(eventStore, new Nexus.CreateSimpleArrayList());
};

/////////////////////////////////////////////////////
///////// EVENT BUS [LOCAL STORAGE]//////////////////
/////////////////////////////////////////////////////
Nexus.CreateLocalStorageEventBus = function(eventStore, localStorageKey){
	return new Nexus.CreateEventBus(eventStore, new Nexus.CreateLocalStorageArrayList(localStorageKey));
};

/////////////////////////////////////////////////////
///////// READ MODEL [SIMPLE]////////////////////////
/////////////////////////////////////////////////////
Nexus.CreateSimpleReadModel = function(){
	return Nexus.CreateSimpleDB();
};

/////////////////////////////////////////////////////
///////// READ MODEL [LOCAL STORAGE]/////////////////
/////////////////////////////////////////////////////
Nexus.CreateLocalStorageReadModel = function(localStorageKey){
    return Nexus.CreateLocalStorageDB(localStorageKey);
};

/////////////////////////////////////////////////////
///////// TEST - [QUNIT] ////////////////////////////
/////////////////////////////////////////////////////
Nexus.Test = function(testName){
    
	var fixture = this;
	fixture.givenEvents = '';
	fixture.whenCommand = '';
	fixture.expectedEvents = '';
	fixture.beforeTest = '';
	fixture.afterTest = '';
	
	// test uses fake event store so not to write to real one
	var BACKUP = {
		EVENT_STORE: Nexus.App.EventStore
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

								Nexus.Aggregate.isRehydrating = false;
								var finalGivenEvent = 'final_given_event';

								// before test
								Nexus.App.EventStore = Nexus.CreateSimpleEventStore();
								Nexus.App.EventBus.eventStore = Nexus.App.EventStore;
								Nexus.App.EventStore.setEventBus(Nexus.App.EventBus);								
								if (Nexus.Util.isFunction(fixture.beforeTest)){
									fixture.beforeTest();
								}

								// given
								if (fixture.givenEvents){
									Nexus.Util.handleOneOrMany(
										fixture.givenEvents, 
										function(evt){
											Nexus.App.EventBus.publish(evt);
										}
									);									
								}
								Nexus.App.EventStore.saveEvent(finalGivenEvent);

								// when
								Nexus.App.CommandBus.dispatch(fixture.whenCommand); // single command only! by design!

								// then
								var expectedEvents =
								Nexus.Util.handleOneOrMany(
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

								Nexus.App.EventStore.getAllEvents().map(function (evt) {
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
								Nexus.App.EventStore = BACKUP.EVENT_STORE;
								Nexus.App.EventBus.eventStore = Nexus.App.EventStore;
								Nexus.App.EventStore.setEventBus(Nexus.App.EventBus);	
								if (Nexus.Util.isFunction(fixture.afterTest)){
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
	return this; // return Nexus.Test
// Nexus.Test	
};

return Nexus;
});
