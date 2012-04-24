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
	///////////////////////////////////////////////////    
	// TEST NEXUS FRAMEWORK ///////////////////////////
	///////////////////////////////////////////////////
	Tests: {
		run: function(tests){
			tests.map(function(test){
				test();
			});
		}
	},
	///////////////////////////////////////////////////    
	// VALIDATION /////////////////////////////////////
	///////////////////////////////////////////////////
	Validatable: function(validator, failFunction, failFunctionParams){
		this.validator = validator;
		this.failFunction = failFunction;
		this.failFunctionParams = failFunctionParams;
	},
	Validate: function(validatables, passFunction, passFunctionParams){   	    	
		var allAreValid = Nexus.Util.handleOneOrMany(
			validatables,
			function(validatable){
				var isValid = validatable.validator.isValid();
				if (!isValid){
					validatable.failFunction(validatable.failFunctionParams);
				}
				return isValid;
			},
			function(arr){
				return arr.indexOf(false) == -1;
			}
		);    	

		if (allAreValid){
			passFunction(passFunctionParams);
		}
	},
	///////////////////////////////////////////////////    
	// VIEW ///////////////////////////////////////////
	///////////////////////////////////////////////////	
	View: function(view){
		var self = this; 
		self.data = view.data;
		self.onLoad = view.onLoad;		
		self.template = view.template;
		self.placeholder = view.placeholder;
		self.render = function(){
			Nexus.RenderView(self);
		};	
		return self;
	},
	///////////////////////////////////////////////////    
	// RENDER VIEW ////////////////////////////////////
	///////////////////////////////////////////////////	
	RenderView: function(view){
		var includes = ['jquery','mustache'];
		if (view.template) includes.push("text!" + view.template);

		require(includes, function($, Mustache, tpl) {	
			if (view.template){
				var data = view.data || {};
				$(view.placeholder).html(Mustache.to_html(tpl, data));						
			}

			if (view.onLoad){
				view.onLoad();
			}					
		});			
	},	
	///////////////////////////////////////////////////    
	// LOAD CSS //////NOT USED YET/////////////////////
	///////////////////////////////////////////////////		
	loadCSS: function(url) {
	    var link = document.createElement("link");
	    link.type = "text/css";
	    link.rel = "stylesheet";
	    link.href = url;
	    document.getElementsByTagName("head")[0].appendChild(link);
	},	
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
			var msg = new Nexus.Analytics.Message(msgType, jsonEvent);
			Nexus.Analytics.PostToAnalyticsServer(msg);
		}
	},
	ajaxOnErrorDefaultCallback: function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	},
	ajaxOnSuccessDefaultCallback: function(data, textStatus, jqXHR){
		console.log(data);
		console.log(textStatus);
		console.log(jqXHR);
	},
	jsonGET: function(payload){
		console.log('JSON GET WITH PAYLOAD:');
		console.log(payload);
		//TODO: rewrite without jquery
/*	
		require(['jquery'], function($) {	
			$.ajax({
				url: payload.url,
				type: 'GET',
				dataType: 'json',
				contentTypeString: 'application/json',
				success: payload.success || Nexus.ajaxOnSuccessDefaultCallback,
				error: payload.error || Nexus.ajaxOnErrorDefaultCallback
			});					
		});				
*/		
	},	
	jsonPOST: function(payload){
		console.log('JSON POST WITH PAYLOAD:');
		console.log(payload);
		//TODO: rewrite without jquery
/*	
		require(['jquery'], function($) {	
			$.ajax({
				url: payload.url,
				type: 'POST',
				data: JSON.stringify(payload.data),
				dataType: 'json',
				contentTypeString: 'application/json',
				success: payload.success || Nexus.ajaxOnSuccessDefaultCallback,
				error: payload.error || Nexus.ajaxOnErrorDefaultCallback
			});					
		});				
*/		
	},
	jsonPUT: function(payload){
		console.log('JSON PUT WITH PAYLOAD:');
		console.log(payload);
		//TODO: rewrite without jquery
/*	
		require(['jquery'], function($) {	
			$.ajax({
				url: payload.url,
				type: 'PUT',
				data: JSON.stringify(payload.data),
				dataType: 'json',
				contentTypeString: 'application/json',
				success: payload.success || Nexus.ajaxOnSuccessDefaultCallback,
				error: payload.error || Nexus.ajaxOnErrorDefaultCallback
			});					
		});				
*/		
	},
	jsonDELETE: function(payload){
		console.log('JSON DELETE WITH PAYLOAD:');
		console.log(payload);
		//TODO: rewrite without jquery
/*	
		require(['jquery'], function($) {	
			$.ajax({
				url: payload.url,
				type: 'DELETE',
				data: JSON.stringify(payload.data),
				dataType: 'json',
				contentTypeString: 'application/json',
				success: payload.success || Nexus.ajaxOnSuccessDefaultCallback,
				error: payload.error || Nexus.ajaxOnErrorDefaultCallback
			});					
		});				
*/		
	}	
};

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
///////// DEFAULTS //////////////////////////////////
/////////////////////////////////////////////////////
Nexus.Aggregate = { isRehydrating: false };
Nexus.isReplayingEvents = false;
Nexus.isInTestMode = false;

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
	
	////////////// NOT YET USED ///////////////////////////
	setCookie: function(c_name,value,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	},	
	////////////// NOT YET USED ///////////////////////////
	getCookie: function(c_name){
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++){
	  		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  		x=x.replace(/^\s+|\s+$/g,"");
	  		if (x==c_name){
	    			return unescape(y);
	    		}
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
		},
		
		self.size = function(){
			return self.arr.size();
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
			if (Nexus.Analytics.EnabledForCommands && !Nexus.Aggregate.isRehydrating ){  
				Nexus.Analytics.Post('COMMAND', JSON.stringify(command));
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
			if (Nexus.Analytics.EnabledForEvents && !Nexus.Aggregate.isRehydrating ){  
				Nexus.Analytics.Post('EVENT', JSON.stringify(evt));
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
		
		self.isRegistered = function(eventHandler){
			for (var i=0;i<self.eventHandlers.count();i++){				
				if(self.eventHandlers.getAt(i).name == eventHandler.name){
					return true;
				}
			}
			return false;
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
///////// TEST RUNNER ///////////////////////////////
/////////////////////////////////////////////////////
Nexus.TestRunner = function(name){
	self = this;
	self.name = name;
	self.id = Nexus.NewGuid();
	self.run = function(modules){
		Nexus.TestHelper.appendToTestResults('<div class="nexus-test-runner">' + self.name + '</div><div id="' + self.id +'"></div>');
		for (var i=0; i<modules.length; i++){
			if (modules.length > (i+1)){
				modules[i]._nextModule = modules[i+1];
			}	
		}		
		modules[0].run(self.id);		
	};
};

/////////////////////////////////////////////////////
///////// TEST MODULE ///////////////////////////////
/////////////////////////////////////////////////////
Nexus.TestModule = function(name, tests){
	var self = this;
	self.waitTime = 0;
	tests.map(function(test){
		self.waitTime += test.waitTime;
	});
	self.name = name;
	self.tests = tests;
	self.id = Nexus.NewGuid();
	self._nextModule = {
		run: function(testRunnerId){
			Nexus.TestHelper.appendDoneToTestRunner(testRunnerId);		
		}
	};
	self._runTests = function(testRunnerId){
		Nexus.TestHelper.appendToTestRunner(testRunnerId, '<div class="nexus-test-module">' + self.name + '</div><div id="' + self.id +'"></div>');
		for (var i=0; i<self.tests.length; i++){
			if (self.tests.length > (i+1)){
				self.tests[i]._nextTest = self.tests[i+1];
			}	
		}		
		self.tests[0].Run(self.id);			
	};
	
	self.run = function(testRunnerId){
		self._runTests(testRunnerId);		
		setTimeout(function(){																																							
			self._nextModule.run(testRunnerId);		
		},self.waitTime);	
	};	
};

/////////////////////////////////////////////////////
///////// TEST HELPER ///////////////////////////////
/////////////////////////////////////////////////////
Nexus.TestHelper = {
	appendToTestResults: function(html){
		document.getElementById("nexus-test-results").innerHTML += html;
	},
	appendToModule: function(moduleId, html){
		document.getElementById(moduleId).innerHTML += html;
	},
	appendToTestRunner: function(testRunnerId, html){
		document.getElementById(testRunnerId).innerHTML += html;
	},	
	getExpectedActualErrorMessage: function(expected, actual, whatAreYouTesting){
		return '<div class="nexus-test-failed-expected-actual">'
		+ '<div class="nexus-test-failed-message">Wrong ' + whatAreYouTesting + ' </div>'
		+ '<div class="nexus-test-failed-expected-header">EXPECTED: </div>'
		+ '<div class="nexus-test-failed-expected-events">' + expected + '</div>'
		+ '<div class="nexus-test-failed-actual-header">ACTUAL: </div>'
		+ '<div class="nexus-test-failed-actual-events">' + actual + '</div>'
		+ '</div>';	
	},
	getUnexpectedErrorMessage: function(actual, whatAreYouTesting){
		return '<div class="nexus-test-failed-expected-actual">'
		+ '<div class="nexus-test-failed-message">Unexpected ' + whatAreYouTesting + '</div>'
		+ '<div class="nexus-test-failed-actual-events">ACTUAL: ' + actual + '</div>'
		+ '</div>';	
	},
	getNoActualErrorMessage: function(expected, whatAreYouTesting){
		return '<div class="nexus-test-failed-expected-actual">'
		+ '<div class="nexus-test-failed-message">Actual ' + whatAreYouTesting + ' is missing</div>'
		+ '<div class="nexus-test-failed-actual-events">EXPECTED: ' + expected + '</div>'
		+ '</div>';	
	},	
	appendDoneToModule: function(moduleId){
		Nexus.TestHelper.appendToModule(moduleId, '<div class="nexus-test-module-separator"></div>');	
	},
	appendDoneToTestRunner: function(testRunnerId){
		Nexus.TestHelper.appendToTestRunner(testRunnerId, '<div>DONE!</div>');	
	},	
	renderAsserts: function(moduleId, testName, errors){
		var passFail = (errors == '') ? '<span class="nexus-test-passed">[PASSED] </span>' : '<span class="nexus-test-failed">[FAILED] </span>';				
		Nexus.TestHelper.appendToModule(moduleId, '<div>' 
		+ passFail
		+ '<span class="nexus-test-name">' + testName + '</span>'		
		+ errors
		+ '</div>');	
	},
	getUnregisteredEventHandlerMessage: function(eventHandlerName){
		return '<div class="nexus-test-failed-expected-actual">'
		+ '<div class="nexus-test-failed-message">Unregistered event handler: ' + eventHandlerName + '</div>'
		+ '</div>';
	},
	getEventNotHandledBySpecifiedEventHandlerMessage: function(eventHandlerName, expectedEventToHandle, actualEventItHandles){
		return '<div class="nexus-test-failed-expected-actual">'
		+ '<div class="nexus-test-failed-message">Event handler ' + eventHandlerName + ' does not handle this event</div>'
		+ '<div class="nexus-test-failed-expected-header">EXPECTED TO HANDLE: </div>'
		+ '<div class="nexus-test-failed-expected-events">' + expectedEventToHandle + '</div>'
		+ '<div class="nexus-test-failed-actual-header">ACTUALLY HANDLES: </div>'
		+ '<div class="nexus-test-failed-actual-events">' + actualEventItHandles + '</div>'
		+ '</div>';	
	},	
};

/////////////////////////////////////////////////////
///////// BEHAVIOR TEST /////////////////////////////
/////////////////////////////////////////////////////
Nexus.BehaviorTest = function(name, waitTime){

	var fixture = this;
	fixture.name = name;
	fixture.waitTime = waitTime || 0;
	fixture.errors = '';
		
	fixture.BeforeTest = function(beforeTest){
		fixture.beforeTest = beforeTest;	
		return fixture;
	};
	
	fixture.AfterTest = function(afterTest){
		fixture.afterTest = afterTest;	
		return fixture;
	};
	
	fixture.Given = function(givenEvents){
		fixture.givenEvents = givenEvents;
		return fixture;
	};
	
	fixture.When = function(whenCommand){
		fixture.whenCommand = whenCommand;
		return fixture;
	};
	
	fixture.Then = function(thenEvents){
		fixture.expectedEvents = thenEvents;	
		return fixture;
	};
	
	fixture._beforeTest = function(){
		// setup 
		Nexus.isInTestMode = true;
		Nexus.Aggregate.isRehydrating = false;
		Nexus._finalGivenEvent = 'final_given_event';	

		// test uses fake event store so not to write to real one
		fixture.BACKUP = {
			EVENT_STORE: Nexus.EventStore,
			ANALYTICS_ENABLED_FOR_COMMANDS: Nexus.Analytics.EnabledForCommands,
			ANALYTICS_ENABLED_FOR_EVENTS: Nexus.Analytics.EnabledForEvents,
			JSON_GET: Nexus.jsonGET,
			JSON_POST: Nexus.jsonPOST,
			JSON_PUT: Nexus.jsonPUT,
			JSON_DELETE: Nexus.jsonDELETE
		};		
						
		// backup app state			
		Nexus.EventStore = Nexus.CreateSimpleEventStore();
		Nexus.EventBus.eventStore = Nexus.EventStore;
		Nexus.EventStore.setEventBus(Nexus.EventBus);								
		Nexus.Analytics.EnabledForCommands = false;
		Nexus.Analytics.EnabledForEvents = false;
		Nexus.jsonGET = function(){/*do nothing*/};
		Nexus.jsonPOST = function(){/*do nothing*/};
		Nexus.jsonPUT = function(){/*do nothing*/};
		Nexus.jsonDELETE = function(){/*do nothing*/};
		if (Nexus.Util.isFunction(fixture.beforeTest)){
			fixture.beforeTest();
		}	
	};
	
	fixture._afterTest = function(){
		if (Nexus.Util.isFunction(fixture.afterTest)){
			fixture.afterTest();
		}	
		// restore app state
		Nexus.EventStore = fixture.BACKUP.EVENT_STORE;
		Nexus.EventBus.eventStore = Nexus.EventStore;
		Nexus.EventStore.setEventBus(Nexus.EventBus);	
		Nexus.Analytics.EnabledForCommands = fixture.BACKUP.ANALYTICS_ENABLED_FOR_COMMANDS;
		Nexus.Analytics.EnabledForEvents = fixture.BACKUP.ANALYTICS_ENABLED_FOR_EVENTS;																
		Nexus.jsonGET = fixture.BACKUP.JSON_GET;
		Nexus.jsonPOST = fixture.BACKUP.JSON_POST;
		Nexus.jsonPUT = fixture.BACKUP.JSON_PUT;
		Nexus.jsonDELETE = fixture.BACKUP.JSON_DELETE;
		Nexus.isInTestMode = false;			
	};
	
	fixture._publishGivenEvents = function(){
		if (fixture.givenEvents){
			Nexus.Util.handleOneOrMany(
				fixture.givenEvents, 
				function(evt){
					Nexus.EventBus.publish(evt);
				}
			);									
		}
		Nexus.EventStore.saveEvent(Nexus._finalGivenEvent);	
	};
	
	fixture._dispatchWhenCommand = function(){
		Nexus.CommandBus.dispatch(fixture.whenCommand); // single command only! by design!	
	};
	
	fixture._getExpectedEvents = function(){
		return Nexus.Util.handleOneOrMany(
			fixture.expectedEvents, 
			function(evt){								
				return JSON.stringify(evt);
			}, 
			function(arr){
				return arr.join('');
			}
		);	
	};
	
	fixture._getActualEvents = function(){
		var actualEvents = '';
		var startWritingToActualEvents = false;

		Nexus.EventStore.getAllEvents().map(function (evt) {
			if (startWritingToActualEvents){
				actualEvents += JSON.stringify(evt);
			}
			if (evt == Nexus._finalGivenEvent){
				startWritingToActualEvents = true;
			}
		});	
		return actualEvents;	
	};
	
	fixture._asserts = function(moduleId){
		var expectedEvents = fixture._getExpectedEvents();
		var actualEvents = fixture._getActualEvents();
		
		// behavior asserts
		if (actualEvents != expectedEvents){	
			fixture.errors = Nexus.TestHelper.getExpectedActualErrorMessage(expectedEvents, actualEvents || 'No events were published', 'events. Actual events do not match expected events!');				
		}	
		
		// render asserts
		Nexus.TestHelper.renderAsserts(moduleId, fixture.name, fixture.errors);			
	};
		
	fixture._nextTest = {
		Run: function(moduleId){
			Nexus.TestHelper.appendDoneToModule(moduleId);		
		}
	};
	
	fixture.Run = function(moduleId){
		fixture._beforeTest();
		fixture._publishGivenEvents();
		fixture._dispatchWhenCommand();		
		setTimeout(function(){																					
			fixture._asserts(moduleId);
			fixture._afterTest();	
			fixture._nextTest.Run(moduleId);
		},fixture.waitTime); // waitTime for async tests			


	};	
};

/////////////////////////////////////////////////////
///////// VIEW TEST /////////////////////////////////
/////////////////////////////////////////////////////
Nexus.ViewTest = function(name, waitTime){
	var fixture = this;
	fixture.waitTime = waitTime || 0;		
	fixture.name = name;
	fixture.errors = '';
	
	fixture._beforeTest = function(){
		// setup 
		Nexus.isInTestMode = true;

		// test uses fake event store so not to write to real one
		fixture.BACKUP = {
			NEXUS_VIEW: Nexus.View,
			JSON_GET: Nexus.jsonGET,
			JSON_POST: Nexus.jsonPOST,
			JSON_PUT: Nexus.jsonPUT,
			JSON_DELETE: Nexus.jsonDELETE
		};		
		
		Nexus.jsonGET = function(){/*do nothing*/};
		Nexus.jsonPOST = function(){/*do nothing*/};
		Nexus.jsonPUT = function(){/*do nothing*/};
		Nexus.jsonDELETE = function(){/*do nothing*/};
		
		// nexus view stub
		Nexus.View = function(view){
			var self = this; 
			self.data = view.data;
			self.onLoad = view.onLoad;		
			self.template = view.template;
			self.placeholder = view.placeholder;
			self.childViews = view.childViews;
			self.render = function(){
				if (self.template){
					fixture.setActualTemplate(self.template);
				}
				if (self.placeholder){
					fixture.setActualPlaceholder(self.placeholder);
				}
				if (self.data){
					fixture.setActualData(self.data);
				}
				if (self.onLoad){
					fixture.setActualOnLoad(self.onLoad);				
				}
			};	
			return self;
		};
	};
	
	fixture._afterTest = function(){
		// restore app state
		Nexus.View = fixture.BACKUP.NEXUS_VIEW;	
		Nexus.jsonGET = fixture.BACKUP.JSON_GET;
		Nexus.jsonPOST = fixture.BACKUP.JSON_POST;
		Nexus.jsonPUT = fixture.BACKUP.JSON_PUT;
		Nexus.jsonDELETE = fixture.BACKUP.JSON_DELETE;
		Nexus.isInTestMode = false;			
	};	
	
	fixture.ExpectTemplate = function(template){
		fixture.expectedTemplate = template;
		return fixture;
	};	

	fixture.ExpectPlaceholder = function(placeholder){
		fixture.expectedPlaceholder = placeholder;
		return fixture;
	};

	fixture.ExpectData = function(data){
		if (data){
			fixture.expectedData = ('' + Nexus.Util.serialize(data)).replace(/\s+/g, "");
		}else{
			throw 'ExpectData needs data parameter';
		}
		return fixture;
	};
	
	fixture.ExpectOnLoad = function(onLoad){
		if (onLoad){
			fixture.expectedOnLoad = ('' + Nexus.Util.serialize(onLoad)).replace(/\s+/g, "");
		}else{
			throw 'setActualOnLoad needs onLoad parameter';
		}	
		return fixture;
	};	
	
	fixture.GivenEventHandler = function(eventHandler){
		fixture.givenEventHandler = eventHandler;
		return fixture;
	};
	
	
	fixture.GivenEvent = function(givenEvent){
		fixture.givenEvent = givenEvent;
		return fixture;
	};
		
	
	fixture.setActualTemplate = function(template){
		fixture.actualTemplate = template;
		return fixture;
	};
	
	fixture.setActualPlaceholder = function(placeholder){
		fixture.actualPlaceholder = placeholder;
		return fixture;
	};
	
	fixture.setActualData = function(data){
		if (data){
			fixture.actualData = ('' + Nexus.Util.serialize(data)).replace(/\s+/g, "");
		}else{
			throw 'setActualData needs data parameter';
		}
		return fixture;
	};
	
	fixture.setActualOnLoad = function(onLoad){
		if (onLoad){
			fixture.actualOnLoad = ('' + Nexus.Util.serialize(onLoad)).replace(/\s+/g, "");
		}else{
			throw 'setActualOnLoad needs onLoad parameter';
		}		
		return fixture;
	};
	
	fixture.assert = function(expected, actual, whatAreYouTesting){
		if (expected && !actual){
			fixture.errors += Nexus.TestHelper.getNoActualErrorMessage(expected, whatAreYouTesting);
		}else if(!expected && actual){
			fixture.errors += Nexus.TestHelper.getUnexpectedErrorMessage(actual, whatAreYouTesting);						
		}else if (expected && actual && expected != actual){
			fixture.errors += Nexus.TestHelper.getExpectedActualErrorMessage(expected, actual, whatAreYouTesting);												
		}		
	};	
		
	fixture.assertView = function(){
		fixture.assert(fixture.expectedData, fixture.actualData, 'Data');
		fixture.assert(fixture.expectedPlaceholder, fixture.actualPlaceholder, 'Placeholder');		
		fixture.assert(fixture.expectedTemplate, fixture.actualTemplate, 'Template');		
		fixture.assert(fixture.expectedOnLoad, fixture.actualOnLoad, 'OnLoad');		
	};
	
	fixture.assertEventHandlerRegistration = function(){
		if (!fixture.givenEventHandler){
			fixture.errors += Nexus.TestHelper.getNoActualErrorMessage(fixture.givenEventHandler, 'event handler REGISTRATION');		
		}else if (!Nexus.EventBus.isRegistered(fixture.givenEventHandler)){
			fixture.errors += Nexus.TestHelper.getUnregisteredEventHandlerMessage(fixture.givenEventHandler.name);
		}	
	};
	
	fixture.handleEvent = function(){
		if (!fixture.givenEventHandler){
			fixture.errors += Nexus.TestHelper.getNoActualErrorMessage(fixture.givenEventHandler, 'event handler HANDLE METHOD');		
		}else{	
			if (fixture.givenEvent && fixture.givenEventHandler.handlesEvent == fixture.givenEvent.eventName){ 
				fixture.givenEventHandler.handle(fixture.givenEvent);	
			}else if (fixture.givenEvent && fixture.givenEventHandler.handlesEvent != fixture.givenEvent.eventName){ 	
				fixture.errors += Nexus.TestHelper.getEventNotHandledBySpecifiedEventHandlerMessage(
					fixture.givenEventHandler.name, 
					fixture.givenEvent.eventName, 
					fixture.givenEventHandler.handlesEvent);
			}else{
				fixture.givenEventHandler.handle();	
			}
		}	
	};
	
	fixture._nextTest = {
		Run: function(moduleId){
			Nexus.TestHelper.appendDoneToModule(moduleId);		
		}
	}
	
	fixture.Run = function(moduleId){
		setTimeout(function(){		
			// setup
			fixture._beforeTest();	
			
			// act	
			fixture.handleEvent();			
																		
			// assert
			fixture.assertEventHandlerRegistration();	
			fixture.assertView();			
			Nexus.TestHelper.renderAsserts(moduleId, fixture.name, fixture.errors);	
			
			// tear down
			fixture._afterTest();
			
			// next test in module																		
			fixture._nextTest.Run(moduleId);			
		},fixture.waitTime); 
	};	
	
						
};

/////////////////////////////////////////////////////
///////// BACKEND TEST //////////////////////////////
/////////////////////////////////////////////////////
Nexus.BackendTest = function(name, waitTime){
	var fixture = this;
	fixture.waitTime = waitTime || 0;		
	fixture.name = name;
	fixture.errors = '';
	
	fixture._beforeTest = function(){
		// setup 
		Nexus.isInTestMode = true;
		fixture.BACKUP = {
			JSON_GET: Nexus.jsonGET,
			JSON_POST: Nexus.jsonPOST,
			JSON_PUT: Nexus.jsonPUT,
			JSON_DELETE: Nexus.jsonDELETE
		};	
		// as per single responsibility principal, only single call should be made in event handler
		// this is why fixutre.actualPayload is set from all jsonXXX handlers
		Nexus.jsonGET = function(payload){	
			fixture.setActualPayload(payload);
		};
		Nexus.jsonPOST = function(payload){	
			fixture.setActualPayload(payload);
		};
		Nexus.jsonPUT = function(payload){	
			fixture.setActualPayload(payload);
		};
		Nexus.jsonDELETE = function(payload){	
			fixture.setActualPayload(payload);
		};		
	};
	
	fixture._afterTest = function(){
		// restore app state															
		Nexus.jsonGET = fixture.BACKUP.JSON_GET;
		Nexus.jsonPOST = fixture.BACKUP.JSON_POST;
		Nexus.jsonPUT = fixture.BACKUP.JSON_PUT;
		Nexus.jsonDELETE = fixture.BACKUP.JSON_DELETE;
		Nexus.isInTestMode = false;		
	};		
	
	fixture.ExpectPayload = function(payload){
		if (payload){
			fixture.expectedPayload = ('' + Nexus.Util.serialize(payload)).replace(/\s+/g, "");
		}else{
			throw 'ExpectPayload needs payload parameter';
		}	
		return fixture;
	};	
	
	fixture.GivenEventHandler = function(eventHandler){
		fixture.givenEventHandler = eventHandler;
		return fixture;
	};
	
	
	fixture.GivenEvent = function(givenEvent){
		fixture.givenEvent = givenEvent;
		return fixture;
	};		
	
	fixture.setActualPayload = function(payload){
		if (payload){
			fixture.actualPayload = ('' + Nexus.Util.serialize(payload)).replace(/\s+/g, "");
		}else{
			throw 'setActualPayload needs payload parameter';
		}		
		return fixture;
	};
	
	fixture.assert = function(expected, actual, whatAreYouTesting){
		if (expected && !actual){
			fixture.errors += Nexus.TestHelper.getNoActualErrorMessage(expected, whatAreYouTesting);
		}else if(!expected && actual){
			fixture.errors += Nexus.TestHelper.getUnexpectedErrorMessage(actual, whatAreYouTesting);						
		}else if (expected && actual && expected != actual){
			fixture.errors += Nexus.TestHelper.getExpectedActualErrorMessage(expected, actual, whatAreYouTesting);												
		}		
	};	
		
	fixture.assertPayload = function(){
		fixture.assert(fixture.expectedPayload, fixture.actualPayload, 'Payload');
	};
	
	fixture.assertEventHandlerRegistration = function(){
		if (!fixture.givenEventHandler){
			fixture.errors += Nexus.TestHelper.getNoActualErrorMessage(fixture.givenEventHandler, 'event handler REGISTRATION');		
		}else if (!Nexus.EventBus.isRegistered(fixture.givenEventHandler)){
			fixture.errors += Nexus.TestHelper.getUnregisteredEventHandlerMessage(fixture.givenEventHandler.name);
		}	
	};
	
	fixture.handleEvent = function(){
		if (!fixture.givenEventHandler){
			fixture.errors += Nexus.TestHelper.getNoActualErrorMessage(fixture.givenEventHandler, 'event handler HANDLE METHOD');		
		}else{	
			if (fixture.givenEvent && fixture.givenEventHandler.handlesEvent == fixture.givenEvent.eventName){ 
				fixture.givenEventHandler.handle(fixture.givenEvent);	
			}else if (fixture.givenEvent && fixture.givenEventHandler.handlesEvent != fixture.givenEvent.eventName){ 	
				fixture.errors += Nexus.TestHelper.getEventNotHandledBySpecifiedEventHandlerMessage(
					fixture.givenEventHandler.name, 
					fixture.givenEvent.eventName, 
					fixture.givenEventHandler.handlesEvent);
			}else{
				fixture.givenEventHandler.handle();	
			}
		}	
	};
	
	fixture._nextTest = {
		Run: function(moduleId){
			Nexus.TestHelper.appendDoneToModule(moduleId);		
		}
	}
	
	fixture.Run = function(moduleId){
		setTimeout(function(){		
			// setup
			fixture._beforeTest();	
			
			// act	
			fixture.handleEvent();			
																		
			// assert
			fixture.assertEventHandlerRegistration();	
			fixture.assertPayload();			
			Nexus.TestHelper.renderAsserts(moduleId, fixture.name, fixture.errors);	
			
			// tear down
			fixture._afterTest();
			
			// next test in module																		
			fixture._nextTest.Run(moduleId);			
		},fixture.waitTime); 
	};	
	
						
};

/////////////////////////////////////////////////////
///////// DEFAULT INIT //////////////////////////////
/////////////////////////////////////////////////////
Nexus.Analytics.EnabledForCommands = true;
Nexus.Analytics.EnabledForEvents = true;
Nexus.newId = Nexus.NewGuid;
Nexus.CommandBus = Nexus.CreateSimpleCommandBus();
Nexus.EventStore = Nexus.CreateSimpleCachableEventStore();
Nexus.EventBus = Nexus.CreateSimpleEventBus(Nexus.EventStore);	

return Nexus;
});


