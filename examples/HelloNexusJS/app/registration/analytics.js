define([
    "Nexus"
], function (
    Nexus
    ) {

    return {
        register: function(){        
            // set up what to do with analytics
            Nexus.Analytics.PostToAnalyticsServer = function(msg){
                // will just log to console for now
                //console.log('POST TO MY ANALYTICS SERVER. MESSAGE: ');
                //console.log(msg);
            };
        }
    }


});
