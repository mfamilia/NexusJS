$(function () {
  TwitterLight.EventHandlers.ShowAllTweetsView = new Nexus.EventHandler(
    'Tweets shown event handler',
    TwitterLight.Events.TweetsShown.eventName,
    function (evt) {
      new Nexus.BackendCall({
        type:'GET',
        url:Nexus.App.ApiUrl + '/TwitterLight/GetAllTweets',
        onSuccess:function (data) {
          new Nexus.View({
            template:'app/stories/ViewTweets/ui/templates/ViewTweets.jst.jade',
            placeholder:'#content',
            data:data,
            onLoad:function () {
              $('#ShowHomepage').click(function () {
                Nexus.CommandBus.dispatch(
                  TwitterLight.Commands.NavigateToHomepage.Command()
                );
              });
              $('#PostTweets').click(function () {
                Nexus.CommandBus.dispatch(
                  TwitterLight.Commands.ShowPostATweetForm.Command()
                );
              });
            }
          })
            .render();
        },
        onError:function () {
          console.log('there was an error calling view tweets backend');
        }
      }).perform();
    }
  );
});