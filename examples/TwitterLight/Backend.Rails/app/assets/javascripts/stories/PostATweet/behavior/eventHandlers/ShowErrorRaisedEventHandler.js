$(function () {
  TwitterLight.EventHandlers.ShowErrorRaised = new Nexus.EventHandler(
    'Error raised event handler',
    TwitterLight.Events.ErrorRaised.eventName,
    function (evt) {
      new Nexus.View({
        template:'app/stories/PostATweet/ui/templates/Error.html',
        placeholder:'#error',
        data:{
          message:evt.Message
        },
        render:function(){

        },
        onLoad:function () {
        }
      }).render();
    }
  );
});
