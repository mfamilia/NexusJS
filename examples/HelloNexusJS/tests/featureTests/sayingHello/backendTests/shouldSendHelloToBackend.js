define([
    'jquery',
    "Nexus",
    'app/features/sayingHello/eventHandlers/helloSentToBackendEventHandler'
], function ($, Nexus, helloSentToBackendEventHandler) {


    var givenEvent = {
        text: 'HELLO',
        eventName: 'Hello screen displayed'
    }

    var expectedPayload = {
        url: 'http://192.168.0.134:3000',
        data: {'text':'HELLO'},
        success: function(){console.log('POSTED COMPLETE')}
    };

    return new Nexus
        .BackendTest('Should send hello to backend')
        .GivenEvent(givenEvent)
        .GivenEventHandler(helloSentToBackendEventHandler)
        .ExpectType('POST')
        .ExpectPayload(expectedPayload);

});


