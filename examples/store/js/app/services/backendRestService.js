define([
	"jquery"
], function ($) {

	return {
		post: function(obj){			
			$.ajax({
				url: obj.url,
				type: 'POST',
				data: JSON.stringify(obj.data),
				dataType: 'json',
				contentTypeString: 'application/json',
				success: obj.success,
				error: obj.error
			});					
		},
		get: function(obj){			
			$.ajax({
				url: obj.url,
				type: 'GET',
				dataType: 'json',
				contentTypeString: 'application/json',
				success: obj.successCallback,
				error: obj.errorCallback
			});					
		},
		put: function(obj){			
			$.ajax({
				url: obj.url,
				type: 'PUT',
				data: JSON.stringify(obj.data),
				dataType: 'json',
				contentTypeString: 'application/json',
				success: obj.success,
				error: obj.error
			});					
		},
		delete: function(obj){			
			$.ajax({
				url: obj.url,
				type: 'DELETE',
				data: JSON.stringify(obj.data),
				dataType: 'json',
				contentTypeString: 'application/json',
				success: obj.success,
				error: obj.error
			});					
		}		
	};

});





