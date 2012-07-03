define([
  'jquery',
  'nexus',
  'stories/ViewTweets/behavior/events/TweetsShown',
  'stories/TwitterLightHomepage/behavior/commands/NavigateToHomepage',
  'stories/PostATweet/behavior/commands/ShowPostATweetForm'
], function ($, Nexus, TweetsShown, NavigateToHomepage, ShowPostATweetForm) {

  return new Nexus.EventHandler(
    'Tweets shown event handler',
    TweetsShown.eventName,
    function (evt) {
      new Nexus.BackendCall({
        type:'GET',
        url:Nexus.App.ApiUrl + '/TwitterLight/GetAllTweets',
        onSuccess:function (data) {
          new Nexus.View({
            template:'stories/ViewTweets/ui/templates/ViewTweets.html',
            placeholder:'#content',
            data:data,
            onLoad:function () {
              $('#ShowHomepage').click(function () {
                Nexus.CommandBus.dispatch(
                  NavigateToHomepage.Command()
                );
              });
              $('#PostTweets').click(function () {
                Nexus.CommandBus.dispatch(
                  ShowPostATweetForm.Command()
                );
              });
            }
          })
            .render();
        },
        onError:function () {
          console.log('there was an error calling view tweets backend');
        }
      })
        .perform();
    }
  );

});
