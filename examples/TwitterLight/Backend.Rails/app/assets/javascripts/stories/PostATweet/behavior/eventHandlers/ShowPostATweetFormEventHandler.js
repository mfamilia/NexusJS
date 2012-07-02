$(function () {
  TwitterLight.EventHandlers.ShowPostATweetForm = new Nexus.EventHandler(
    'Post a tweet form shown event handler',
    TwitterLight.Events.PostATweetFormShown.eventName,
    function (evt) {
      new Nexus.View({
        template:'app/stories/PostATweet/ui/templates/PostATweetForm.html',
        placeholder:'#content',
        data:{},
        render: function(){

        },
        onLoad:function () {
          $('#PostATweet').click(function () {
            Nexus.CommandBus.dispatch(
              TwitterLight.Commands.PostNewTweet.Command(
                $('#tweet').val()
              )
            );
          });
        }
      }).render();
    }
  );
});
