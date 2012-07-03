define([
  'jquery',
  'nexus',
  'stories/PostATweet/behavior/commands/PostNewTweet',
  'stories/PostATweet/behavior/events/PostATweetFormShown'
], function ($, Nexus, PostNewTweet, PostATweetFormShown) {

  return new Nexus.EventHandler(
    'Post a tweet form shown event handler',
    PostATweetFormShown.eventName,
    function (evt) {
      new Nexus.View({
        template:'stories/PostATweet/ui/templates/PostATweetForm.html',
        placeholder:'#content',
        data:{},
        onLoad:function () {
          $('#PostATweet').click(function () {
            Nexus.CommandBus.dispatch(
              PostNewTweet.Command(
                $('#tweet').val()
              )
            );
          });
        }

      })
        .render();
    }
  );

});
