$(function () {
  TwitterLight.EventHandlers.ShowThankYouPage = new Nexus.EventHandler(
    'Thanks for your tweet page shown event handler',
    TwitterLight.Events.ThanksForYourTweetPageShown.eventName,
    function (evt) {
      new Nexus.View({
        template:'app/stories/PostATweet/ui/templates/ThanksForYourTweet.html',
        placeholder:'#content',
        data:{
          message:evt.Message,
          tweet:evt.Tweet
        },
        render:function(){

        },
        onLoad:function () {
          $('#ViewTweets').click(function () {
            Nexus.CommandBus.dispatch(
              TwitterLight.Commands.ViewAllTweets.Command()
            );
          });
          $('#PostTweets').click(function () {
            Nexus.CommandBus.dispatch(
              TwitterLight.Commands.ShowPostATweetForm.Command()
            );
          });
        }
      }).render();
    }
  );
});
