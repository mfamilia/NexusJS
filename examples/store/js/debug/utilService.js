define(['jquery'],function($){
	return {
		showArrInDiv: function(arr, divId){
		    var str = '';
	
		    arr.map(function (obj) {
			str += JSON.stringify(obj) + '<br />';
		    });
	
		    $('#' + divId).html(str);			
		}
	};
});
